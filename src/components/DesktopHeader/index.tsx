import React from 'react';
import { Home, Search, BookOpen, Heart, MoreHorizontal, Sparkles } from 'lucide-react';
import { useAppState } from '../../store/AppState';
import './DesktopHeader.css';

export const DesktopHeader: React.FC = () => {
  const { currentTab, setTab, settings, updateSettings } = useAppState();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'playlists', label: 'Playlists', icon: BookOpen },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'more', label: 'More', icon: MoreHorizontal },
  ] as const;

  return (
    <header className="hidden md:block sticky top-0 z-40 w-full bg-app-card/85 backdrop-blur-md border-b border-app-border/40 select-none">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo and App Title */}
        <div 
          onClick={() => setTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-app-primary flex items-center justify-center text-app-card shadow-sm transition-transform duration-300 group-hover:scale-105">
            <span className="text-xl font-bold font-serif">†</span>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-none font-serif tracking-tight text-app-primary group-hover:opacity-90">
              Paamalai
            </span>
            <span className="text-[10px] font-medium tracking-widest text-app-text/40 uppercase mt-0.5">
              CSI Tanglish
            </span>
          </div>
        </div>

        {/* Center Tab Navigation */}
        <nav className="flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-app-primary text-app-bg shadow-sm'
                    : 'text-app-text/60 hover:text-app-text hover:bg-app-primary/5'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Menu */}
        <div className="flex items-center gap-3">
          {/* Quick study mode badge */}
          <button
            onClick={() => updateSettings({ studyMode: !settings.studyMode })}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
              settings.studyMode
                ? 'bg-app-accent/20 border-app-accent/40 text-app-primary shadow-sm'
                : 'border-app-border text-app-text/50 hover:border-app-text/30 hover:text-app-text/75'
            }`}
          >
            <BookOpen size={13} />
            <span>Study Mode</span>
            <span className={`w-1.5 h-1.5 rounded-full ${settings.studyMode ? 'bg-app-primary animate-pulse' : 'bg-app-text/30'}`} />
          </button>

          {/* Theme display badge */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold text-app-text/50 border border-app-border/20 bg-app-primary/5 select-none">
            <Sparkles size={11} className="text-app-accent" />
            <span className="capitalize">{settings.theme} Theme</span>
          </div>
        </div>
      </div>
    </header>
  );
};
