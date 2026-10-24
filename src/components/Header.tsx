import React from 'react';
import { Sparkles, Globe, Cpu, Smartphone, Code2, ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeView: 'simulator' | 'code' | 'architecture';
  setActiveView: (view: 'simulator' | 'code' | 'architecture') => void;
  hasGeminiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  activeView,
  setActiveView,
  hasGeminiKey,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-wider text-white font-mono">
                YESMIN AI
              </h1>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                v1.0 ANDROID 15
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {language === 'hi'
                ? 'एनिमेटेड अवतार • वॉयस असिस्टेंट • जेमिनी 3.8 फ्लैश • एंड्रॉइड डिवाइस कंट्रोल'
                : 'Animated Avatar • Voice Assistant • Gemini 3.8 Flash • Android Device Control'}
            </p>
          </div>
        </div>

        {/* View Switcher Tabs & Controls */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 border border-slate-800 p-1 rounded-2xl flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => setActiveView('simulator')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === 'simulator'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'लाइव सिम्युलेटर' : 'Live Simulator'}</span>
            </button>

            <button
              onClick={() => setActiveView('code')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === 'code'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'सोर्स कोड' : 'Source Code'}</span>
            </button>

            <button
              onClick={() => setActiveView('architecture')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeView === 'architecture'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'आर्किटेक्चर' : 'Architecture'}</span>
            </button>
          </div>

          {/* Gemini AI Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono">
            <div className={`w-2 h-2 rounded-full ${hasGeminiKey ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
            <span className="text-slate-300">
              {hasGeminiKey ? 'Gemini 3.8 Flash' : 'Gemini Engine'}
            </span>
          </div>

          {/* Language Switcher (हिन्दी / English) */}
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-all cursor-pointer shadow-sm hover:border-cyan-400"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'hi' ? 'हिन्दी (HI)' : 'English (EN)'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
