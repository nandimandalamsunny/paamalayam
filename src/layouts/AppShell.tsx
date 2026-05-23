import React from 'react';
import { useAppState } from '../store/AppState';
import { BottomNav } from '../components/BottomNav/index';
import { DesktopHeader } from '../components/DesktopHeader/index';
import { MobileHeader } from '../components/MobileHeader/index';
import { Home } from '../pages/Home/index';
import { Search } from '../pages/Search/index';
import { Playlists } from '../pages/Playlists/index';
import { Favorites } from '../pages/Favorites/index';
import { Settings } from '../pages/Settings/index';
import { LyricsDetail } from '../pages/LyricsDetail/index';
import { StudyCompanion } from '../components/StudyCompanion/index';

export const AppShell: React.FC = () => {
  const { currentTab, activeSongId, songs, settings } = useAppState();

  // Find active song if any
  const activeSong = songs.find((s) => s.id === activeSongId);

  // Helper to render the active tab page
  const renderActiveTab = () => {
    switch (currentTab) {
      case 'home':
        return <Home />;
      case 'search':
        return <Search />;
      case 'playlists':
        return <Playlists />;
      case 'favorites':
        return <Favorites />;
      case 'more':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-app-bg text-app-text transition-colors duration-300 flex flex-col font-sans relative antialiased selection:bg-app-accent/35 select-none">
      {/* 1. Desktop Top Header (Hidden on Mobile) */}
      <DesktopHeader />

      {/* 1b. Mobile Top Header (Hidden on Desktop) */}
      <MobileHeader />

      {/* 2. Main Responsive Content Layer */}
      <main className="flex-grow flex flex-col w-full max-w-6xl mx-auto px-0 md:px-6 md:py-8 pb-24 md:pb-8">
        {activeSong ? (
          /* LYRICS VIEW ACTIVE */
          settings.studyMode ? (
            /* WIDE STUDY MODE: DUAL-PANE */
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start px-4 md:px-0">
              {/* Left Column: Lyrics Reader */}
              <div className="lg:col-span-7 bg-app-card/30 rounded-3xl border border-app-border/40 p-4 md:p-6 premium-shadow">
                <LyricsDetail />
              </div>
              
              {/* Right Column: Study Companion Insights */}
              <div className="lg:col-span-5 sticky top-24">
                <StudyCompanion song={activeSong} />
              </div>
            </div>
          ) : (
            /* STANDARD LYRICS READER (Single-Pane Centered) */
            <div className="flex-grow max-w-2xl mx-auto w-full px-4 md:px-0 animate-fadeIn">
              <LyricsDetail />
            </div>
          )
        ) : (
          /* NO LYRICS OPEN: Standard catalog lookup grids */
          <div className="flex-grow max-w-4xl mx-auto w-full px-4 md:px-0 animate-fadeIn">
            {renderActiveTab()}
          </div>
        )}
      </main>

      {/* 3. Floating Bottom Navigation for Touch Screens */}
      <BottomNav />
    </div>
  );
};
