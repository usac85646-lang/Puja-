import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Bluetooth,
  Battery,
  BatteryCharging,
  Zap,
  Lock,
  Unlock,
  Sun,
  Sliders,
  AppWindow,
  RotateCcw,
  Sparkles,
  PhoneCall,
  Camera,
  MessageCircle,
  Settings as SettingsIcon,
  Play
} from 'lucide-react';
import { AvatarState, ChatMessage, DeviceState, Language } from '../types';
import { AvatarCanvas } from './AvatarCanvas';

interface AndroidPhoneSimulatorProps {
  deviceState: DeviceState;
  setDeviceState: React.Dispatch<React.SetStateAction<DeviceState>>;
  avatarState: AvatarState;
  setAvatarState: (state: AvatarState) => void;
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isProcessing: boolean;
  language: Language;
  onLogEvent: (tag: string, message: string, level?: 'I' | 'D' | 'W' | 'E') => void;
}

export const AndroidPhoneSimulator: React.FC<AndroidPhoneSimulatorProps> = ({
  deviceState,
  setDeviceState,
  avatarState,
  setAvatarState,
  messages,
  onSendMessage,
  isProcessing,
  language,
  onLogEvent,
}) => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState<any>(null);
  const [audioLevel, setAudioLevel] = useState(0.2);
  const [isTtsMuted, setIsTtsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState('10:49');

  // Update real-time clock
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 10000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Web Speech API for voice recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      setSpeechRecognitionSupported(true);
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = true;
      recognizer.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognizer.onstart = () => {
        setIsListening(true);
        setAvatarState('listening');
        onLogEvent('VoiceAssistantService', `SpeechRecognizer started (Lang: ${recognizer.lang})`);
      };

      recognizer.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInputText(transcript);
        setAudioLevel(0.6 + Math.random() * 0.4);
      };

      recognizer.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        setAvatarState('idle');
        onLogEvent('VoiceAssistantService', `SpeechRecognizer error: ${event.error}`, 'W');
      };

      recognizer.onend = () => {
        setIsListening(false);
        setAudioLevel(0.15);
      };

      setRecognitionInstance(recognizer);
    }
  }, [language]);

  // Handle Speech Synthesis (TTS) when assistant speaks
  useEffect(() => {
    if (isTtsMuted) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.sender === 'assistant' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(lastMsg.text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.05;

      utterance.onstart = () => {
        setAvatarState('speaking');
        setAudioLevel(0.75);
      };
      utterance.onend = () => {
        setAvatarState('idle');
        setAudioLevel(0.15);
      };
      utterance.onerror = () => {
        setAvatarState('idle');
        setAudioLevel(0.15);
      };

      // Find an Indian English or Hindi voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          (language === 'hi' && (v.lang.includes('hi') || v.lang.includes('IN'))) ||
          (language === 'en' && (v.lang.includes('en-IN') || v.lang.includes('en-US')))
      );
      if (preferredVoice) utterance.voice = preferredVoice;

      window.speechSynthesis.speak(utterance);
    }
  }, [messages, isTtsMuted, language]);

  const toggleMic = () => {
    if (!speechRecognitionSupported || !recognitionInstance) {
      // Fallback if mic not available: trigger sample prompt
      const sample = language === 'hi' ? 'फ्लैशलाइट चालू करो' : 'Turn on flashlight';
      setInputText(sample);
      handleSubmit(sample);
      return;
    }

    if (isListening) {
      recognitionInstance.stop();
      setIsListening(false);
      setAvatarState('idle');
    } else {
      try {
        recognitionInstance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        recognitionInstance.start();
      } catch (e) {
        console.warn('Could not start recognition:', e);
      }
    }
  };

  const handleSubmit = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isProcessing) return;

    setInputText('');
    if (isListening && recognitionInstance) {
      recognitionInstance.stop();
    }
    await onSendMessage(text);
  };

  const quickPrompts = language === 'hi'
    ? [
        { label: '🔦 फ्लैशलाइट चालू करो', text: 'फ्लैशलाइट चालू करो' },
        { label: '🔊 वॉल्यूम 80% करो', text: 'वॉल्यूम 80% कर दो' },
        { label: '☀️ ब्राइटनेस बढ़ाओ', text: 'स्क्रीन ब्राइटनेस 90% करो' },
        { label: '💬 WhatsApp खोलो', text: 'WhatsApp खोलो' },
        { label: '🔋 बैटरी स्टेटस', text: 'बैटरी स्टेटस बताओ' },
        { label: '🔒 फोन लॉक करो', text: 'फोन लॉक करो' },
      ]
    : [
        { label: '🔦 Turn on Flashlight', text: 'Turn on flashlight' },
        { label: '🔊 Set Volume 80%', text: 'Set volume to 80%' },
        { label: '☀️ Set Brightness 90%', text: 'Set screen brightness to 90%' },
        { label: '💬 Open WhatsApp', text: 'Open WhatsApp' },
        { label: '🔋 Battery Status', text: 'What is the battery level?' },
        { label: '🔒 Lock Device', text: 'Lock the phone screen' },
      ];

  const getStatusText = () => {
    switch (avatarState) {
      case 'listening':
        return language === 'hi' ? 'सुन रही हूँ...' : 'Listening...';
      case 'thinking':
        return language === 'hi' ? 'विचार कर रही हूँ...' : 'Thinking...';
      case 'speaking':
        return language === 'hi' ? 'बोल रही हूँ...' : 'Speaking...';
      case 'action_success':
        return language === 'hi' ? 'कार्य पूर्ण हुआ!' : 'Action Executed!';
      case 'action_alert':
        return language === 'hi' ? 'अलर्ट / अनुमति आवश्यक' : 'Alert / Permission Required';
      default:
        return language === 'hi' ? 'सक्रिय एवं तैयार' : 'Ready & Standing By';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Physical Hardware Torch Flare (Simulated LED Flashlight) */}
      {deviceState.flashlight && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-50 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_60px_30px_rgba(255,255,255,0.9),0_0_100px_60px_rgba(255,240,150,0.6)]" />
          <div className="text-[11px] font-mono tracking-wider font-bold text-amber-300 mt-2 bg-black/80 px-2 py-0.5 rounded-full border border-amber-400/40">
            TORCH ACTIVE (CameraManager.setTorchMode)
          </div>
        </div>
      )}

      {/* Futuristic Android Phone Chassis */}
      <div className="relative w-[340px] sm:w-[380px] h-[700px] rounded-[48px] p-3.5 bg-gradient-to-b from-slate-800 via-slate-900 to-black border-4 border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(0,229,255,0.15)] flex flex-col">
        {/* Physical Buttons (Volume & Power Accents on Chassis) */}
        <div className="absolute -left-5 top-28 w-1.5 h-12 bg-slate-700 rounded-l-md border-y border-l border-slate-600" />
        <div className="absolute -left-5 top-44 w-1.5 h-12 bg-slate-700 rounded-l-md border-y border-l border-slate-600" />
        <div className="absolute -right-5 top-32 w-1.5 h-16 bg-slate-700 rounded-r-md border-y border-r border-slate-600" />

        {/* Screen Bezel and Inner Glass Display */}
        <div
          className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col bg-slate-950 transition-all duration-300"
          style={{
            filter: `brightness(${0.4 + (deviceState.brightness / 100) * 0.6})`,
          }}
        >
          {/* Wallpaper Cyber Matrix Background */}
          <div className="absolute inset-0 bg-radial from-cyan-950/30 via-slate-950 to-slate-950 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff08_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Android 15 Status Bar & Dynamic Island */}
          <div className="relative z-30 pt-3 px-6 pb-2 flex items-center justify-between text-xs text-slate-300 font-medium select-none">
            <span className="font-semibold text-white tracking-wide">{currentTime}</span>

            {/* Dynamic Island Pill (Center Notch) */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-black/90 border border-cyan-500/30 rounded-full shadow-inner">
              <div
                className={`w-2 h-2 rounded-full ${
                  avatarState === 'listening'
                    ? 'bg-emerald-400 animate-ping'
                    : avatarState === 'speaking'
                    ? 'bg-pink-400 animate-pulse'
                    : 'bg-cyan-400'
                }`}
              />
              <span className="text-[10px] font-mono text-cyan-300 font-semibold tracking-wider">
                YESMIN AI
              </span>
            </div>

            {/* Right Status Indicators */}
            <div className="flex items-center gap-2">
              {deviceState.wifi ? (
                <Wifi className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <WifiOff className="w-3.5 h-3.5 text-slate-500" />
              )}
              {deviceState.bluetooth ? (
                <Bluetooth className="w-3.5 h-3.5 text-blue-400" />
              ) : null}
              <div className="flex items-center gap-0.5">
                <span className="text-[11px] font-mono">{deviceState.battery}%</span>
                {deviceState.isCharging ? (
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Battery className="w-3.5 h-3.5 text-slate-300" />
                )}
              </div>
            </div>
          </div>

          {/* Screen Content: Locked Screen State */}
          {deviceState.isLocked ? (
            <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-6 text-center animate-fadeIn bg-black/95">
              <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/10">
                <Lock className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-4xl font-bold font-mono tracking-wider text-white mb-1">
                {currentTime}
              </h2>
              <p className="text-sm text-slate-400 mb-8 font-medium">
                {new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 mb-6 max-w-xs">
                {language === 'hi'
                  ? 'सुरक्षा मोड: डिवाइस लॉक है। स्क्रीन अनलॉक करने के लिए नीचे बटन दबाएं या "अनलॉक करो" बोलें।'
                  : 'Device locked via DevicePolicyManager. Tap below or say "Unlock" to resume.'}
              </div>
              <button
                onClick={() => {
                  setDeviceState((prev) => ({ ...prev, isLocked: false }));
                  onLogEvent('DevicePolicyManager', 'Device unlocked by user gesture');
                }}
                className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-medium text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition-all cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                {language === 'hi' ? 'स्वाइप / अनलॉक करें' : 'Unlock Device'}
              </button>
            </div>
          ) : deviceState.activeApp ? (
            /* Screen Content: Active App Simulator Overlay */
            <div className="relative z-20 flex-1 flex flex-col bg-slate-900 animate-fadeIn overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center gap-2">
                  {deviceState.activeApp === 'WhatsApp' ? (
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                  ) : deviceState.activeApp === 'Camera' ? (
                    <Camera className="w-5 h-5 text-rose-400" />
                  ) : (
                    <SettingsIcon className="w-5 h-5 text-cyan-400" />
                  )}
                  <span className="text-sm font-semibold text-white">{deviceState.activeApp}</span>
                </div>
                <button
                  onClick={() => {
                    setDeviceState((prev) => ({ ...prev, activeApp: null }));
                    onLogEvent('ActivityManager', `Closed ${deviceState.activeApp}, returned to Home`);
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded bg-slate-700/60 font-medium cursor-pointer"
                >
                  {language === 'hi' ? 'होम पर लौटें' : 'Home'}
                </button>
              </div>

              {/* App Content Preview */}
              <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                {deviceState.activeApp === 'WhatsApp' ? (
                  <div className="space-y-3 w-full">
                    <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-left text-xs text-emerald-200">
                      <p className="font-semibold text-emerald-300">WhatsApp Automation Active</p>
                      <p className="mt-1 text-slate-300">
                        {language === 'hi'
                          ? 'AccessibilityService नोड ढूंढ रही है: "Type a message..."'
                          : 'YesminAccessibilityService ready to type & send messages'}
                      </p>
                    </div>
                    <div className="p-2.5 bg-slate-800/80 rounded-lg text-xs text-slate-300 text-left">
                      📩 Priya: "Are we meeting today?"
                    </div>
                    <div className="p-2.5 bg-emerald-900/40 rounded-lg text-xs text-emerald-200 text-left">
                      ✓✓ You: "Yes, at 5 PM."
                    </div>
                  </div>
                ) : deviceState.activeApp === 'Camera' ? (
                  <div className="w-full flex-1 rounded-2xl bg-black border border-slate-700 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                    <div className="absolute inset-4 border border-dashed border-cyan-400/40 rounded-xl pointer-events-none" />
                    <Camera className="w-12 h-12 text-slate-500 mb-2" />
                    <span className="text-xs text-slate-400 font-mono">
                      {language === 'hi' ? 'कैमरा प्रिव्यू (CameraX Live)' : 'CameraX Viewfinder'}
                    </span>
                    <button
                      onClick={() => {
                        onLogEvent('CameraX', 'Photo captured and saved to Gallery');
                      }}
                      className="mt-6 w-12 h-12 rounded-full border-4 border-white bg-red-600 hover:bg-red-500 cursor-pointer shadow-lg"
                    />
                  </div>
                ) : (
                  <div className="w-full space-y-2 text-left text-xs">
                    <div className="p-2.5 bg-slate-800/80 rounded-lg text-slate-300">
                      ⚙️ Android System Settings
                    </div>
                    <div className="p-2.5 bg-slate-800/80 rounded-lg text-slate-300">
                      🔒 Accessibility: YesminAccessibilityService (ON)
                    </div>
                    <div className="p-2.5 bg-slate-800/80 rounded-lg text-slate-300">
                      🛡️ Device Admin: YESMIN AI (Active)
                    </div>
                  </div>
                )}
              </div>

              {/* Floating Mini Avatar Widget in other apps */}
              <div
                onClick={() => setDeviceState((prev) => ({ ...prev, activeApp: null }))}
                className="m-3 p-2.5 bg-slate-800/90 border border-cyan-500/40 rounded-2xl flex items-center justify-between shadow-xl cursor-pointer hover:border-cyan-400"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                  </div>
                  <span className="text-xs font-semibold text-cyan-300">
                    {language === 'hi' ? 'फ्लोटिंग येस्मीन असिस्टेंट' : 'Floating Yesmin Overlay'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {language === 'hi' ? 'टैप करके खोलें' : 'Tap to open'}
                </span>
              </div>
            </div>
          ) : (
            /* Screen Content: Main YESMIN AI Assistant Screen */
            <div className="relative z-20 flex-1 flex flex-col justify-between p-4 overflow-y-auto">
              {/* Header Title & Mode Badge */}
              <div className="text-center pt-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[11px] font-medium tracking-wide">
                  <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                  {getStatusText()}
                </div>
              </div>

              {/* Animated 3D/Canvas Holographic Avatar */}
              <div className="flex flex-col items-center justify-center my-auto py-2">
                <AvatarCanvas
                  state={avatarState}
                  audioLevel={audioLevel}
                  size={200}
                  onClick={toggleMic}
                />

                {/* Subtitle / Spoken Transcript Card */}
                {messages.length > 0 && (
                  <div className="w-full mt-3 p-3 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-cyan-500/25 shadow-xl transition-all">
                    <p className="text-xs text-slate-400 font-mono mb-1 flex items-center justify-between">
                      <span>{messages[messages.length - 1].sender === 'user' ? '👤 You' : '✨ YESMIN AI'}</span>
                      <button
                        onClick={() => setIsTtsMuted(!isTtsMuted)}
                        className="text-slate-400 hover:text-white cursor-pointer"
                        title={isTtsMuted ? 'Unmute voice' : 'Mute voice'}
                      >
                        {isTtsMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                      </button>
                    </p>
                    <p className="text-xs text-slate-100 font-medium leading-relaxed max-h-16 overflow-y-auto">
                      {messages[messages.length - 1].text}
                    </p>

                    {messages[messages.length - 1].toolCall && (
                      <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-400 font-mono">
                        <span>⚡ {messages[messages.length - 1].toolCall?.name}</span>
                        <span className="text-[10px] text-emerald-300/80 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                          EXECUTED
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Action Suggestion Chips */}
              <div className="space-y-2 mb-2">
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {quickPrompts.slice(0, 3).map((qp, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmit(qp.text)}
                      disabled={isProcessing}
                      className="flex-shrink-0 text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 hover:border-cyan-500/40 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      {qp.label}
                    </button>
                  ))}
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {quickPrompts.slice(3, 6).map((qp, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSubmit(qp.text)}
                      disabled={isProcessing}
                      className="flex-shrink-0 text-[11px] px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 hover:border-cyan-500/40 transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      {qp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice Input & Command Bar */}
              <div className="flex items-center gap-2 pt-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder={
                      language === 'hi'
                        ? 'बोलें या लिखें (उदा. फ्लैशलाइट ऑन करो)...'
                        : 'Speak or type command (e.g. Turn on flashlight)...'
                    }
                    className="w-full bg-slate-900/90 text-white placeholder-slate-500 text-xs rounded-full pl-4 pr-10 py-2.5 border border-slate-700 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner"
                  />
                  {inputText && (
                    <button
                      onClick={() => handleSubmit()}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-cyan-400 hover:text-cyan-300 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Floating Microphone Trigger Button */}
                <button
                  onClick={toggleMic}
                  className={`p-3 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-90 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse shadow-red-500/50'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-cyan-500/30 hover:shadow-cyan-500/50'
                  }`}
                  title={isListening ? 'Stop listening' : 'Start voice recognition'}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 animate-bounce" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Android Home Navigation Bar Pill */}
          <div className="relative z-30 pb-2 flex justify-center items-center">
            <div
              onClick={() => setDeviceState((prev) => ({ ...prev, activeApp: null }))}
              className="w-28 h-1 rounded-full bg-slate-600/70 hover:bg-cyan-400 cursor-pointer transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
