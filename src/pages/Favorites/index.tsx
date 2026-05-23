import React, { useState } from 'react';
import { useAppState } from '../../store/AppState';
import { Card } from '../../components/ui/Card/index';
import { Button } from '../../components/ui/Button/index';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import './Favorites.css';

export const Favorites: React.FC = () => {
  const { favorites, songs, openSong, toggleFavorite, setTab } = useAppState();
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // Categories present inside favorites
  const favoriteSongs = songs.filter((s) => favorites.includes(s.id));
  
  const categories = ['All', ...Array.from(new Set(favoriteSongs.map((s) => s.category)))];

  const filteredFavorites = favoriteSongs.filter((song) => {
    if (!filterCategory || filterCategory === 'All') return true;
    return song.category === filterCategory;
  });

  return (
    <div className="flex flex-col gap-5 px-4 md:px-0 select-none animate-fadeIn">
      
      {/* Header and Title */}
      <div className="px-1 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-serif tracking-tight text-app-primary">
            My Favorites
          </h2>
          <p className="text-xs text-app-text/55 mt-0.5 font-medium">
            Your personal, offline curated worship collection
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-app-accent/15 flex items-center justify-center text-app-primary">
          <Heart size={18} className="fill-app-accent text-app-accent" />
        </div>
      </div>

      {/* Category Chips (Only visible if we have favorites in different categories) */}
      {favoriteSongs.length > 0 && categories.length > 2 && (
        <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((cat, idx) => {
            const isSelected = filterCategory === cat || (cat === 'All' && !filterCategory);
            return (
              <button
                key={idx}
                onClick={() => setFilterCategory(cat === 'All' ? null : cat)}
                className={`px-4.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition-all duration-200 ${
                  isSelected
                    ? 'bg-app-primary border-app-primary text-app-bg shadow-sm'
                    : 'bg-app-card/60 border-app-border/40 text-app-text/60 hover:bg-app-card hover:text-app-text'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Main Listing Grid */}
      {filteredFavorites.length === 0 ? (
        <Card className="p-8 mt-2 flex flex-col items-center justify-center text-center gap-4.5 border-app-border/20 bg-app-card/50 empty-favorites-box">
          <div className="w-16 h-16 rounded-full bg-app-primary/5 flex items-center justify-center text-3xl select-none">
            💝
          </div>
          <div className="flex flex-col gap-0.5">
            <h4 className="text-base font-bold text-app-primary">Your collection is empty</h4>
            <p className="text-xs text-app-text/45 max-w-xs leading-relaxed">
              {filterCategory 
                ? `You don't have any favorites categorized under "${filterCategory}" yet.`
                : "Save your favorite Tamil and Tanglish stanzas for easy reference during congregational praise and personal devotions."}
            </p>
          </div>
          <Button 
            onClick={() => setTab('search')}
            variant="outline"
            className="rounded-full border-app-border/60 text-app-primary hover:bg-app-primary/5 font-bold px-6 py-2"
          >
            <span>Search Hymnal Catalog</span>
          </Button>
        </Card>
      ) : (
        <div className="favorites-list-container mt-1 pb-8">
          {filteredFavorites.map((song) => (
            <div
              key={song.id}
              className="flex items-center justify-between p-4.5 rounded-2xl bg-app-card border border-app-border/30 hover:border-app-primary/20 premium-shadow cursor-pointer transition-all active:scale-[0.99] group favorite-item-card"
              onClick={() => openSong(song.id)}
            >
              <div className="flex items-center gap-4.5 select-none min-w-0 flex-grow">
                <div className="w-10 h-10 rounded-xl bg-app-primary/5 flex items-center justify-center text-app-primary shrink-0 select-none group-hover:scale-105 transition-transform">
                  <span className="text-xs font-bold font-mono">#{song.songNumber}</span>
                </div>
                
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-bold text-app-primary truncate group-hover:text-app-primary transition-colors">
                    {song.title}
                  </span>
                  <span className="text-[11px] font-serif font-medium text-app-text/50 truncate">
                    {song.tamilTitle} • <span className="font-sans font-semibold text-[10px] text-app-accent">{song.category}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Trash/Remove Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Avoid triggering openSong
                    toggleFavorite(song.id);
                  }}
                  className="p-2.5 rounded-full text-app-text/30 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 active:scale-90 transition-all"
                  title="Remove from favorites"
                >
                  <Trash2 size={14} />
                </button>
                <ArrowRight size={14} className="text-app-text/25 mr-1" />
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
