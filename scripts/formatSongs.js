import "dotenv/config";
import fs from "node:fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCAnJ5p4GpJ3LxnikRULj45zRIMt5nj60U");

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});
const rawSongs = JSON.parse(fs.readFileSync("./public/data/rawSongs.json", "utf8"));

async function formatSong(song, index) {
  try {
    const prompt = `
Convert this Tamil Christian song into STRICT valid JSON.

Rules:
- Keep proper stanzas
- Add tanglish transliteration
- Detect chorus if repeated
- Return ONLY JSON
- No markdown
- No explanation

Format:
{
  "id": "",
  "songNumber": "",
  "title": "",
  "tamilTitle": "",
  "sections": []
}

Song:
${song.content}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response.text();

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.log(`❌ Error formatting song ${index}`);

    console.log(error.message);

    return null;
  }
}

async function run() {
  try {
    const formattedSongs = [];

    for (let i = 0; i < rawSongs.length; i++) {
      console.log(`🎵 Formatting song ${i + 1}`);

      const formatted = await formatSong(rawSongs[i], i + 1);

      if (formatted) {
        formattedSongs.push(formatted);

        fs.writeFileSync("./public/data/finalSongs.json", JSON.stringify(formattedSongs, null, 2));

        console.log(`✅ Song ${i + 1} completed`);
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("🔥 ALL SONGS COMPLETED");
  } catch (error) {
    console.log("❌ Fatal Error");

    console.log(error.message);
  }
}

run();
