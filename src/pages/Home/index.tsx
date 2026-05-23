import React, { useState, useEffect } from "react";
import { useAppState } from "../../store/AppState";
import { Heart, Play, MoreVertical, ChevronRight } from "lucide-react";
import meditationHeroBackdrop from "../../assets/meditation_hero_backdrop.png";
import "./Home.css";

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

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

export const Home: React.FC = () => {
  const { openSong, setTab } = useAppState();

  // 1. Meditation Carousel Slide Config (5 featured songs in database with exact quotes)
  const carouselSongs = [
    {
      id: "song_001",
      title: "Aathmamae, Un Aandavarin",
      songNumber: "01",
      tamilTitle: "ஆத்மமே, உன் ஆண்டவரின்",
      quote: '"Praise the Lord, my soul, and forget not all His benefits."',
      ref: "– Psalm 103:2"
    },
    {
      id: "song-12",
      title: "Visuvasippom Naam",
      songNumber: "12",
      tamilTitle: "விசுவாசிப்போம் நாம்",
      quote: '"Nothing can separate us from the love of God which is in Christ."',
      ref: "– Romans 8:39"
    },
    {
      id: "song-03",
      title: "Yesu Unnai Naesikkirar",
      songNumber: "03",
      tamilTitle: "இயேசு உன்னை நேசிக்கிறார்",
      quote: '"We love Him because He first loved us."',
      ref: "– 1 John 4:19"
    },
    {
      id: "song-04",
      title: "Evening Reflection",
      songNumber: "04",
      tamilTitle: "மாலை நேர தியானம்",
      quote: '"Abide with us: for it is toward evening."',
      ref: "– Luke 24:29"
    },
    {
      id: "song-05",
      title: "Aarathanai Umakke",
      songNumber: "05",
      tamilTitle: "ஆராதனை உமக்கே",
      quote: '"You are worthy, our Lord and God, to receive glory."',
      ref: "– Revelation 4:11"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  // Touch Swipe coordinates
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Auto-play carousel slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSongs.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlide, carouselSongs.length]);

  // Touch handlers for fluid swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveSlide((prev) => (prev + 1) % carouselSongs.length);
    } else if (isRightSwipe) {
      setActiveSlide((prev) => (prev - 1 + carouselSongs.length) % carouselSongs.length);
    }
  };

  // 2. Worship Categories Config
  const categoriesList = [
    { label: "Worship", icon: ChurchIcon },
    { label: "Prayer", icon: PrayerIcon },
    { label: "Youth", icon: YouthIcon },
    { label: "Christmas", icon: ChristmasIcon },
    { label: "Easter", icon: EasterIcon },
    { label: "Devotion", icon: DevotionIcon }
  ];

  // 3. Recently Added Config
  const recentlyAddedSongs = [
    { id: "song_001", title: "Aathmamae, Un Aandavarin", subtitle: "Song 01" },
    { id: "song-03", title: "Yesu Unnai", subtitle: "Song 02" },
    { id: "song-04", title: "Ennal Maravadha Naam", subtitle: "Song 03" }
  ];

  // 4. My Favorites Config (matching screenshot cards)
  const favoritesCards = [
    { id: "song_001", title: "Aathmamae, Un Aandavarin", subtitle: "Song 01" },
    { id: "song-03", title: "Yesu Unnai", subtitle: "Song 02" },
    { id: "song-04", title: "Ennal Maravadha Naam", subtitle: "Song 03" },
    { id: "song-05", title: "Aarathanal Umakke", subtitle: "Song 04" }
  ];

  return (
    <div className="flex flex-col gap-4 select-none pb-20">
      {/* ============================================================== */}
      {/* 1. TODAY'S MEDITATION DYNAMIC SLIDING CAROUSEL */}
      {/* ============================================================== */}
      <div className="relative overflow-hidden rounded-3xl premium-shadow border border-app-border/20 bg-gradient-to-br from-[#FFFDF9] to-[#F8F4EC] meditation-carousel-viewport mt-2">
        {/* Sliding wrapper */}
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex transition-transform duration-500 ease-out meditation-slider-track"
          style={{ transform: `translate3d(-${activeSlide * 100}%, 0, 0)` }}
        >
          {carouselSongs.map((song) => (
            <div
              key={song.id}
              onClick={() => openSong(song.id)}
              className="w-full flex-shrink-0 cursor-pointer group active:scale-[0.99] transition-all duration-300 p-3.5 pb-5.5 flex flex-col gap-1 relative z-10 meditation-slide-pane"
            >
              {/* Luxury Backdrop Image Layer */}
              <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden rounded-3xl">
                <img
                  src={meditationHeroBackdrop}
                  alt="Meditation Sunset Backdrop"
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 opacity-[0.95] mix-blend-multiply"
                />
                {/* Subtle gradient overlays to ensure text readability and exact premium gold matching */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF9]/98 via-[#F3E4C8]/85 via-[#E6C7A2]/55 to-[#D4A373]/15" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#E6C7A2]/30 via-[#F3E4C8]/10 to-transparent" />
              </div>

              {/* Soft spiritual backdrop cross graphic overlay */}
              <div className="absolute right-4 bottom-0 top-0 w-1/3 flex items-center justify-end pointer-events-none select-none text-[#5B3A29]/10 z-5">
                <span className="text-[6.5rem] font-bold font-serif leading-none">†</span>
              </div>

              {/* Top Badge */}
              <div className="flex items-center gap-2 relative z-10">
                <span className="text-[#A97449] text-[9.5px] font-bold uppercase tracking-wider">
                  Today's Meditation
                </span>
              </div>

              {/* Song Meta info */}
              <div className="flex flex-col gap-0.5 relative z-10">
                <h2 className="text-[18px] font-bold font-serif tracking-tight text-[#1A1A1A] group-hover:text-[#5B3A29] transition-colors leading-tight">
                  {song.title}
                </h2>
              </div>

              {/* Description & scripture quote snippet grouped tightly to save vertical height */}
              <div className="flex flex-col gap-0.5 relative z-10">
                <p className="text-[11.5px] text-[#7A6A58] leading-normal font-medium max-w-[210px] italic">
                  {song.quote}
                </p>
                <span className="text-[9.5px] font-bold text-[#A97449]">{song.ref}</span>
              </div>

              {/* Trigger Button */}
              <div className="flex items-center relative z-10">
                <button className="meditation-hero-btn select-none">
                  Read & Meditate
                  <ChevronRight size={11} strokeWidth={3} className="ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginated dots below inside card layer absolute */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-20">
          {carouselSongs.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveSlide(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                activeSlide === idx
                  ? "bg-[#A97449] w-3 scale-110"
                  : "bg-[#A97449]/30 hover:bg-[#A97449]/55"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. "WORSHIP CATEGORIES" HORIZONTAL SCROLL ROW */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold tracking-tight text-app-primary font-serif">
            Worship Categories
          </h3>
          <button
            onClick={() => setTab("search")}
            className="flex items-center text-[11px] font-semibold text-[#A97449] hover:text-[#5B3A29] select-none cursor-pointer"
          >
            View all
            <ChevronRight size={11} strokeWidth={2.5} className="ml-0.5" />
          </button>
        </div>

        {/* Scrolling horizontal category cards */}
        <div className="flex gap-3 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {categoriesList.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => setTab("search")}
                className="category-scroll-card group"
              >
                <div className="category-icon-wrapper group-hover:scale-105 transition-transform duration-200">
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <span className="category-card-label">{cat.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. "RECENTLY ADDED" VERTICAL ROWS */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold tracking-tight text-app-primary font-serif">
            Recently Added
          </h3>
          <button
            onClick={() => setTab("search")}
            className="flex items-center text-[11px] font-semibold text-[#A97449] hover:text-[#5B3A29] select-none cursor-pointer"
          >
            View all
            <ChevronRight size={11} strokeWidth={2.5} className="ml-0.5" />
          </button>
        </div>

        {/* Vertical List */}
        <div className="flex flex-col gap-2.5">
          {recentlyAddedSongs.map((item) => (
            <div key={item.id} onClick={() => openSong(item.id)} className="recent-row-item group">
              <div className="flex items-center gap-3">
                {/* Image Thumbnail with play overlay on first item */}
                <div className="recent-thumbnail-container">
                  <img
                    src={meditationHeroBackdrop}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.id === "song_001" && (
                    <div className="recent-play-overlay">
                      <div className="recent-play-circle">
                        <Play size={7} fill="currentColor" className="ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Song title information in elegant Serif font */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13.5px] font-bold text-app-text font-serif leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[10.5px] text-app-secondary font-semibold">
                    {item.subtitle}
                  </span>
                </div>
              </div>

              {/* Heart and More Options matching screenshot styling exactly */}
              <div
                className="flex items-center gap-3.5 pr-1.5"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="text-[#A97449] hover:text-[#5B3A29] dark:text-[#E6B566] dark:hover:text-[#FFFDF9] transition-colors p-1 flex items-center justify-center">
                  <Heart size={16} strokeWidth={1.8} />
                </button>
                <button className="text-[#7A6A58] hover:text-[#5B3A29] dark:text-[#A39081] dark:hover:text-[#FFFDF9] transition-colors p-1 flex items-center justify-center">
                  <MoreVertical size={16} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 4. "MY FAVORITES" HORIZONTAL SCROLL CARDS */}
      {/* ============================================================== */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-sm font-bold tracking-tight text-app-primary font-serif">
            My Favorites
          </h3>
          <button
            onClick={() => setTab("favorites")}
            className="flex items-center text-[11px] font-semibold text-[#A97449] hover:text-[#5B3A29] select-none cursor-pointer"
          >
            View all
            <ChevronRight size={11} strokeWidth={2.5} className="ml-0.5" />
          </button>
        </div>

        {/* Scroll cards wrapper */}
        <div className="flex gap-4 overflow-x-auto pb-2 pt-0.5 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          {favoritesCards.map((item, idx) => (
            <div key={idx} onClick={() => openSong(item.id)} className="fav-scroll-card group">
              <div className="fav-card-image-wrapper">
                <img
                  src={meditationHeroBackdrop}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Translucent overlay */}
                <div className="absolute inset-0 bg-[#5B3A29]/10 mix-blend-multiply" />

                {/* Bottom Left Play Button */}
                <div className="fav-play-button-overlay">
                  <Play size={10} fill="currentColor" className="ml-0.5" />
                </div>

                {/* Bottom Right Filled Gold Heart */}
                <div className="fav-heart-button-overlay">
                  <Heart size={16} fill="currentColor" strokeWidth={0} />
                </div>
              </div>

              {/* Title & Subtitle Below */}
              <span className="fav-card-title truncate">{item.title}</span>
              <span className="fav-card-subtitle">{item.subtitle}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
