export interface SongSection {
  id: string;
  type: "verse" | "chorus" | "bridge" | "doxology";
  label: string; // e.g., "Verse 1", "Chorus", "Bridge"
  tanglish: string[];
  tamil: string[];
  english?: string[] | null;
  chords?: string[]; // Chords matching the lines
}

export interface Song {
  id: string;
  songNumber: string;
  noOfStanzas?: string | number;
  title: string;
  tamilTitle: string;
  englishTitle?: string | null;
  category: string;
  composer?: string;
  history?: string;
  crossReferences?: string[];
  sections: SongSection[];
}

export interface AppSettings {
  appLanguage: "English" | "Tamil";
  songLanguageDefault: "tanglish" | "tamil" | "english";
  autoScrollSpeed: number; // 1 (Slowest) to 10 (Fastest)
  fontSize: number; // 14px to 32px
  theme: "light" | "beige" | "green" | "worship";
  studyMode: boolean; // Enables chords and historical insight tools
}
