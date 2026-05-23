import React from 'react';
import { Home, Search, BookOpen, Heart, User } from 'lucide-react';
import { useAppState } from '../../store/AppState';
import './BottomNav.css';

export const BottomNav: React.FC = () => {
  const { currentTab, setTab } = useAppState();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'playlists', label: 'Lyrics', icon: BookOpen },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'more', label: 'More', icon: User },
  ] as const;

  return (
    <div className="md:hidden bottom-nav-container select-none">
      <nav className="bottom-nav-menu">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          // In the screenshot, only the active Home icon is a solid/filled icon
          const shouldFill = isActive && item.id === 'home';

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`bottom-nav-item ${isActive ? 'active' : ''}`}
              aria-label={item.label}
            >
              <div className="bottom-nav-icon-wrapper">
                <Icon
                  size={21}
                  strokeWidth={1.8}
                  fill={shouldFill ? 'currentColor' : 'none'}
                />
              </div>
              <span className="bottom-nav-label">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
