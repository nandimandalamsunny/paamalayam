import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const INPUT_PDF = "./scripts/songs.pdf";
const OUTPUT_JSON = "./public/data/rawSongs.json";

/**
 * Clean OCR text
 */
function cleanText(text) {
  return text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/Page \d+/gi, "")
    .replace(/–/g, "-")
    .trim();
}

/**
 * Split songs from extracted text
 */
function splitSongs(text) {
  /**
   * Detect:
   * 1
   * 2
   * 3
   * etc
   */
  const regex = /(?:^|\n)\s*(\d{1,3})\s+/g;

  const matches = [...text.matchAll(regex)];

  console.log(`Found ${matches.length} possible song markers`);

  const songs = [];

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index;

    const end = i + 1 < matches.length ? matches[i + 1].index : text.length;

    const rawSong = text.slice(start, end).trim();

    const songNumber = matches[i][1];

    /**
     * Ignore tiny chunks
     */
    if (rawSong.length < 100) {
      continue;
    }

    songs.push({
      id: songNumber,
      sortKey: Number(songNumber),
      raw: rawSong
    });
  }

  return songs;
}

/**
 * Extract text from PDF
 */
async function extractPdfText(pdfPath) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));

  const pdf = await pdfjsLib.getDocument({
    data
  }).promise;

  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    console.log(`📄 Reading page ${pageNum}`);

    const page = await pdf.getPage(pageNum);

    const content = await page.getTextContent();

    const strings = content.items.map((item) => item.str);

    fullText += strings.join(" ");
    fullText += "\n\n";
  }

  return fullText;
}

/**
 * Main runner
 */
async function run() {
  try {
    console.log("📖 Reading PDF...");

    const rawText = await extractPdfText(INPUT_PDF);

    console.log("🧹 Cleaning text...");

    const cleanedText = cleanText(rawText);

    /**
     * DEBUG
     */
    console.log("\n========== SAMPLE ==========\n");

    console.log(cleanedText.slice(0, 3000));

    console.log("\n============================\n");

    console.log("✂️ Splitting songs...");

    const songs = splitSongs(cleanedText);

    console.log(`🎵 Found ${songs.length} songs`);

    /**
     * Ensure folder exists
     */
    fs.mkdirSync("./public/data", {
      recursive: true
    });

    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(songs, null, 2), "utf-8");

    console.log(`✅ Saved → ${OUTPUT_JSON}`);
  } catch (error) {
    console.error("❌ Extraction failed");

    console.error(error);
  }
}

run();
