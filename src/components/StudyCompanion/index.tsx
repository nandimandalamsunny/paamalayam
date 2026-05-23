import React, { useState, useEffect } from 'react';
import type { Song } from '../../types';
import { useAppState } from '../../store/AppState';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { BookOpen, History, Edit3, Save, AlertCircle } from 'lucide-react';
import './StudyCompanion.css';

interface StudyCompanionProps {
  song: Song;
}

export const StudyCompanion: React.FC<StudyCompanionProps> = ({ song }) => {
  const { notes, updateNote } = useAppState();
  const [localNote, setLocalNote] = useState(notes[song.id] || '');
  const [isSaved, setIsSaved] = useState(false);

  // Sync state when active song changes
  useEffect(() => {
    setLocalNote(notes[song.id] || '');
    setIsSaved(false);
  }, [song.id, notes]);

  const handleSaveNote = () => {
    updateNote(song.id, localNote);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-5 max-h-[calc(100vh-10rem)] overflow-y-auto pr-1 no-scrollbar select-none animate-fadeIn">
      
      {/* Title block */}
      <div className="px-1 border-b border-app-border/40 pb-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-app-text/40 mb-1">
          Study Companion
        </h4>
        <h3 className="text-base font-bold text-app-primary leading-tight">
          {song.title} Insight Tools
        </h3>
      </div>

      {/* 1. Cross References Card */}
      {song.crossReferences && song.crossReferences.length > 0 && (
        <Card className="border-app-border/30 bg-app-card/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-2.5 pb-2">
            <div className="w-8 h-8 rounded-lg bg-app-primary/10 flex items-center justify-center text-app-primary">
              <BookOpen size={16} />
            </div>
            <CardTitle className="text-sm font-bold tracking-tight">
              Cross References
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 pt-2">
            {song.crossReferences.map((ref, idx) => {
              const [verse, text] = ref.split(' - ');
              return (
                <div key={idx} className="p-2.5 rounded-lg bg-app-primary/5 border border-app-border/20 text-xs">
                  <span className="font-bold text-app-primary block mb-0.5">{verse}</span>
                  <span className="text-app-text/70 italic leading-relaxed">"{text}"</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* 2. Historical Background Card */}
      {song.history && (
        <Card className="border-app-border/30 bg-app-card/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center gap-2.5 pb-2">
            <div className="w-8 h-8 rounded-lg bg-app-primary/10 flex items-center justify-center text-app-primary">
              <History size={16} />
            </div>
            <div className="flex flex-col">
              <CardTitle className="text-sm font-bold tracking-tight">
                Historical Context
              </CardTitle>
              {song.composer && (
                <span className="text-[10px] text-app-text/50 font-medium mt-0.5">
                  Composer: {song.composer}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <p className="text-xs text-app-text/75 leading-relaxed font-sans text-justify">
              {song.history}
            </p>
          </CardContent>
        </Card>
      )}

      {/* 3. Interactive User Notes Card */}
      <Card className="border-app-border/40 bg-app-card premium-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-app-primary/10 flex items-center justify-center text-app-primary">
              <Edit3 size={16} />
            </div>
            <CardTitle className="text-sm font-bold tracking-tight">
              Personal Reflection Notes
            </CardTitle>
          </div>
          <Button 
            onClick={handleSaveNote} 
            variant="secondary"
            size="sm"
            className="px-3 py-1 text-xs flex items-center gap-1 rounded-md"
          >
            <Save size={12} />
            <span>{isSaved ? 'Saved!' : 'Save'}</span>
          </Button>
        </CardHeader>
        <CardContent className="pt-2 flex flex-col gap-2.5">
          <textarea
            value={localNote}
            onChange={(e) => setLocalNote(e.target.value)}
            placeholder="Type your personal insights, sermon notes, or worship reflections here..."
            className="w-full h-32 p-3 text-xs leading-relaxed rounded-xl bg-app-primary/5 text-app-text border border-app-border/50 outline-none focus:border-app-primary/30 transition-all font-sans resize-none placeholder:text-app-text/30"
          />
          <div className="flex items-center gap-1.5 text-[10px] text-app-text/45 bg-app-primary/5 p-2 rounded-lg border border-app-border/10">
            <AlertCircle size={12} className="text-app-accent shrink-0" />
            <span>Reflections are stored locally on your device for absolute privacy.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
