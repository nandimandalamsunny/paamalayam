import React, { useState } from "react";
import { useAppState } from "../../store/AppState";
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card/index";
import { Search as SearchIcon, X, Globe, Clock, Star, Mic, ChevronRight } from "lucide-react";
import "./Search.css";

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

// Custom inline high-fidelity outline SVG icons
const ChurchIcon: React.FC<CustomIconProps> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2v3M10 3.5h4" />
    <path d="M12 5L5 12v9h14v-9z" />
    <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
    <circle cx="12" cy="11" r="1.5" />
    <path d="M5 15H3v6h2" />
    <path d="M19 15h2v6h-2" />
  </svg>
);

const PrayerIcon: React.FC<CustomIconProps> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M10 20c-1-2-1.5-5-1.5-7.5c0-1.8.8-3.5 2-4.5L12 4l1.5 4c1.2 1 2 2.7 2 4.5c0 2.5-.5 5.5-1.5 7.5" />
    <path d="M8.5 12.5C9.5 11 11 9.5 12 9" />
    <path d="M15.5 12.5C14.5 11 13 9.5 12 9" />
    <path d="M6 21h4v-1.5H6zM14 21h4v-1.5h-4z" />
  </svg>
);

const YouthIcon: React.FC<CustomIconProps> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="8" r="3" />
    <path d="M6 20a6 6 0 0 1 12 0" />
    <circle cx="7" cy="11" r="2.2" />
    <path d="M2 20a5 5 0 0 1 7.2-4.5" />
    <circle cx="17" cy="11" r="2.2" />
    <path d="M14.8 15.5A5 5 0 0 1 22 20" />
  </svg>
);

const ChristmasIcon: React.FC<CustomIconProps> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const EasterIcon: React.FC<CustomIconProps> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 21c3-2 6-3 9-3s6 1 9 3" />
    <path d="M12 5v13M9 9h6" />
    <circle cx="12" cy="9" r="2.5" />
    <path d="M12 1v1.5M12 15.5V17M4 9h1.5M18.5 9H20" />
    <path d="M6.35 3.35l1.06 1.06M16.59 13.59l1.06 1.06M6.35 14.65l1.06-1.06M16.59 4.41l1.06-1.06" />
  </svg>
);

const DevotionIcon: React.FC<CustomIconProps> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

// Sparkle Search Icon for bottom "Can't find a song" banner
const SparkleSearchIcon: React.FC<CustomIconProps> = ({ size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="6" />
    <path d="M16 16l5 5" />
    {/* Micro sparkles */}
    <path d="M4 4h.01M3 6h.01M6 5h.01M18 4h.01" strokeWidth={3} strokeLinecap="round" />
    <path d="M19 6h.01M21 5h.01" strokeWidth={3} strokeLinecap="round" />
  </svg>
);

export const Search: React.FC = () => {
  const { songs, openSong } = useAppState();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Suggested keywords list for Recent Searches matching the screenshot
  const recentSearchesList = [
    "Aathmamae, Un Aandavarin",
    "Yesu Unnai",
    "Ennal Maravadha Naam",
    "Visuvasippom Naam"
  ];

  // Popular Suggestions songs list matching the screenshot
  const popularSuggestions = [
    { title: "Visuvasippom Naam", songId: "song-12" },
    { title: "Yesu Unnai Naesikkirar", songId: "song-03" },
    { title: "Evening Reflection", songId: "song-04" },
    { title: "Ennal Maravadha Naam", songId: "song-04" }, // fallback
    { title: "Aathmamae, Un Aandavarin", songId: "song_001" },
    { title: "Aarathanai Umakke", songId: "song-05" },
    { title: "Yesu Unnai Aaraathikkiren", songId: "song-03" }, // fallback
    { title: "Aathmamae, Un Aandavarin", songId: "song_001" } // fallback
  ];

  // Categories with matching song counts
  const categoriesList = [
    { label: "Worship", icon: ChurchIcon, count: "245 Songs" },
    { label: "Prayer", icon: PrayerIcon, count: "128 Songs" },
    { label: "Youth", icon: YouthIcon, count: "89 Songs" },
    { label: "Christmas", icon: ChristmasIcon, count: "64 Songs" },
    { label: "Easter", icon: EasterIcon, count: "52 Songs" },
    { label: "Devotional", icon: DevotionIcon, count: "101 Songs" }
  ];

  // Categories list extracted dynamically for search filters
  const filterCategories = [
    "All",
    "Sunday Worship",
    "Evening Praise",
    "Festival Carols",
    "My Devotional Reading"
  ];

  // Full-text instant filtering
  const filteredSongs = songs.filter((song) => {
    // 1. Filter by category first if one is selected
    if (selectedCategory && selectedCategory !== "All" && song.category !== selectedCategory) {
      return false;
    }

    // 2. Perform text lookup
    if (!query) return true;
    const lowerQuery = query.toLowerCase().trim();

    const titleMatch = song.title.toLowerCase().includes(lowerQuery);
    const tamilTitleMatch = song.tamilTitle.toLowerCase().includes(lowerQuery);
    const numberMatch = song.songNumber.includes(lowerQuery);
    const composerMatch = song.composer?.toLowerCase().includes(lowerQuery) || false;

    // Deep search in individual lines of lyrics across three translations
    const lyricsMatch = song.sections.some(
      (sec) =>
        sec.tanglish.some((line) => line.toLowerCase().includes(lowerQuery)) ||
        sec.tamil.some((line) => line.toLowerCase().includes(lowerQuery)) ||
        sec.english.some((line) => line.toLowerCase().includes(lowerQuery))
    );

    return titleMatch || tamilTitleMatch || numberMatch || composerMatch || lyricsMatch;
  });

  return (
    <div className="flex flex-col gap-2  md:px-0 select-none animate-fadeIn pb-24">
      {/* 1. Header and Page Title */}

      {/* 2. Interactive Search Box */}
      <div className="relative flex items-center">
        <div className="absolute left-4 text-[#7A6A58] pointer-events-none">
          <SearchIcon size={18} strokeWidth={2.2} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Tanglish songs, Paamalai & lyrics..."
          className="w-full h-12 pl-11 pr-11 text-sm rounded-full bg-app-card text-app-text border border-app-border/40 premium-shadow outline-none focus:border-[#A97449]/40 transition-all font-sans placeholder:text-[#7A6A58]/60 search-input-field"
        />

        {query ? (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 p-1 rounded-full text-app-text/40 hover:bg-app-primary/10 transition-colors"
          >
            <X size={15} />
          </button>
        ) : (
          <div className="absolute right-4 text-[#A97449] pointer-events-none">
            <Mic size={18} strokeWidth={2.2} />
          </div>
        )}
      </div>

      {/* 3. Empty Search Layout (Suggestions, Recent Searches, Categories & Banner) */}
      {!query ? (
        <>
          {/* A. Recent Searches Scroll Row */}
          <div className="flex flex-col gap-3 px-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-bold text-app-primary font-serif">
                Recent Searches
              </span>
              <button
                onClick={() => {}}
                className="text-[11.5px] font-bold text-[#A97449] hover:text-[#5B3A29] transition-colors"
              >
                Clear all
              </button>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {recentSearchesList.map((keyword, idx) => (
                <div key={idx} onClick={() => setQuery(keyword)} className="recent-search-pill">
                  <Clock size={14.5} className="text-[#A97449]" strokeWidth={1.8} />
                  <span>{keyword}</span>
                </div>
              ))}
            </div>
          </div>

          {/* B. Popular Suggestions Large Rounded Card Container */}
          <div className="flex flex-col gap-3 px-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-bold text-app-primary font-serif">
                Popular Suggestions
              </span>
              <button
                onClick={() => setQuery("Aathmamae, Un Aandavarin")}
                className="flex items-center text-[11px] font-bold text-[#A97449] hover:text-[#5B3A29] transition-colors"
              >
                View all
                <ChevronRight size={11} strokeWidth={2.5} className="ml-0.5" />
              </button>
            </div>

            <div className="suggestions-card-container">
              {popularSuggestions.map((item, idx) => (
                <div key={idx} onClick={() => setQuery(item.title)} className="suggestion-list-row">
                  <div className="flex items-center">
                    <div className="suggestion-icon-circle">
                      <SearchIcon size={14} strokeWidth={2.0} />
                    </div>
                    <span className="suggestion-row-text">{item.title}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openSong(item.songId);
                    }}
                    className="suggestion-star-btn"
                  >
                    <Star size={17} strokeWidth={1.6} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* C. Browse Categories Small Horizontal Cards */}
          <div className="flex flex-col gap-3 px-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-bold text-app-primary font-serif">
                Browse Categories
              </span>
              <button
                onClick={() => {}}
                className="flex items-center text-[11px] font-bold text-[#A97449] hover:text-[#5B3A29] transition-colors"
              >
                View all
                <ChevronRight size={11} strokeWidth={2.5} className="ml-0.5" />
              </button>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {categoriesList.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={idx}
                    onClick={() =>
                      setSelectedCategory(
                        cat.label === "Devotional" ? "My Devotional Reading" : cat.label
                      )
                    }
                    className="search-category-card"
                  >
                    <div className="search-category-icon-wrapper">
                      <Icon size={26} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-0.5 items-center">
                      <span className="search-category-label">{cat.label}</span>
                      <span className="search-category-count">{cat.count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* D. "Can't find a song?" Champagne Request Banner */}
          <div className="request-song-banner mt-1">
            <div className="flex items-center gap-3">
              <div className="text-[#A97449] flex-shrink-0">
                <SparkleSearchIcon size={30} strokeWidth={1.5} />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[13.5px] font-bold text-app-text font-serif leading-tight">
                  Can't find a song?
                </span>
                <span className="text-[10px] font-semibold text-app-secondary mt-0.5">
                  Let us help you find it.
                </span>
              </div>
            </div>
            <button className="request-song-btn select-none">
              Request a Song
              <ChevronRight size={10} strokeWidth={3} />
            </button>
          </div>
        </>
      ) : (
        /* 4. Active Search Layout showing results grid with Category Pills */
        <>
          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {filterCategories.map((cat, idx) => {
              const isSelected = selectedCategory === cat || (cat === "All" && !selectedCategory);
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
                  className={`px-4.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all duration-200 select-none search-category-pill ${
                    isSelected
                      ? "bg-app-primary border-app-primary text-app-bg shadow-sm scale-[1.02]"
                      : "bg-app-card/60 border-app-border/40 text-app-text/60 hover:bg-app-card hover:text-app-text"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Results Grid */}
          <div className="flex flex-col gap-3.5 mt-1 pb-6 search-results-grid">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A6A58]">
                Results ({filteredSongs.length})
              </span>
            </div>

            {filteredSongs.length === 0 ? (
              <Card className="p-8 flex flex-col items-center justify-center text-center gap-3 border-app-border/20 bg-app-card/50 animate-fadeIn">
                <span className="text-3xl">🏜️</span>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-bold text-app-primary">No results found</h4>
                  <p className="text-xs text-app-text/45 max-w-xs leading-relaxed">
                    We couldn't find any songs matching "{query}". Try checking the spelling or
                    searching a different lyric keyword.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredSongs.map((song) => (
                  <Card
                    key={song.id}
                    onClick={() => openSong(song.id)}
                    className="cursor-pointer group active:scale-[0.98] border-app-border/30 bg-app-card/85 hover:bg-app-card backdrop-blur-sm relative transition-all duration-250 hover:border-app-primary/20"
                  >
                    <CardHeader className="p-5 pb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-app-accent uppercase tracking-widest">
                          Song {song.songNumber}
                        </span>
                        <span className="text-[9px] font-bold text-app-text/40 bg-app-primary/5 px-2 py-0.5 rounded-full select-none">
                          {song.category}
                        </span>
                      </div>
                      <CardTitle className="text-sm font-bold mt-2.5 group-hover:text-app-primary leading-tight transition-colors">
                        {song.title}
                      </CardTitle>
                      <CardDescription className="text-[11px] font-serif font-medium truncate mt-0.5">
                        {song.tamilTitle}
                      </CardDescription>
                    </CardHeader>

                    {/* Visual indicators of deep content matches */}
                    <div className="px-5 pb-4.5 pt-0 border-t border-app-border/10 mt-1 flex items-center justify-between text-[10px] text-app-text/40 font-semibold">
                      <div className="flex items-center gap-1.5 select-none">
                        <Globe size={11} className="text-app-accent" />
                        <span>Tamil / Tanglish / English</span>
                      </div>
                      {song.composer && (
                        <span className="truncate max-w-[8rem]">{song.composer}</span>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
