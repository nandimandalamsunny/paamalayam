import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { useAppState } from "../../store/AppState";
import { Slider } from "../../components/ui/Slider/index";
import { Dialog, DialogContent } from "../../components/ui/Dialog/index";
import { ChevronLeft, Heart, BookOpen, AlignLeft, Pause, Sun, Moon } from "lucide-react";
import "./LyricsDetail.css";

export const LyricsDetail: React.FC = () => {
  const { activeSongId, songs, favorites, toggleFavorite, closeSong, settings, updateSettings } =
    useAppState();

  const [activeLang, setActiveLang] = useState<"tanglish" | "tamil" | "english">("tanglish");
  const [isScrolling, setIsScrolling] = useState(false);
  const [showFontControl, setShowFontControl] = useState(false);
  const [showSpacingControl, setShowSpacingControl] = useState(false);

  // Quick anchor dropdown states
  const [showVerseDropdown, setShowVerseDropdown] = useState(false);
  const [showChorusDropdown, setShowChorusDropdown] = useState(false);

  // Line spacing levels: normal (1.6), spacious (2.0), relaxed (2.4)
  const [lineSpacing, setLineSpacing] = useState<"normal" | "spacious" | "relaxed">("normal");

  const scrollIntervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const song = songs.find((s) => s.id === activeSongId);
  if (!song) return null;

  const isFavorite = favorites.includes(song.id);

  // Synced default language preference
  useEffect(() => {
    if (settings.songLanguageDefault && settings.songLanguageDefault !== "tanglish") {
      // Keep within valid singular languages for catalog screenshot matching
      if (settings.songLanguageDefault === "tamil" || settings.songLanguageDefault === "english") {
        setActiveLang(settings.songLanguageDefault);
      }
    }
  }, [settings.songLanguageDefault]);

  // Clean scroll loops on unmount or pause
  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        cancelAnimationFrame(scrollIntervalRef.current);
      }
    };
  }, []);

  // requestAnimationFrame based extremely smooth Auto Scroll loop
  const startAutoScroll = () => {
    if (isScrolling) {
      // Pause
      setIsScrolling(false);
      if (scrollIntervalRef.current) {
        cancelAnimationFrame(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
      return;
    }

    setIsScrolling(true);
    let lastTime = performance.now();

    const scrollStep = (timestamp: number) => {
      const elapsed = timestamp - lastTime;

      // Calculate speed: settings.autoScrollSpeed maps to a fraction of a pixel per frame
      const speedFactor = settings.autoScrollSpeed * 0.08;
      const scrollAmount = speedFactor * (elapsed / 16.6); // Normalized to 60fps

      window.scrollBy({
        top: scrollAmount,
        behavior: "auto"
      });

      lastTime = timestamp;

      // Check if we hit the bottom of the viewport
      const totalHeight = document.documentElement.scrollHeight;
      const scrolledHeight = window.scrollY + window.innerHeight;

      if (scrolledHeight >= totalHeight - 2) {
        setIsScrolling(false);
        scrollIntervalRef.current = null;
      } else {
        scrollIntervalRef.current = requestAnimationFrame(scrollStep);
      }
    };

    scrollIntervalRef.current = requestAnimationFrame(scrollStep);
  };

  // Font size helpers
  const increaseFont = () => {
    updateSettings({ fontSize: Math.min(32, settings.fontSize + 2) });
  };
  const decreaseFont = () => {
    updateSettings({ fontSize: Math.max(14, settings.fontSize - 2) });
  };

  // Toggle night mode globally in settings theme
  const toggleNightMode = () => {
    const isWorship = settings.theme === "worship";
    updateSettings({ theme: isWorship ? "beige" : "worship" });
  };

  // Helper to scroll to specific section smoothly
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Offset scrolling slightly to account for sticky top bars
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
    setShowVerseDropdown(false);
    setShowChorusDropdown(false);
  };

  // Filter sections into verses and choruses/bridges for quick anchor selectors
  const verses = song.sections.filter((sec) => sec.type === "verse");
  const choruses = song.sections.filter((sec) => sec.type === "chorus" || sec.type === "bridge");

  // Dynamic mapping of spacing to Tailwind classes
  const getSpacingTailwindClass = () => {
    switch (lineSpacing) {
      case "spacious":
        return {
          container: "leading-[2.0]",
          line: "mb-3"
        };
      case "relaxed":
        return {
          container: "leading-[2.4]",
          line: "mb-5"
        };
      default:
        return {
          container: "leading-[1.6]",
          line: "mb-1.5"
        };
    }
  };

  const spacingClasses = getSpacingTailwindClass();

  return (
    <div ref={containerRef} className="lyrics-detail-view-container select-none">
      {/* 1. Header Toolbar (Back button, Centered song title info, Favorite heart) */}
      <header className="lyrics-top-info-bar">
        <button onClick={closeSong} className="lyrics-back-arrow-btn" aria-label="Back to Catalog">
          <ChevronLeft size={22} strokeWidth={2.5} />
        </button>

        <span className="lyrics-top-song-title font-sans">
          Song {song.songNumber} • {song.title}
        </span>

        <button
          onClick={() => toggleFavorite(song.id)}
          className={`lyrics-favorite-heart-btn ${isFavorite ? "active" : ""}`}
          aria-label="Toggle Favorite"
        >
          <Heart
            size={20}
            fill={isFavorite ? "var(--accent-app)" : "none"}
            className="transition-all"
          />
        </button>
      </header>

      {/* 2. Language Selection tabs with settings gear icon */}
      <div className="lyrics-segmented-bar-row">
        <div className="lyrics-segmented-bar">
          {(
            [
              { id: "tamil", label: "Tamil" },
              { id: "tanglish", label: "Tanglish" },
              { id: "english", label: "English" }
            ] as const
          ).map((lang) => {
            const isSelected = activeLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setActiveLang(lang.id)}
                className={`lyrics-segmented-pill ${isSelected ? "active" : ""}`}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Section dropdown anchors (Verse dropdown & Chorus dropdown sub-row) */}
      <div className="dropdown-nav-row">
        {/* Left Dropdown (Verses Selector) */}
        <div className="section-dropdown-container">
          <button
            className="section-dropdown-trigger"
            onClick={() => {
              setShowVerseDropdown(!showVerseDropdown);
              setShowChorusDropdown(false);
            }}
          >
            <BookOpen size={16} className="text-app-accent" />
            <span>Verse 1</span>
            <span className="dropdown-chevron-arrow">▼</span>
          </button>

          {showVerseDropdown && (
            <div className="section-dropdown-menu">
              {verses.map((v) => (
                <button
                  key={v.id}
                  className="section-dropdown-item font-serif"
                  onClick={() => scrollToSection(v.id)}
                >
                  {v.label}
                </button>
              ))}
              {verses.length === 0 && (
                <span className="text-[10px] text-app-text/40 py-1 text-center font-sans">
                  No verses
                </span>
              )}
            </div>
          )}
        </div>

        <div className="dropdown-nav-divider" />

        {/* Right Dropdown (Chorus Selector) */}
        <div className="section-dropdown-container">
          <button
            className="section-dropdown-trigger"
            onClick={() => {
              setShowChorusDropdown(!showChorusDropdown);
              setShowVerseDropdown(false);
            }}
          >
            <AlignLeft size={16} className="text-app-accent" />
            <span>Chorus</span>
            <span className="dropdown-chevron-arrow">▼</span>
          </button>

          {showChorusDropdown && (
            <div className="section-dropdown-menu">
              {choruses.map((c) => (
                <button
                  key={c.id}
                  className="section-dropdown-item font-serif"
                  onClick={() => scrollToSection(c.id)}
                >
                  {c.label}
                </button>
              ))}
              {choruses.length === 0 && (
                <span className="text-[10px] text-app-text/40 py-1 text-center font-sans">
                  No chorus
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Font Size Settings Modal (triggers when clicking settings gear) */}
      <Dialog open={showFontControl} onOpenChange={setShowFontControl}>
        <DialogContent className="flex flex-col gap-4" showCloseButton={false}>
          <div className="flex items-center justify-between text-[10px] font-bold text-app-text/50 tracking-wider uppercase">
            <span>Typography Controls</span>
            <button
              onClick={() => setShowFontControl(false)}
              className="text-app-primary hover:opacity-80 transition-opacity font-sans font-bold"
            >
              Close
            </button>
          </div>

          {/* Font slider control */}
          <div className="flex items-center gap-4 py-2">
            <button
              onClick={decreaseFont}
              className="w-9 h-9 rounded-full border border-app-border/50 hover:bg-app-primary/5 text-xs font-bold flex items-center justify-center active:scale-95 transition-transform"
            >
              A-
            </button>
            <Slider
              min={14}
              max={32}
              value={[settings.fontSize]}
              onValueChange={(val) => updateSettings({ fontSize: val[0] })}
              className="flex-grow"
            />
            <button
              onClick={increaseFont}
              className="w-9 h-9 rounded-full border border-app-border/50 hover:bg-app-primary/5 text-sm font-bold flex items-center justify-center active:scale-95 transition-transform"
            >
              A+
            </button>
          </div>

          <div className="flex justify-between items-center text-[10px] text-app-text/40 font-semibold uppercase tracking-wider">
            <span>Current Size: {settings.fontSize}px</span>
            <span>Speed: {settings.autoScrollSpeed}</span>
          </div>

          {/* Premium Done Confirmation button */}
          <button
            onClick={() => setShowFontControl(false)}
            className="mt-2 w-full py-3 bg-app-primary text-app-bg rounded-full text-xs font-bold shadow-md hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
          >
            Done
          </button>
        </DialogContent>
      </Dialog>

      {/* Spacing Settings Modal */}
      <Dialog open={showSpacingControl} onOpenChange={setShowSpacingControl}>
        <DialogContent className="flex flex-col gap-4" showCloseButton={false}>
          <div className="flex items-center justify-between text-[10px] font-bold text-app-text/50 tracking-wider uppercase">
            <span>Spacing Controls</span>
            <button
              onClick={() => setShowSpacingControl(false)}
              className="text-app-primary hover:opacity-80 transition-opacity font-sans font-bold"
            >
              Close
            </button>
          </div>

          {/* Segmented control for spacing levels */}
          <div className="flex bg-app-primary/5 p-1 rounded-xl border border-app-border/40 gap-1 w-full mt-1">
            {(
              [
                { id: "normal", label: "Normal (1.6x)" },
                { id: "spacious", label: "Spacious (2.0x)" },
                { id: "relaxed", label: "Relaxed (2.4x)" }
              ] as const
            ).map((level) => (
              <button
                key={level.id}
                onClick={() => setLineSpacing(level.id)}
                className={`flex-1 text-center py-2 px-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  lineSpacing === level.id
                    ? "bg-app-primary text-app-bg shadow-sm"
                    : "text-app-text/60 hover:text-app-text hover:bg-app-primary/5"
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center text-[10px] text-app-text/40 font-semibold uppercase tracking-wider">
            <span>Current Style: {lineSpacing}</span>
            <span>
              Line height:{" "}
              {lineSpacing === "normal" ? "1.6" : lineSpacing === "spacious" ? "2.0" : "2.4"}
            </span>
          </div>

          {/* Premium Done Confirmation button */}
          <button
            onClick={() => setShowSpacingControl(false)}
            className="mt-2 w-full py-3 bg-app-primary text-app-bg rounded-full text-xs font-bold shadow-md hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
          >
            Done
          </button>
        </DialogContent>
      </Dialog>

      {/* 4. MAIN LYRICS CONTENT CARD */}
      <main className="lyrics-card-wrapper">
        <div className="lyrics-card">
          {song.sections.map((sec, secIdx) => {
            return (
              <div key={sec.id} id={sec.id} className="lyrics-section-block">
                {/* Gold bullet dot paired with serif bold label header */}
                <div className="lyrics-section-header">
                  <span className="lyrics-bullet-dot">•</span>
                  <span className="lyrics-section-label font-serif">{sec.label}</span>
                </div>

                {/* Left-aligned lines styled based on custom active spacing level using dynamic Tailwind classes */}
                <div
                  className={`flex flex-col text-left pl-2.5 text-app-text font-serif ${spacingClasses.container}`}
                  style={{ fontSize: `${settings.fontSize}px` }}
                >
                  {sec[activeLang].map((line, idx) => (
                    <div key={idx} className={`flex flex-col m-0 ${spacingClasses.line}`}>
                      {/* Acoustic Chords displayed overlay when enabled */}
                      {settings.studyMode &&
                        activeLang !== "tamil" &&
                        sec.chords &&
                        sec.chords[idx] && (
                          <span className="lyrics-chord-line font-mono select-none">
                            {sec.chords[idx]}
                          </span>
                        )}
                      <p className="m-0 font-medium">{line}</p>
                    </div>
                  ))}
                </div>

                {/* Premium cross symbol separator between consecutive sections */}
                {secIdx < song.sections.length - 1 && (
                  <div className="lyrics-separator">
                    <div className="separator-line" />
                    <span className="separator-cross">†</span>
                    <div className="separator-line" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* 5. ACTIVE AUTO-SCROLL DECK (shows at the bottom to adjust speeds ONLY when actively scrolling) */}
      {isScrolling && (
        <div className="fixed bottom-24 md:bottom-6 left-0 right-0 z-40 flex items-center justify-center px-4 pointer-events-none animate-fadeIn">
          <div className="flex items-center gap-3 bg-app-card/95 border border-app-border/50 rounded-full py-2 px-5 premium-shadow pointer-events-auto select-none">
            <button
              onClick={() =>
                updateSettings({ autoScrollSpeed: Math.max(1, settings.autoScrollSpeed - 1) })
              }
              className="text-app-text/50 hover:text-app-primary text-[10px] font-bold px-1"
            >
              Slower
            </button>

            <button
              onClick={startAutoScroll}
              className="w-8 h-8 rounded-full bg-app-accent flex items-center justify-center text-app-primary shadow-sm"
            >
              <Pause size={14} strokeWidth={2.5} />
            </button>

            <button
              onClick={() =>
                updateSettings({ autoScrollSpeed: Math.min(10, settings.autoScrollSpeed + 1) })
              }
              className="text-app-text/50 hover:text-app-primary text-[10px] font-bold px-1"
            >
              Faster
            </button>

            <span className="text-[9px] font-bold bg-app-primary/5 border border-app-border/20 px-2 py-0.5 rounded-md text-app-primary">
              Speed: {settings.autoScrollSpeed}
            </span>
          </div>
        </div>
      )}

      {/* 6. FLOATING RIGHT CAPSULE CONTROL PANEL */}
      {typeof document !== "undefined" &&
        createPortal(
          <div className="fixed-capsule-panel-container">
            <div className="floating-capsule-panel">
              {/* Button 1: Adjust Font size */}
              <button
                onClick={() => setShowFontControl(!showFontControl)}
                className={`capsule-btn ${showFontControl ? "active" : ""}`}
                title="Font Adjust"
              >
                <div className="capsule-btn-icon-box">
                  <span className="font-aa-icon">
                    A<sub>A</sub>
                  </span>
                </div>
              </button>

              {/* Button 2: Adjust spacing levels */}
              <button
                onClick={() => setShowSpacingControl(!showSpacingControl)}
                className={`capsule-btn spacing-${lineSpacing} ${showSpacingControl ? "active" : ""}`}
                title="Adjust Line Spacing"
              >
                <div className="capsule-btn-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="21" y1="6" x2="3" y2="6" />
                    <line x1="17" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="18" x2="3" y2="18" />
                  </svg>
                </div>
                {/* <span className="capsule-btn-label">Spacing</span> */}
              </button>

              {/* Button 3: Toggle auto scrolling */}
              <button
                onClick={startAutoScroll}
                className={`capsule-btn ${isScrolling ? "active" : ""}`}
                title="Toggle Auto Scroll"
              >
                <div className="capsule-btn-icon-box">
                  {isScrolling ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                      <rect x="14" y="4" width="4" height="16" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m10 8 6 4-6 4V8z" />
                    </svg>
                  )}
                </div>
                {/* <span className="capsule-btn-label">Auto Scroll</span> */}
              </button>

              {/* Button 4: Toggle Night mode theme */}
              <button
                onClick={toggleNightMode}
                className={`capsule-btn ${settings.theme === "worship" ? "active" : ""}`}
                title="Toggle Night Mode"
              >
                <div className="capsule-btn-icon-box">
                  {settings.theme === "worship" ? (
                    <Sun size={15} strokeWidth={2.2} />
                  ) : (
                    <Moon size={15} strokeWidth={2.2} />
                  )}
                </div>
                {/* <span className="capsule-btn-label">Night Mode</span> */}
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
