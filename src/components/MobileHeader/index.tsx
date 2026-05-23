import React, { useState } from "react";
import { Bell, X, Sparkles } from "lucide-react";
import { useAppState } from "../../store/AppState";
import meditationHeroBackdrop from "../../assets/meditation_hero_backdrop.png";
import "./MobileHeader.css";

export const MobileHeader: React.FC = () => {
  const { activeSongId, setTab } = useAppState();
  const [showDrawer, setShowDrawer] = useState(false);

  // If a song is actively open, hide the mobile header to let the lyrics toolbar take over
  if (activeSongId) return null;

  return (
    <>
      <header className="md:hidden sticky top-0 z-45 w-full bg-app-bg/95 backdrop-blur-md border-b border-app-border/30 px-4 py-3 select-none flex items-center justify-between mobile-brand-header">
        {/* Left: App Logo & Brand Text */}
        <div
          onClick={() => setTab("home")}
          className="flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform duration-200"
        >
          {/* Rounded Sunset Cross Thumbnail */}
          <div className="w-10 h-10 rounded-2xl overflow-hidden border border-app-border/50 relative shadow-sm logo-thumbnail-container">
            <img
              src={meditationHeroBackdrop}
              alt="Logo Cross"
              className="w-full h-full object-cover object-center logo-thumbnail-image"
            />
            {/* Dark multiply blend overlay on cross logo thumbnail */}
            <div className="absolute inset-0 bg-[#5B3A29]/10 mix-blend-multiply" />
          </div>

          {/* Typography brand stack */}
          <div className="flex flex-col">
            <span className="text-lg font-bold font-serif leading-none tracking-tight text-app-primary">
              Paamalai
            </span>
            <span className="text-[10px] font-semibold text-app-text/45 mt-0.5 font-sans tracking-wide">
              CSI Tanglish Songs
            </span>
          </div>
        </div>

        {/* Right: Luxury Notification Bell */}
        <button
          onClick={() => setShowDrawer(true)}
          className="w-9 h-9 flex items-center justify-center text-app-primary hover:text-app-accent active:scale-90 transition-all relative mobile-notification-bell"
          aria-label="Daily Devotions Notification"
        >
          <Bell size={21} strokeWidth={1.8} />
          {/* Active notification elegant gold pulsing dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D4A373] border border-app-bg animate-pulse" />
        </button>
      </header>

      {/* Daily Devotional Announcement Drawer Overlay */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end select-none animate-fadeIn">
          {/* Semi-transparent Backdrop with heavy blur */}
          <div
            onClick={() => setShowDrawer(false)}
            className="absolute inset-0 bg-black/45 backdrop-blur-md"
          />

          {/* Slide up Drawer Sheet */}
          <div className="relative bg-app-card rounded-t-[2.5rem] border-t border-app-border/50 max-h-[85vh] w-full p-6 md:p-8 flex flex-col gap-5 premium-shadow-lg z-10 animate-slideUp drawer-sheet-container">
            {/* Pull Bar */}
            <div className="w-12 h-1 bg-app-border/60 rounded-full mx-auto -mt-2 mb-2 select-none" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-app-accent animate-pulse" />
                <h3 className="text-base font-bold text-app-primary font-serif tracking-tight">
                  Daily Devotional Deck
                </h3>
              </div>
              <button
                onClick={() => setShowDrawer(false)}
                className="w-8 h-8 rounded-full bg-app-primary/5 hover:bg-app-primary/10 flex items-center justify-center text-app-text/50 active:scale-90 transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* Notification items list */}

            {/* Clear and Dismiss Deck */}
            <button
              onClick={() => setShowDrawer(false)}
              className="w-full h-11 rounded-xl bg-app-primary text-app-bg text-xs font-bold active:scale-98 transition-all shadow-md select-none mt-1"
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </>
  );
};
