import React from 'react';
import { useAppState } from '../../store/AppState';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card/index';
import { Switch } from '../../components/ui/Switch/index';
import { Slider } from '../../components/ui/Slider/index';
import { Globe, Eye, BookOpen, Settings as SettingsIcon, Info } from 'lucide-react';
import './Settings.css';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useAppState();

  const themes = [
    { id: 'light', name: 'Light', colorClass: 'bg-white border-slate-200 text-slate-800' },
    { id: 'beige', name: 'Beige', colorClass: 'bg-[#F8F4EC] border-[#E8DFD1] text-[#5B3A29]' },
    { id: 'green', name: 'Green', colorClass: 'bg-[#F1F5E8] border-[#D5DEC4] text-[#2E5A36]' },
    { id: 'worship', name: 'Worship Dark', colorClass: 'bg-[#1E1E1E] border-[#2A2A2A] text-[#E6B566]' },
  ] as const;

  return (
    <div className="flex flex-col gap-5 px-4 md:px-0 select-none animate-fadeIn pb-12">
      
      {/* Header and Title */}
      <div className="px-1 flex items-center justify-between border-b border-app-border/40 pb-4">
        <div>
          <h2 className="text-2xl font-bold font-serif tracking-tight text-app-primary">
            Settings
          </h2>
          <p className="text-xs text-app-text/55 mt-0.5 font-medium">
            Personalize your worship and devotional dashboard
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-app-primary/10 flex items-center justify-center text-app-primary">
          <SettingsIcon size={18} />
        </div>
      </div>

      {/* 1. Language Preference Card */}
      <Card className="border-app-border/30 shadow-sm bg-app-card">
        <CardHeader className="flex flex-row items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-app-primary/10 flex items-center justify-center text-app-primary">
            <Globe size={16} />
          </div>
          <CardTitle className="text-sm font-bold tracking-tight">Language Preferences</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 flex flex-col gap-4">
          {/* App Language */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5 select-none">
              <span className="text-xs font-bold text-app-primary">App Interface Language</span>
              <span className="text-[10px] text-app-text/50">Language of buttons and menus</span>
            </div>
            
            <select
              value={settings.appLanguage}
              onChange={(e) => updateSettings({ appLanguage: e.target.value as 'English' | 'Tamil' })}
              className="text-xs font-bold bg-app-primary/5 text-app-text border border-app-border/45 rounded-lg px-3 py-2 outline-none focus:border-app-primary/30 transition-all select-none"
            >
              <option value="English">English</option>
              <option value="Tamil">Tamil (தமிழ்)</option>
            </select>
          </div>

          <div className="h-[1px] bg-app-border/30" />

          {/* Song default translation */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5 select-none">
              <span className="text-xs font-bold text-app-primary">Default Song Language</span>
              <span className="text-[10px] text-app-text/50">Preferred translation on load</span>
            </div>
            
            <select
              value={settings.songLanguageDefault}
              onChange={(e) => updateSettings({ songLanguageDefault: e.target.value as 'tanglish' | 'tamil' | 'english' })}
              className="text-xs font-bold bg-app-primary/5 text-app-text border border-app-border/45 rounded-lg px-3 py-2 outline-none focus:border-app-primary/30 transition-all select-none"
            >
              <option value="tanglish">Tanglish</option>
              <option value="tamil">Tamil</option>
              <option value="english">English</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* 2. Display Settings Card */}
      <Card className="border-app-border/30 shadow-sm bg-app-card">
        <CardHeader className="flex flex-row items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-app-primary/10 flex items-center justify-center text-app-primary">
            <Eye size={16} />
          </div>
          <CardTitle className="text-sm font-bold tracking-tight">Display & Accessibility</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 flex flex-col gap-5">
          
          {/* Themes */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-0.5 select-none">
              <span className="text-xs font-bold text-app-primary">App Theme Spectrum</span>
              <span className="text-[10px] text-app-text/50">Pick a color scheme for optimal reading comfort</span>
            </div>
            
            <div className="flex items-center gap-3.5 mt-1.5 flex-wrap">
              {themes.map((t) => {
                const isActive = settings.theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => updateSettings({ theme: t.id })}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-full border text-xs font-bold transition-all duration-200 select-none active:scale-95 theme-selector-btn ${
                      isActive
                        ? 'border-app-primary bg-app-primary text-app-bg shadow-sm scale-[1.03]'
                        : `${t.colorClass} text-app-text/70 hover:opacity-90`
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full border border-app-text/10 ${isActive ? 'bg-app-accent' : 'bg-current'}`} />
                    <span>{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-[1px] bg-app-border/30" />

          {/* Auto Scroll speed */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center select-none">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-app-primary">Auto Scroll Speed Default</span>
                <span className="text-[10px] text-app-text/50">Velocity scale for hands-free scrolling</span>
              </div>
              <span className="text-[11px] font-bold text-app-accent bg-app-primary/5 px-2 py-0.5 rounded-md">
                Speed {settings.autoScrollSpeed}
              </span>
            </div>
            <Slider
              min={1}
              max={10}
              value={[settings.autoScrollSpeed]}
              onValueChange={(val) => updateSettings({ autoScrollSpeed: val[0] })}
              className="mt-1"
            />
          </div>

          <div className="h-[1px] bg-app-border/30" />

          {/* Font Size */}
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-center select-none">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-app-primary">Default Reading Lyrics Lyrics Size</span>
                <span className="text-[10px] text-app-text/50">Enlarge or reduce reading lyrics font size</span>
              </div>
              <span className="text-[11px] font-bold text-app-accent bg-app-primary/5 px-2 py-0.5 rounded-md">
                {settings.fontSize}px
              </span>
            </div>
            <Slider
              min={14}
              max={32}
              value={[settings.fontSize]}
              onValueChange={(val) => updateSettings({ fontSize: val[0] })}
              className="mt-1"
            />
          </div>

        </CardContent>
      </Card>

      {/* 3. Study Mode Card */}
      <Card className="border-app-border/30 shadow-sm bg-app-card">
        <CardHeader className="flex flex-row items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-app-primary/10 flex items-center justify-center text-app-primary">
            <BookOpen size={16} />
          </div>
          <CardTitle className="text-sm font-bold tracking-tight">Study Companion Tools</CardTitle>
        </CardHeader>
        <CardContent className="pt-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5 select-none min-w-0 pr-4">
              <span className="text-xs font-bold text-app-primary">Enable Study Mode</span>
              <span className="text-[10px] text-app-text/50 leading-relaxed">
                Display acoustic staves, chords, historical insights, and sticky notes
              </span>
            </div>
            <Switch
              checked={settings.studyMode}
              onCheckedChange={(checked) => updateSettings({ studyMode: checked })}
              className="shrink-0"
            />
          </div>
        </CardContent>
      </Card>

      {/* 4. About App Details */}
      <Card className="border-app-border/20 bg-app-primary/5 border shadow-none animate-fadeIn">
        <CardHeader className="flex flex-row items-center gap-2.5 py-4 pb-2 text-app-primary">
          <Info size={15} />
          <CardTitle className="text-xs font-bold tracking-wider uppercase">Application Information</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 pt-1">
          <p className="text-[11px] text-app-text/65 leading-relaxed font-sans text-justify">
            <strong>Paamalai – CSI Tanglish Songs</strong> is a modern mobile-first digital hymnal application designed to serve the Church of South India congregation worldwide. It bundles lyrics in multiple translations, chords sheets, and offline notebook caches for private meditation.
          </p>
          <div className="text-[10px] text-app-text/40 font-semibold mt-3 text-center uppercase tracking-wider">
            Version 2.0.0 (Clean & Elegant Study) • CSI tanglish
          </div>
        </CardContent>
      </Card>

    </div>
  );
};
