import React, { useState } from 'react';
import {
  Layers,
  Cpu,
  Smartphone,
  Eye,
  Radio,
  Share2,
  Download,
  FolderTree,
  ChevronRight,
  Sparkles,
  Bot,
  Activity,
  Terminal,
  Volume2
} from 'lucide-react';
import {
  ARCHITECTURE_LAYERS,
  APP_DESCRIPTION_HI,
  APP_DESCRIPTION_EN,
  CODE_FILES
} from '../data/architectureData';
import { Language } from '../types';

interface ArchitectureExplorerProps {
  language: Language;
}

export const ArchitectureExplorer: React.FC<ArchitectureExplorerProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'layers' | 'pipeline' | 'tree' | 'description'>('pipeline');

  const downloadFullArchitectureDoc = () => {
    const docContent = `# YESMIN AI - Android Architecture & Technical Specification

## 1. Overview (विवरण)
${language === 'hi' ? APP_DESCRIPTION_HI : APP_DESCRIPTION_EN}

---

## 2. System Architecture Layers
${ARCHITECTURE_LAYERS.map(
  (l) => `
### ${language === 'hi' ? l.titleHi : l.titleEn}
${language === 'hi' ? l.descriptionHi : l.descriptionEn}

**Core Components:**
${l.components
  .map(
    (c) =>
      `- **${c.name}** (${c.tech}): ${language === 'hi' ? c.roleHi : c.roleEn}`
  )
  .join('\n')}
`
).join('\n')}

---

## 3. Android Project Directory Structure
\`\`\`
app/
├── src/
│   ├── main/
│   │   ├── AndroidManifest.xml
│   │   ├── java/com/yesmin/ai/
│   │   │   ├── MainActivity.kt
│   │   │   ├── YesminApplication.kt
│   │   │   ├── ui/
│   │   │   │   ├── avatar/
│   │   │   │   │   └── YesminAvatarView.kt
│   │   │   │   ├── overlay/
│   │   │   │   │   └── VoiceAssistantOverlay.kt
│   │   │   │   └── theme/
│   │   │   ├── domain/
│   │   │   │   ├── gemini/
│   │   │   │   │   └── GeminiAgentService.kt
│   │   │   │   └── router/
│   │   │   │       └── DeviceActionRouter.kt
│   │   │   ├── hardware/
│   │   │   │   ├── DeviceControlManager.kt
│   │   │   │   └── YesminDeviceAdminReceiver.kt
│   │   │   ├── service/
│   │   │   │   ├── VoiceAssistantService.kt
│   │   │   │   └── YesminAccessibilityService.kt
│   │   │   └── data/
│   │   │       └── db/
│   │   └── res/
│   │       ├── xml/
│   │       │   ├── accessibility_service_config.xml
│   │       │   └── device_admin_policies.xml
│   │       └── values/
└── build.gradle.kts
\`\`\`

---

## 4. Key Production Source Files
${CODE_FILES.map(
  (f) => `
### \`${f.name}\` (${f.path})
*${language === 'hi' ? f.summaryHi : f.summaryEn}*

\`\`\`${f.language}
${f.code.trim()}
\`\`\`
`
).join('\n\n')}
`;

    const blob = new Blob([docContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `YESMIN_AI_ARCHITECTURE_SPEC.md`;
    a.click();
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl flex flex-col">
      {/* Header and Sub Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white tracking-wide">
              {language === 'hi' ? 'YESMIN AI विस्तृत आर्किटेक्चर' : 'YESMIN AI System Architecture'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'hi'
              ? 'क्लीन आर्किटेक्चर, जेमिनी एआई इंटीग्रेशन, और हार्डवेयर एब्स्ट्रैक्शन लेयर'
              : 'Clean Architecture, Gemini AI Integration & Android Hardware HAL'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Sub Navigation Buttons */}
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'pipeline'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'hi' ? 'सिस्टम पाइपलाइन' : 'Pipeline'}
            </button>
            <button
              onClick={() => setActiveTab('layers')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'layers'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'hi' ? 'आर्किटेक्चर लेयर्स' : 'Layers'}
            </button>
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'tree'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'hi' ? 'प्रोजेक्ट ट्री' : 'Tree'}
            </button>
            <button
              onClick={() => setActiveTab('description')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'description'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'hi' ? 'विवरण' : 'Spec'}
            </button>
          </div>

          <button
            onClick={downloadFullArchitectureDoc}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-semibold border border-cyan-500/30 transition-all cursor-pointer shadow-md"
            title="Download Architecture Spec as Markdown"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{language === 'hi' ? 'दस्तावेज़ डाउनलोड' : 'Export Spec'}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Visual Pipeline Flow */}
      {activeTab === 'pipeline' && (
        <div className="py-5 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            {language === 'hi'
              ? 'वॉयस इनपुट से लेकर हार्डवेयर एक्शन तक का संपूर्ण एंड-टू-एंड फ्लो:'
              : 'End-to-end execution pipeline from voice capture to Android hardware execution:'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between relative group hover:border-cyan-500/50 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 font-semibold block mb-1">
                  STAGE 01
                </span>
                <h4 className="text-sm font-semibold text-white mb-1">
                  {language === 'hi' ? 'वॉयस इनपुट व वेक-वर्ड' : 'Voice Input & Wake Word'}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {language === 'hi'
                    ? 'Picovoice Porcupine द्वारा "Hey Yesmin" पहचान। Android SpeechRecognizer द्वारा द्विभाषी (Hindi + English) स्पीच-टू-टेक्स्ट रूपांतरण।'
                    : 'Picovoice Porcupine low-power wake word listening ("Hey Yesmin") & Android SpeechRecognizer for bilingual streaming.'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-cyan-300">
                VoiceAssistantService
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between relative group hover:border-pink-500/50 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-3">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-pink-400 font-semibold block mb-1">
                  STAGE 02
                </span>
                <h4 className="text-sm font-semibold text-white mb-1">
                  {language === 'hi' ? 'एनिमेटेड अवतार स्टेट' : 'Animated Avatar HUD'}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {language === 'hi'
                    ? '60 FPS Jetpack Compose Canvas अवतार तुरंत Listening/Thinking मोड में बदलता है और ऑडियो लेवल के अनुसार तरंगे प्रदर्शित करता है।'
                    : 'Jetpack Compose Canvas switches avatar state to Listening/Thinking with real-time audio reactive soundwave frequencies.'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-pink-300">
                YesminAvatarView.kt
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between relative group hover:border-purple-500/50 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-purple-400 font-semibold block mb-1">
                  STAGE 03
                </span>
                <h4 className="text-sm font-semibold text-white mb-1">
                  {language === 'hi' ? 'जेमिनी 3.8 फ्लैश टूल कॉलिंग' : 'Gemini 3.8 Flash Engine'}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {language === 'hi'
                    ? 'Gemini 3.8 Flash मॉडल इंटेंट समझता है और हार्डवेयर कंट्रोल के लिए फंक्शन कॉल (उदा. toggle_flashlight, set_volume) रिटर्न करता है।'
                    : 'Gemini 3.8 Flash model maps natural language to structured Function Calls with arguments for target Android APIs.'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-purple-300">
                GeminiAgentService.kt
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between relative group hover:border-emerald-500/50 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold block mb-1">
                  STAGE 04
                </span>
                <h4 className="text-sm font-semibold text-white mb-1">
                  {language === 'hi' ? 'एंड्रॉइड हार्डवेयर एक्जीक्यूशन' : 'Hardware Execution & TTS'}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {language === 'hi'
                    ? 'CameraManager, AudioManager, या AccessibilityService क्रियान्वित होती है और Text-to-Speech द्वारा वॉयस पुष्टिकरण दिया जाता है।'
                    : 'Direct execution via CameraManager, AudioManager, or AccessibilityService, followed by neural Hindi/English TTS response.'}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-emerald-300">
                DeviceControlManager.kt
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Architecture Layers */}
      {activeTab === 'layers' && (
        <div className="py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ARCHITECTURE_LAYERS.map((layer) => (
              <div
                key={layer.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                <h3 className="text-sm font-bold text-cyan-300 mb-1">
                  {language === 'hi' ? layer.titleHi : layer.titleEn}
                </h3>
                <p className="text-xs text-slate-400 mb-3">
                  {language === 'hi' ? layer.descriptionHi : layer.descriptionEn}
                </p>

                <div className="space-y-2">
                  {layer.components.map((comp) => (
                    <div
                      key={comp.name}
                      className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 flex flex-col gap-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-white">
                          {comp.name}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                          {comp.tech}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        {language === 'hi' ? comp.roleHi : comp.roleEn}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Android Project Tree */}
      {activeTab === 'tree' && (
        <div className="py-4 font-mono text-xs text-slate-300 bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-x-auto leading-relaxed">
          <p className="text-cyan-400 font-bold mb-3">
            📁 YESMIN AI - Production Android Project Tree (Clean Architecture)
          </p>
          <pre className="text-slate-300 selection:bg-cyan-500/30">
{`com.yesmin.ai/
├── di/
│   ├── AppModule.kt                   // Hilt application modules & singletons
│   └── NetworkModule.kt               // Gemini Client & OkHttp client provider
├── ui/
│   ├── avatar/
│   │   ├── YesminAvatarView.kt        // Jetpack Compose 60 FPS Canvas Avatar
│   │   ├── WaveformVisualizer.kt      // Audio reactive FFT visualizer
│   │   └── AvatarState.kt             // Emotive enum states
│   ├── home/
│   │   ├── HomeScreen.kt              // Edge-to-edge Compose voice HUD
│   │   └── HomeViewModel.kt           // StateFlow & voice state orchestrator
│   ├── overlay/
│   │   └── VoiceAssistantOverlay.kt   // Floating bubble over other apps (WindowManager)
│   ├── quicksettings/
│   │   └── YesminTileService.kt       // Android Quick Settings notification tile
│   └── theme/
│       ├── Color.kt
│       ├── Theme.kt
│       └── Type.kt
├── domain/
│   ├── gemini/
│   │   ├── GeminiAgentService.kt      // Gemini 3.8 Flash & tool declarations
│   │   └── GeminiTools.kt             // Tool definitions (Flashlight, Volume, Wifi)
│   ├── usecase/
│   │   ├── ProcessVoiceQueryUseCase.kt
│   │   └── ExecuteDeviceActionUseCase.kt
│   └── wakeword/
│       └── WakeWordDetector.kt        // Porcupine low-power audio stream listener
├── hardware/
│   ├── DeviceControlManager.kt        // CameraManager, AudioManager, Settings.System
│   └── YesminDeviceAdminReceiver.kt   // DevicePolicyManager screen lock privileges
├── service/
│   ├── VoiceAssistantService.kt       // Sticky Foreground Service with Notification
│   └── YesminAccessibilityService.kt  // Zero-root UI clicks, auto-typing, screen inspection
└── data/
    ├── local/
    │   ├── AppDatabase.kt             // Room Database for chat history
    │   └── entity/ChatEntity.kt
    └── repository/
        └── DeviceSettingsRepository.kt // Reactive battery, wifi & volume StateFlow`}
          </pre>
        </div>
      )}

      {/* Tab 4: Prompt & App Description */}
      {activeTab === 'description' && (
        <div className="py-4 space-y-4 text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-cyan-200">
            <span className="font-semibold block mb-1">
              {language === 'hi' ? 'मूल यूजर प्रॉम्प्ट:' : 'Original User Prompt:'}
            </span>
            <p className="italic font-mono text-[11px] text-cyan-300">
              "एक एंड्रॉइड ऐप का विवरण दें जिसका नाम YESMIN AI हो। इसमें एक एनिमेटेड एआई अवतार, वॉयस असिस्टेंट, जेमिनी एआई एकीकरण और Android डिवाइस कंट्रोल फीचर्स शामिल हैं। इस प्रॉम्प्ट के आधार पर ऐप का विस्तृत आर्किटेक्चर और कोड स्ट्रक्चर तैयार करें।"
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <h4 className="text-white font-bold text-sm mb-2">
              {language === 'hi' ? 'YESMIN AI संपूर्ण विनिर्देश' : 'YESMIN AI Complete Specification'}
            </h4>
            <div className="whitespace-pre-line text-slate-300">
              {language === 'hi' ? APP_DESCRIPTION_HI : APP_DESCRIPTION_EN}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
