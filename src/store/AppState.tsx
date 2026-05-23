import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Song, AppSettings } from '../types';
import { SEED_SONGS } from '../data/seedData';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppContextType {
  songs: Song[];
  favorites: string[];
  notes: Record<string, string>;
  settings: AppSettings;
  currentTab: 'home' | 'search' | 'playlists' | 'favorites' | 'more';
  activeSongId: string | null;
  recentSongIds: string[];
  setTab: (tab: 'home' | 'search' | 'playlists' | 'favorites' | 'more') => void;
  openSong: (songId: string) => void;
  closeSong: () => void;
  toggleFavorite: (songId: string) => void;
  updateNote: (songId: string, note: string) => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  clearHistory: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_SETTINGS: AppSettings = {
  appLanguage: 'English',
  songLanguageDefault: 'tanglish',
  autoScrollSpeed: 4,
  fontSize: 20,
  theme: 'beige',
  studyMode: false,
};

const parseRoute = (): { tab: 'home' | 'search' | 'playlists' | 'favorites' | 'more'; songId: string | null } => {
  if (typeof window === 'undefined') {
    return { tab: 'home', songId: null };
  }
  const path = window.location.pathname;
  const searchParams = new URLSearchParams(window.location.search);
  const songId = searchParams.get('song');

  let tab: 'home' | 'search' | 'playlists' | 'favorites' | 'more' = 'home';
  if (path === '/search') tab = 'search';
  else if (path === '/playlists') tab = 'playlists';
  else if (path === '/favorites') tab = 'favorites';
  else if (path === '/more') tab = 'more';

  return { tab, songId };
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sync core collections with local storage
  const [songs] = useLocalStorage<Song[]>('PAAMALAI_SONGS', SEED_SONGS);
  const [settings, setSettings] = useLocalStorage<AppSettings>('PAAMALAI_SETTINGS', DEFAULT_SETTINGS);
  const [favorites, setFavorites] = useLocalStorage<string[]>('PAAMALAI_FAVORITES', []);
  const [notes, setNotes] = useLocalStorage<Record<string, string>>('PAAMALAI_NOTES', {});
  const [recentSongIds, setRecentSongIds] = useLocalStorage<string[]>('PAAMALAI_RECENT', []);

  // UI States (tab route and active song popup)
  const [currentTab, setTabState] = useState<'home' | 'search' | 'playlists' | 'favorites' | 'more'>(() => parseRoute().tab);
  const [activeSongId, setActiveSongId] = useState<string | null>(() => parseRoute().songId);

  // Sync index.css theme classes dynamically when settings.theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-beige', 'theme-green', 'theme-worship');
    root.classList.add(`theme-${settings.theme}`);
  }, [settings.theme]);

  // Synchronize state with URL on browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const { tab, songId } = parseRoute();
      setTabState(tab);
      setActiveSongId(songId);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Set active tab
  const setTab = (tab: 'home' | 'search' | 'playlists' | 'favorites' | 'more') => {
    setTabState(tab);
    // If navigating to another tab, dismiss active lyrics reader for clean UI back-stack
    setActiveSongId(null);

    const newPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== newPath || window.location.search !== '') {
      window.history.pushState({ tab, songId: null }, '', newPath);
    }
  };

  // Open a song to view lyrics, register under recent activity list
  const openSong = (songId: string) => {
    setActiveSongId(songId);
    setRecentSongIds((prev) => {
      const filtered = prev.filter((id) => id !== songId);
      // Limit search history queue to top 6 items
      return [songId, ...filtered].slice(0, 6);
    });

    const currentPath = window.location.pathname;
    const newSearch = `?song=${songId}`;
    window.history.pushState({ tab: currentTab, songId }, '', `${currentPath}${newSearch}`);
  };

  // Return to the active search or list screen
  const closeSong = () => {
    setActiveSongId(null);
    const currentPath = window.location.pathname;
    window.history.pushState({ tab: currentTab, songId: null }, '', currentPath);
  };

  // Toggle favorites star
  const toggleFavorite = (songId: string) => {
    setFavorites((prev) =>
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  // Save personal study reflection for specific song
  const updateNote = (songId: string, text: string) => {
    setNotes((prev) => ({
      ...prev,
      [songId]: text,
    }));
  };

  // Modify individual display settings
  const updateSettings = (updated: Partial<AppSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Flush recent lookup history
  const clearHistory = () => {
    setRecentSongIds([]);
  };

  return (
    <AppContext.Provider
      value={{
        songs,
        favorites,
        notes,
        settings,
        currentTab,
        activeSongId,
        recentSongIds,
        setTab,
        openSong,
        closeSong,
        toggleFavorite,
        updateNote,
        updateSettings,
        clearHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
