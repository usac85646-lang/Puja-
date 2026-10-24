import React, { useState } from 'react';
import { Copy, Check, FileCode, Download } from 'lucide-react';
import { CodeFile, Language } from '../types';

interface CodeViewerProps {
  files: CodeFile[];
  language: Language;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ files, language }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeFile = files[selectedFileIndex] || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeFile.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[740px]">
      {/* File Tab Selector */}
      <div className="bg-slate-900 border-b border-slate-800 px-3 pt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {files.map((file, idx) => (
          <button
            key={file.path}
            onClick={() => setSelectedFileIndex(idx)}
            className={`px-3 py-2 rounded-t-xl text-xs font-mono flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border-t border-x ${
              selectedFileIndex === idx
                ? 'bg-slate-950 text-cyan-400 border-slate-800 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border-transparent hover:bg-slate-800/50'
            }`}
          >
            <FileCode className={`w-3.5 h-3.5 ${selectedFileIndex === idx ? 'text-cyan-400' : 'text-slate-500'}`} />
            {file.name}
          </button>
        ))}
      </div>

      {/* File Header Bar with File Path & Actions */}
      <div className="px-5 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
        <div>
          <span className="font-mono text-slate-400 text-[11px] block">{activeFile.path}</span>
          <p className="text-slate-300 font-medium text-xs mt-0.5">
            {language === 'hi' ? activeFile.summaryHi : activeFile.summaryEn}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer border border-slate-700"
            title="Download file"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">{language === 'hi' ? 'डाउनलोड' : 'Download'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-md shadow-cyan-600/20"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (language === 'hi' ? 'कॉपी हो गया!' : 'Copied!') : (language === 'hi' ? 'कोड कॉपी करें' : 'Copy Code')}</span>
          </button>
        </div>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="flex-1 overflow-auto bg-slate-950 p-4 font-mono text-[12px] leading-relaxed text-slate-300 selection:bg-cyan-500/30 selection:text-white">
        <pre className="table w-full">
          {activeFile.code.trim().split('\n').map((line, i) => (
            <div key={i} className="table-row hover:bg-slate-900/40">
              <span className="table-cell text-right pr-4 text-slate-600 select-none text-[11px] w-10">
                {i + 1}
              </span>
              <span className="table-cell whitespace-pre">
                {/* Syntax color highlights */}
                {renderHighlightedLine(line)}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

// Light fast syntax highlighter for Kotlin/XML/Gradle
function renderHighlightedLine(line: string) {
  if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }
  if (line.trim().startsWith('package') || line.trim().startsWith('import')) {
    return <span className="text-pink-400 font-medium">{line}</span>;
  }
  if (line.includes('@Composable') || line.includes('@Inject') || line.includes('@Singleton') || line.includes('@AndroidEntryPoint')) {
    return <span className="text-amber-400 font-semibold">{line}</span>;
  }
  if (line.includes('fun ') || line.includes('val ') || line.includes('var ') || line.includes('class ') || line.includes('interface ')) {
    return <span className="text-cyan-300">{line}</span>;
  }
  if (line.includes('override ') || line.includes('suspend ') || line.includes('private ') || line.includes('public ')) {
    return <span className="text-purple-300">{line}</span>;
  }
  return <span>{line}</span>;
}
