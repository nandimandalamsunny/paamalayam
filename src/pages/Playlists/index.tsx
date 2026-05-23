import React, { useState } from "react";
import { useAppState } from "../../store/AppState";
import {
  Heart,
  MoreVertical,
  Flame,
  Compass,
  Music,
  BookOpen
} from "lucide-react";
import meditationHeroBackdrop from "../../assets/meditation_hero_backdrop.png";
import "./Playlists.css";
import { Card, CardHeader, CardTitle, CardDescription } from "../../components/ui/Card/index";

export const Playlists: React.FC = () => {
  const { songs, favorites, recentSongIds, toggleFavorite, openSong } = useAppState();
  const [activeSegment, setActiveSegment] = useState<"all" | "recent" | "favorites" | "categories">(
    "all"
  );
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Categories metadata
  const categories = [
    {
      name: "Sunday Worship",
      icon: Flame,
      count: "34 Songs",
      desc: "Opening liturgy, adoration stanzas, and traditional CSI Sunday service hymns.",
      colorClass: "icon-worship"
    },
    {
      name: "Evening Praise",
      icon: Compass,
      count: "18 Songs",
      desc: "Vespers, evening reflection hymns, and peaceful twilight lyrics.",
      colorClass: "icon-carols"
    },
    {
      name: "Festival Carols",
      icon: Music,
      count: "25 Songs",
      desc: "Advent, Christmas, Easter carols, and seasonal celebration stanzas.",
      colorClass: "icon-devotional"
    },
    {
      name: "My Devotional Reading",
      icon: BookOpen,
      count: "12 Songs",
      desc: "Quiet meditation, personal commitment, and trust hymns.",
      colorClass: "icon-worship"
    }
  ];

  // Helper to toggle expanded collection listing
  const toggleCategory = (catName: string) => {
    if (expandedCategory === catName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(catName);
    }
  };

  // Filter songs based on current segment
  const getFilteredSongs = () => {
    switch (activeSegment) {
      case "all":
        return songs;
      case "recent":
        return recentSongIds
          .map((id) => songs.find((s) => s.id === id))
          .filter((s): s is (typeof songs)[0] => !!s);
      case "favorites":
        return songs.filter((s) => favorites.includes(s.id));
      default:
        return [];
    }
  };

  const filteredSongs = getFilteredSongs();

  return (
    <div className="lyrics-catalog-container select-none">
      {/* 1. Catalog Page Header */}

      {/* 2. Segmented Pill Selection Bar */}
      <div className="segment-pills-container">
        <div className="segment-pills-row">
          <button
            className={`segment-pill ${activeSegment === "all" ? "active" : ""}`}
            onClick={() => setActiveSegment("all")}
          >
            All Songs
          </button>
          <button
            className={`segment-pill ${activeSegment === "recent" ? "active" : ""}`}
            onClick={() => setActiveSegment("recent")}
          >
            Recently Added
          </button>
          <button
            className={`segment-pill ${activeSegment === "favorites" ? "active" : ""}`}
            onClick={() => setActiveSegment("favorites")}
          >
            Favorites
          </button>
          <button
            className={`segment-pill ${activeSegment === "categories" ? "active" : ""}`}
            onClick={() => setActiveSegment("categories")}
          >
            Categories
          </button>
        </div>
      </div>

      {/* 3. Catalog Song List Rows or Legacy Categories */}
      <div className="px-1">
        {activeSegment !== "categories" ? (
          filteredSongs.length === 0 ? (
            <div className="empty-catalog-state">
              <Heart size={32} className="text-app-accent/40" />
              <p className="empty-catalog-text">
                {activeSegment === "recent"
                  ? "No songs recently viewed. Tap a song to start praising!"
                  : "No favorited songs yet. Tap the heart icon next to any song to add it here!"}
              </p>
            </div>
          ) : (
            <div className="song-catalog-list">
              {filteredSongs.map((song) => {
                const isFav = favorites.includes(song.id);
                return (
                  <div key={song.id} className="song-catalog-row" onClick={() => openSong(song.id)}>
                    {/* Sunset Cross Thumbnail */}
                    <div
                      className="song-thumbnail-box"
                      style={{ backgroundImage: `url(${meditationHeroBackdrop})` }}
                    >
                      <div className="thumbnail-cross-overlay">†</div>
                    </div>

                    {/* Center Text Details */}
                    <div className="song-catalog-info">
                      <h4 className="song-catalog-title">
                        {song.songNumber}. {song.title}
                      </h4>
                      <p className="song-catalog-subtitle">
                        Song {song.songNumber} • {song.tamilTitle}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="song-catalog-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        className={`heart-btn ${isFav ? "active" : ""}`}
                        onClick={() => toggleFavorite(song.id)}
                        aria-label={isFav ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart size={18} fill={isFav ? "var(--primary-app)" : "none"} />
                      </button>
                      <button className="options-btn" aria-label="More Options">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          /* Categories segment rendering original playlist album cards */
          <div className="categories-grid">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isExpanded = expandedCategory === cat.name;
              const categorySongs = songs.filter((s) => s.category === cat.name);

              return (
                <div key={idx} className="flex flex-col gap-2">
                  <Card
                    onClick={() => toggleCategory(cat.name)}
                    className={`cursor-pointer group active:scale-[0.99] border-app-border/30 backdrop-blur-sm shadow-sm transition-all duration-300 ${
                      isExpanded
                        ? "bg-app-card border-app-primary/20"
                        : "bg-app-card/65 hover:bg-app-card"
                    }`}
                  >
                    <CardHeader className="flex flex-row items-center gap-4 py-4 px-5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center text-app-bg shrink-0 shadow-sm ${cat.colorClass}`}
                      >
                        <Icon size={20} strokeWidth={2.2} />
                      </div>

                      <div className="flex-grow flex flex-col gap-0.5">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm font-bold group-hover:text-app-primary">
                            {cat.name}
                          </CardTitle>
                          <span className="text-[10px] font-bold text-app-accent bg-app-primary/5 border border-app-border/20 px-2 py-0.5 rounded-md">
                            {cat.count}
                          </span>
                        </div>
                        <CardDescription className="text-[11px] leading-normal font-sans pr-2">
                          {cat.desc}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Expanded Category Song Listings styled in the exact same catalog row style */}
                  {isExpanded && (
                    <div className="px-1 pb-3 flex flex-col gap-0 animate-slideDown">
                      {categorySongs.length === 0 ? (
                        <div className="text-center py-4 bg-app-primary/5 rounded-2xl border border-app-border/15 text-[10px] text-app-text/45 font-medium">
                          No matching seeded songs in this demo collection.
                        </div>
                      ) : (
                        categorySongs.map((song) => {
                          const isFav = favorites.includes(song.id);
                          return (
                            <div
                              key={song.id}
                              className="song-catalog-row"
                              onClick={() => openSong(song.id)}
                            >
                              {/* Sunset Cross Thumbnail */}
                              <div
                                className="song-thumbnail-box"
                                style={{ backgroundImage: `url(${meditationHeroBackdrop})` }}
                              >
                                <div className="thumbnail-cross-overlay">†</div>
                              </div>

                              {/* Center Text Details */}
                              <div className="song-catalog-info">
                                <h4 className="song-catalog-title">
                                  {song.songNumber}. {song.title}
                                </h4>
                                <p className="song-catalog-subtitle">
                                  Song {song.songNumber} • {song.tamilTitle}
                                </p>
                              </div>

                              {/* Action Buttons */}
                              <div
                                className="song-catalog-actions"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  className={`heart-btn ${isFav ? "active" : ""}`}
                                  onClick={() => toggleFavorite(song.id)}
                                  aria-label={isFav ? "Remove from Favorites" : "Add to Favorites"}
                                >
                                  <Heart size={18} fill={isFav ? "var(--primary-app)" : "none"} />
                                </button>
                                <button className="options-btn" aria-label="More Options">
                                  <MoreVertical size={18} />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
