/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { AndroidPhoneSimulator } from './components/AndroidPhoneSimulator';
import { DeviceHardwareControls } from './components/DeviceHardwareControls';
import { LogcatViewer } from './components/LogcatViewer';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { CodeViewer } from './components/CodeViewer';
import { AvatarCanvas } from './components/AvatarCanvas';
import { CODE_FILES } from './data/architectureData';
import { AvatarState, ChatMessage, DeviceState, Language, LogcatEntry } from './types';
import { Sparkles, ArrowRight, Smartphone, Cpu, Code2, ShieldAlert } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('hi');
  const [activeView, setActiveView] = useState<'simulator' | 'code' | 'architecture'>('simulator');
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [avatarState, setAvatarState] = useState<AvatarState>('idle');

  // Simulated Android Device Hardware State
  const [deviceState, setDeviceState] = useState<DeviceState>({
    flashlight: false,
    volume: 75,
    brightness: 85,
    wifi: true,
    bluetooth: true,
    battery: 84,
    isCharging: false,
    batterySaver: false,
    isLocked: false,
    activeApp: null,
    dnd: false,
  });

  // Chat message thread
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text:
        'नमस्ते! मैं येस्मीन एआई (YESMIN AI) हूँ—आपकी बुद्धिमान एंड्रॉइड साथी। मैं डिवाइस सेटिंग्स नियंत्रित कर सकती हूँ, ऐप्स खोल सकती हूँ और आपके हर सवाल का जवाब दे सकती हूँ। आज मैं आपकी क्या मदद करूँ?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Simulated Android Logcat Entries
  const [logs, setLogs] = useState<LogcatEntry[]>([
    {
      id: 'log-1',
      timestamp: '10:49:01.120',
      tag: 'YesminApplication',
      level: 'I',
      message: 'Application onCreate() - Initializing Hilt DI graph and GeminiAgentService',
    },
    {
      id: 'log-2',
      timestamp: '10:49:01.345',
      tag: 'VoiceAssistantService',
      level: 'I',
      message: 'Foreground service started (CHANNEL_ID=yesmin_voice_service)',
    },
    {
      id: 'log-3',
      timestamp: '10:49:01.512',
      tag: 'DeviceControlManager',
      level: 'D',
      message: 'CameraManager & AudioManager HAL bindings verified (Torch available: true)',
    },
    {
      id: 'log-4',
      timestamp: '10:49:02.010',
      tag: 'YesminAccessibilityService',
      level: 'I',
      message: 'AccessibilityService connected - Ready for on-screen node inspection & tap gestures',
    },
  ]);

  // Check backend Gemini API key status
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHasGeminiKey(Boolean(data.hasGeminiKey));
      })
      .catch((err) => {
        console.warn('Backend health check error:', err);
      });
  }, []);

  const addLog = (tag: string, message: string, level: LogcatEntry['level'] = 'I') => {
    const now = new Date();
    const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
    const newEntry: LogcatEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: timeStr,
      tag,
      level,
      message,
    };
    setLogs((prev) => [...prev, newEntry]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  // Main interaction handler
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isProcessing) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);
    setAvatarState('thinking');
    addLog('VoiceAssistantService', `Spoken input received: "${text}"`, 'I');

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-4).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text,
          })),
          deviceState,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      let executedActionName: string | undefined;

      // Execute Function Calls if Gemini decided to invoke Android Device Controls
      if (data.toolCalls && data.toolCalls.length > 0) {
        setAvatarState('action_success');
        for (const tc of data.toolCalls) {
          executedActionName = tc.name;
          addLog(
            'GeminiAgentService',
            `FunctionCall triggered: ${tc.name}(${JSON.stringify(tc.args)})`,
            'D'
          );

          if (tc.name === 'toggle_flashlight') {
            const newState = Boolean(tc.args.state);
            setDeviceState((prev) => ({ ...prev, flashlight: newState }));
            addLog(
              'CameraManager',
              `setTorchMode(cameraId="0", enabled=${newState}) -> SUCCESS`,
              'I'
            );
          } else if (tc.name === 'set_volume') {
            const level = Number(tc.args.level) || 75;
            setDeviceState((prev) => ({ ...prev, volume: level }));
            addLog('AudioManager', `setStreamVolume(STREAM_MUSIC, ${level}%)`, 'I');
          } else if (tc.name === 'set_brightness') {
            const level = Number(tc.args.level) || 80;
            setDeviceState((prev) => ({ ...prev, brightness: level }));
            addLog('Settings.System', `putInt(SCREEN_BRIGHTNESS, ${Math.round((level / 100) * 255)})`, 'I');
          } else if (tc.name === 'toggle_wifi') {
            const newState = Boolean(tc.args.state);
            setDeviceState((prev) => ({ ...prev, wifi: newState }));
            addLog('WifiManager', `setWifiEnabled(${newState})`, 'I');
          } else if (tc.name === 'toggle_bluetooth') {
            const newState = Boolean(tc.args.state);
            setDeviceState((prev) => ({ ...prev, bluetooth: newState }));
            addLog('BluetoothAdapter', `Bluetooth adapter state -> ${newState ? 'STATE_ON' : 'STATE_OFF'}`, 'I');
          } else if (tc.name === 'open_app') {
            const app = String(tc.args.appName);
            setDeviceState((prev) => ({ ...prev, activeApp: app, isLocked: false }));
            addLog('ActivityManager', `Starting Intent for ${app} via PackageManager`, 'I');
          } else if (tc.name === 'lock_device') {
            setDeviceState((prev) => ({ ...prev, isLocked: true }));
            addLog('DevicePolicyManager', 'Device screen locked via lockNow()', 'W');
          } else if (tc.name === 'toggle_battery_saver') {
            const newState = Boolean(tc.args.state);
            setDeviceState((prev) => ({ ...prev, batterySaver: newState }));
            addLog('PowerManager', `PowerSaveMode toggled to ${newState}`, 'I');
          }
        }
      }

      const assistantMsg: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolCall: data.toolCalls?.[0],
      };

      setMessages((prev) => [...prev, assistantMsg]);
      addLog('GeminiAgentService', `Response delivered (${data.model})`, 'I');
    } catch (err: any) {
      console.error('Error processing query:', err);
      setAvatarState('action_alert');
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text:
          language === 'hi'
            ? 'माफ़ कीजियेगा, अनुरोध प्रोसेस करने में कुछ तकनीकी समस्या हुई।'
            : 'Apologies, there was an issue processing your command.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
      addLog('GeminiAgentService', `Execution failed: ${err.message}`, 'E');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Top Navigation & App Bar */}
      <Header
        language={language}
        setLanguage={setLanguage}
        activeView={activeView}
        setActiveView={setActiveView}
        hasGeminiKey={hasGeminiKey}
      />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Hero Banner with Key Metrics */}
        <div className="mb-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-cyan-950/30 to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {language === 'hi'
                  ? 'एंड्रॉइड ऐप आर्किटेक्चर एवं लाइव डेमो'
                  : 'Android Architecture & Live Interactive Demo'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {language === 'hi'
                ? 'YESMIN AI: एनिमेटेड अवतार व एंड्रॉइड डिवाइस कंट्रोलर'
                : 'YESMIN AI: Animated Avatar & Android Hardware Control Assistant'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {language === 'hi'
                ? 'Google Gemini 3.8 Flash, Jetpack Compose 60 FPS कैनवास अवतार, बैकग्राउंड वॉयस सर्विस, और डीप एंड्रॉइड सिस्टम एपीआई (कैमरा फ्लैशलाइट, वॉल्यूम, वाईफाई, स्क्रीन ब्राइटनेस, और एक्सेसिबिलिटी ऑटोमेशन) के साथ संपूर्ण आर्किटेक्चर।'
                : 'Full architectural blueprint and live simulator powered by Gemini 3.8 Flash, 60 FPS Jetpack Compose Canvas Avatar, background voice recognition, and native Android HAL APIs.'}
            </p>
          </div>

          {/* Quick CTA switches */}
          <div className="relative z-10 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveView('simulator')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeView === 'simulator'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <Smartphone className="w-4 h-4 text-cyan-300" />
              <span>{language === 'hi' ? 'फोन सिम्युलेटर' : 'Phone Simulator'}</span>
            </button>
            <button
              onClick={() => setActiveView('code')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeView === 'code'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <Code2 className="w-4 h-4 text-cyan-300" />
              <span>{language === 'hi' ? 'सोर्स कोड एक्सप्लोरर' : 'Kotlin Source Code'}</span>
            </button>
            <button
              onClick={() => setActiveView('architecture')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeView === 'architecture'
                  ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-300" />
              <span>{language === 'hi' ? 'सिस्टम आर्किटेक्चर' : 'Architecture Spec'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic View Display */}
        {activeView === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Android Phone Simulator (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <AndroidPhoneSimulator
                deviceState={deviceState}
                setDeviceState={setDeviceState}
                avatarState={avatarState}
                setAvatarState={setAvatarState}
                messages={messages}
                onSendMessage={handleSendMessage}
                isProcessing={isProcessing}
                language={language}
                onLogEvent={addLog}
              />
            </div>

            {/* Right Column: Hardware Controls & Live Android Logcat (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Hardware Toggles & Sliders */}
              <DeviceHardwareControls
                deviceState={deviceState}
                setDeviceState={setDeviceState}
                language={language}
                onLogEvent={addLog}
              />

              {/* Real-time Android Logcat Terminal */}
              <LogcatViewer logs={logs} onClearLogs={clearLogs} language={language} />

              {/* Architectural Quick Links Card */}
              <div className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    {language === 'hi' ? 'एंड्रॉइड प्रोडक्शन कोड देखना चाहते हैं?' : 'Need the Kotlin & Jetpack Compose Code?'}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {language === 'hi'
                      ? 'MainActivity.kt, GeminiAgentService.kt, DeviceControlManager.kt और AndroidManifest.xml'
                      : 'Includes full source files for MainActivity, GeminiAgent, CameraManager, and AccessibilityService.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('code')}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>{language === 'hi' ? 'कोड देखें' : 'View Code'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeView === 'code' && (
          <div className="space-y-6">
            <CodeViewer files={CODE_FILES} language={language} />
          </div>
        )}

        {activeView === 'architecture' && (
          <div className="space-y-6">
            <ArchitectureExplorer language={language} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-500 font-mono">
        YESMIN AI • Powered by Google Gemini 3.8 Flash & Android OS Architecture • Built with React & TypeScript
      </footer>
    </div>
  );
}
