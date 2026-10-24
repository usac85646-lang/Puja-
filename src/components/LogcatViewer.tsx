import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Trash2, ShieldCheck, Download, Filter } from 'lucide-react';
import { LogcatEntry, Language } from '../types';

interface LogcatViewerProps {
  logs: LogcatEntry[];
  onClearLogs: () => void;
  language: Language;
}

export const LogcatViewer: React.FC<LogcatViewerProps> = ({ logs, onClearLogs, language }) => {
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const filteredLogs = logs.filter((log) => {
    if (filterLevel === 'ALL') return true;
    return log.level === filterLevel;
  });

  const getLevelBadge = (level: LogcatEntry['level']) => {
    switch (level) {
      case 'E':
        return <span className="text-red-400 font-bold bg-red-950/60 px-1 rounded">E</span>;
      case 'W':
        return <span className="text-amber-400 font-bold bg-amber-950/60 px-1 rounded">W</span>;
      case 'D':
        return <span className="text-cyan-400 font-bold bg-cyan-950/60 px-1 rounded">D</span>;
      default:
        return <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1 rounded">I</span>;
    }
  };

  const exportLogs = () => {
    const text = logs
      .map((l) => `${l.timestamp} [${l.level}] ${l.tag}: ${l.message}`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `yesmin_android_logcat_${Date.now()}.log`;
    a.click();
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 shadow-2xl flex flex-col h-[320px]">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-white font-mono tracking-wider">
            Android Logcat (adb logcat -s Yesmin:V)
          </span>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-mono">
            {logs.length} logs
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Level Filter */}
          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-mono rounded-lg px-2 py-1 focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            <option value="ALL">ALL LEVELS</option>
            <option value="I">INFO (I)</option>
            <option value="D">DEBUG (D)</option>
            <option value="W">WARN (W)</option>
            <option value="E">ERROR (E)</option>
          </select>

          <button
            onClick={exportLogs}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            title="Export logcat"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onClearLogs}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            title="Clear logs"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Log Terminal Body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto mt-2 font-mono text-[11px] leading-relaxed space-y-1.5 pr-2 no-scrollbar"
      >
        {filteredLogs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs">
            {language === 'hi'
              ? 'कोई लॉग नहीं हैं। फोन सिम्युलेटर में कमांड बोलें या हार्डवेयर टॉगल करें।'
              : 'No logs yet. Speak a voice command or toggle hardware controls.'}
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-2 hover:bg-slate-900/60 p-1 rounded transition-colors"
            >
              <span className="text-slate-500 text-[10px] select-none">{log.timestamp}</span>
              {getLevelBadge(log.level)}
              <span className="text-cyan-300/90 font-medium select-none">{log.tag}:</span>
              <span className="text-slate-200 flex-1 break-all">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
