import { ArchitectureLayer, CodeFile } from '../types';

export const APP_DESCRIPTION_HI = `
YESMIN AI (येस्मीन एआई) एक अगली पीढ़ी का एंड्रॉइड वर्चुअल असिस्टेंट (Android AI Assistant) है जो एडवांस जेमिनी एआई (Gemini AI), रियल-टाइम वॉयस इंटेलिजेंस, एनिमेटेड होलोग्राफिक 3D/2D अवतार और डीप एंड्रॉइड सिस्टम हार्डवेयर इंटीग्रेशन को एक साथ लाता है।

प्रमुख घटक:
1. एनिमेटेड एआई अवतार (Animated AI Avatar):
   - जेटपैक कंपोज़ (Jetpack Compose Canvas & Shaders / Lottie) द्वारा संचालित गतिशील, अभिव्यंजक अवतार।
   - यूजर की आवाज और जेमिनी के उत्तर के साथ रियल-टाइम लिप-सिंक (Lip Sync) और ऑडियो स्पेक्ट्रम तरंगें।
   - विभिन्न मानवीय भाव: Idle (शांत), Listening (सुनना), Thinking (विचारमग्न), Speaking (बोलना), Success (कार्य पूर्ण), और Alert (चेतावनी)।

2. वॉयस असिस्टेंट (Voice Assistant):
   - वेक-वर्ड डिटेक्शन ("Hey Yesmin" / "सुनो येस्मीन") बिना बैटरी खपत के पोरक्यूपाइन (Porcupine) इंजन द्वारा।
   - द्विभाषी रियल-टाइम वाक् पहचान (Hindi + English STT) और प्राकृतिक भारतीय लहजे में टेक्स्ट-टू-स्पीच (TTS)।
   - बैकग्राउंड फोरग्राउंड सर्विस (Foreground Service) के रूप में 24/7 सक्रिय सहायता।

3. जेमिनी एआई एकीकरण (Gemini AI Integration):
   - Google के सबसे आधुनिक मॉडल (Gemini 3.8 Flash) का उपयोग।
   - फंक्शन कॉलिंग (Function Calling / Tool Calling): आवाज से दिए गए आदेश को समझकर उपयुक्त एंड्रॉइड सिस्टम एपीआई को कॉल करना।
   - मल्टीमॉडल संदर्भ: ऑन-स्क्रीन सामग्री को समझना और स्मार्ट उत्तर देना।

4. एंड्रॉइड डिवाइस कंट्रोल (Android Device Control):
   - फ्लैशलाइट (Torch), वाई-फाई, ब्लूटूथ, वॉल्यूम और स्क्रीन ब्राइटनेस का ऑटोमेशन।
   - एक्सेसिबिलिटी सर्विस (Accessibility Service) के माध्यम से बिना रूट किए स्क्रीन पर टैप, स्क्रॉल और ऐप्स में कार्य पूरा करना।
   - डिवाइस पॉलिसी मैनेजर (DevicePolicyManager) से स्क्रीन लॉक और सुरक्षा नियंत्रण।
   - नोटिफिकेशन रीडर और बैटरी हेल्थ एनालाइजर।
`;

export const APP_DESCRIPTION_EN = `
YESMIN AI is a next-generation Android Virtual Companion and Assistant app combining Google Gemini AI, real-time voice processing, an expressive animated holographic avatar, and deep Android OS hardware control.

Key Features:
1. Animated AI Avatar:
   - Built using Jetpack Compose Canvas, custom shaders, and particle physics.
   - Real-time audio reactive waveform lip-sync and emotive states (Idle, Listening, Thinking, Speaking, Success, Alert).
   - Floating system overlay mode (TYPE_APPLICATION_OVERLAY) for assistance over any running app.

2. Voice Assistant Pipeline:
   - Low-power wake-word detection ("Hey Yesmin") powered by Picovoice Porcupine.
   - Continuous on-device & cloud speech recognition (Hindi + English bilingual support).
   - Low-latency natural neural Text-To-Speech (TTS).

3. Gemini AI Integration:
   - Server & on-device Gemini 3.8 Flash integration with Function Calling.
   - Converts natural Hindi/English commands into structured device control tool calls.
   - Multimodal contextual understanding of active screen contents.

4. Native Android Device Controls:
   - Direct hardware manipulation: CameraManager (Torch/Flashlight), AudioManager (Volume), Settings.System (Brightness), WifiManager, BluetoothAdapter.
   - Custom AccessibilityService for zero-root UI automation, automated typing, clicking, and app orchestration.
   - DevicePolicyManager integration for secure one-tap or voice-triggered screen locking.
`;

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'presentation',
    titleHi: '१. प्रेजेंटेशन लेयर (Presentation Layer - UI & Avatar)',
    titleEn: '1. Presentation Layer (Jetpack Compose UI & Avatar)',
    descriptionHi: 'यूजर इंटरफेस, एनिमेटेड होलोग्राफिक अवतार कैनवास, वॉयस एचयूडी, और फ्लोटिंग ओवरले विंडो।',
    descriptionEn: 'User interface, animated holographic avatar canvas, voice HUD, quick settings tiles, and floating system overlay window.',
    components: [
      {
        name: 'YesminAvatarCanvas',
        roleHi: 'ऑडियो-रिएक्टिव 60 FPS कंपोज़ कैनवास जो आवाज की तीव्रता के अनुसार तरंगें और चेहरे के भाव एनिमेट करता है।',
        roleEn: 'Audio-reactive 60 FPS Compose Canvas rendering particle aura, neon rings, and emotive facial/wave states.',
        tech: 'Jetpack Compose, Canvas API, Animatable',
      },
      {
        name: 'VoiceAssistantOverlay',
        roleHi: 'अन्य सभी ऐप्स के ऊपर फ्लोटिंग बबल या बॉटम शीट के रूप में त्वरित वॉयस कमांड विंडो।',
        roleEn: 'System overlay window (TYPE_APPLICATION_OVERLAY) allowing voice interaction over any active Android app.',
        tech: 'WindowManager, ComposeView',
      },
      {
        name: 'QuickSettingsTiles',
        roleHi: 'एंड्रॉइड क्विक सेटिंग्स मेनू से सीधे येस्मीन असिस्टेंट शुरू करने वाला टाइल।',
        roleEn: 'Android system notification quick toggle tile to trigger Yesmin in one tap.',
        tech: 'TileService, Intent',
      },
    ],
  },
  {
    id: 'domain',
    titleHi: '२. डोमेन लेयर (Domain Layer - Business Logic & Intent)',
    titleEn: '2. Domain Layer (Intent Routing & Use Cases)',
    descriptionHi: 'यूजर के वॉयस इनपुट को पार्स करना, जेमिनी मॉडल के टूल कॉल को मैप करना और सुरक्षा अनुमतियों का प्रबंधन।',
    descriptionEn: 'Translates speech tokens, maps Gemini function calling payloads to native Android hardware use-cases, and handles runtime permission orchestrations.',
    components: [
      {
        name: 'GeminiAgentUseCase',
        roleHi: 'जेमिनी 3.8 फ्लैश एपीआई से संवाद, सिस्टम प्रॉम्प्ट अनुकूलन और टूल कॉलिंग रिस्पॉन्स का निष्पादन।',
        roleEn: 'Orchestrates Gemini 3.8 Flash model execution, system instructions, and tool declaration handlers.',
        tech: 'Kotlin Coroutines, Flow, Gemini GenAI SDK',
      },
      {
        name: 'DeviceActionRouter',
        roleHi: 'जेमिनी द्वारा पहचाने गए फंक्शन को सही एंड्रॉइड मैनेजर (कैमरा, ऑडियो, सेटिंग्स) को अग्रेषित करना।',
        roleEn: 'Decoupled dispatcher routing JSON tool calls to native Android hardware managers.',
        tech: 'Hilt Dependency Injection, Clean UseCases',
      },
      {
        name: 'VoiceWakeWordEngine',
        roleHi: 'लो-पॉवर वेक वर्ड इंजन जो "Hey Yesmin" शब्द सुनते ही एक्टिवेशन ट्रिगर करता है।',
        roleEn: 'Ultra-low battery background wake word detection stream.',
        tech: 'Porcupine Wake Word, AudioRecord',
      },
    ],
  },
  {
    id: 'data',
    titleHi: '३. डेटा लेयर (Data Layer - Gemini SDK & Local Storage)',
    titleEn: '3. Data Layer (Gemini SDK & Repositories)',
    descriptionHi: 'जेमिनी सर्वर/क्लाउड कम्युनिकेशन, यूजर प्रेफरेंस, हिस्ट्री और ऑफलाइन रूल्स डेटाबेस।',
    descriptionEn: 'Manages Gemini API REST/WebSocket communication, speech recognition buffers, Room DB for conversation history, and DataStore preferences.',
    components: [
      {
        name: 'GeminiRepository',
        roleHi: 'Gemini 3.8 Flash SDK के साथ नेटवर्क कॉल, फंक्शन डेफिनिशन्स और एरर हैंडलिंग संभालता है।',
        roleEn: 'High-level repository for Gemini AI interactions with structured tool declarations.',
        tech: '@google/genai SDK / Retrofit OkHttp',
      },
      {
        name: 'DeviceSettingsRepository',
        roleHi: 'डिवाइस के वर्तमान हार्डवेयर स्टेट (वॉल्यूम, ब्राइटनेस, बैटरी, वाईफाई) को रियल-टाइम ऑब्जर्व करना।',
        roleEn: 'Reactive state repository observing Android BatteryManager, ContentObservers for volume & settings.',
        tech: 'StateFlow, BroadcastReceiver, ContentObserver',
      },
      {
        name: 'ConversationDatabase',
        roleHi: 'उपयोगकर्ता के पिछले संवाद और कस्टम वॉयस शॉर्टकट्स का एन्क्रिप्टेड लोकल स्टोरेज।',
        roleEn: 'Local encrypted database storing chat history, context memories, and custom quick routines.',
        tech: 'Room DB, SQLCipher, DataStore',
      },
    ],
  },
  {
    id: 'hardware',
    titleHi: '४. एंड्रॉइड सिस्टम इंटीग्रेशन लेयर (Android OS Integration & HAL)',
    titleEn: '4. Android System Integration Layer (Hardware & OS APIs)',
    descriptionHi: 'वास्तविक एंड्रॉइड हार्डवेयर नियंत्रण, सिस्टम सर्विसेज, एक्सेसिबिलिटी ऑटोमेशन और डिवाइस एडमिनिस्ट्रेशन।',
    descriptionEn: 'Direct integration with Android framework system services, hardware drivers, accessibility automation, and device policy manager.',
    components: [
      {
        name: 'DeviceControlManager',
        roleHi: 'कैमरा टॉर्च, वाई-फाई, ब्लूटूथ, ब्राइटनेस और वॉल्यूम को सीधे एंड्रॉइड फ्रेमवर्क एपीआई से नियंत्रित करता है।',
        roleEn: 'Native hardware controller leveraging CameraManager, AudioManager, WifiManager, and Settings.System.',
        tech: 'Android Framework APIs, Manifest Permissions',
      },
      {
        name: 'YesminAccessibilityService',
        roleHi: 'यूजर के लिए स्क्रीन पर बटन दबाना, टेक्स्ट टाइप करना और स्क्रीन सामग्री पढ़कर ऑटोमेशन करना।',
        roleEn: 'Accessibility engine capable of inspecting UI nodes, performing clicks, and scrolling without root.',
        tech: 'AccessibilityService, AccessibilityNodeInfo',
      },
      {
        name: 'YesminDeviceAdminReceiver',
        roleHi: 'वॉयस कमांड पर फोन स्क्रीन को सुरक्षित रूप से तुरंत लॉक करना।',
        roleEn: 'Device administration component granting lockNow() privileges.',
        tech: 'DevicePolicyManager, DeviceAdminReceiver',
      },
      {
        name: 'ForegroundVoiceService',
        roleHi: 'स्क्रीन बंद होने पर भी बैकग्राउंड में वॉयस लिसनिंग को ज़िंदा रखने वाला फॉरग्राउंड सर्विस।',
        roleEn: 'Sticky Foreground Service maintaining audio capture lifecycle with persistent notification.',
        tech: 'Service, NotificationCompat, Wakelock',
      },
    ],
  },
];

export const CODE_FILES: CodeFile[] = [
  {
    path: 'app/src/main/java/com/yesmin/ai/ui/avatar/YesminAvatarView.kt',
    name: 'YesminAvatarView.kt',
    category: 'ui',
    language: 'kotlin',
    summaryHi: 'जेटपैक कंपोज़ में एआई अवतार: स्पीच स्पेक्ट्रम तरंगें, नियॉन पार्टिकल ऑरा, और विभिन्न मानवीय मूड्स (Idle, Listening, Thinking, Speaking)।',
    summaryEn: 'Jetpack Compose animated AI Avatar with real-time waveform audio reactivity, particle aura, and emotive facial shaders.',
    code: `package com.yesmin.ai.ui.avatar

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.drawscope.rotate
import androidx.compose.ui.unit.dp
import kotlin.math.*

enum class AvatarState {
    IDLE,
    LISTENING,
    THINKING,
    SPEAKING,
    SUCCESS,
    ALERT
}

/**
 * YESMIN AI - Interactive Animated Holographic Avatar
 * Rendered at 60 FPS with Jetpack Compose Canvas.
 * Reacts to audio level and assistant state.
 */
@Composable
fun YesminAvatar(
    state: AvatarState,
    audioLevel: Float, // Normalized 0.0f to 1.0f
    modifier: Modifier = Modifier
) {
    val infiniteTransition = rememberInfiniteTransition(label = "YesminAvatarLoops")

    // Smooth breathing & rotation animations
    val rotation by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            animation = tween(durationMillis = 12000, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "OrbRotation"
    )

    val pulseScale by infiniteTransition.animateFloat(
        initialValue = 0.95f,
        targetValue = 1.05f,
        animationSpec = infiniteRepeatable(
            animation = tween(1800, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "PulseScale"
    )

    // State-based dynamic colors
    val primaryColor = when (state) {
        AvatarState.IDLE -> Color(0xFF00E5FF)       // Cyan neon
        AvatarState.LISTENING -> Color(0xFF00E676)  // Bright Emerald Green
        AvatarState.THINKING -> Color(0xFF7C4DFF)   // Deep Cyber Violet
        AvatarState.SPEAKING -> Color(0xFFFF4081)   // Vibrant Pink / Magenta
        AvatarState.SUCCESS -> Color(0xFF00F5D4)    // Turquoise Success
        AvatarState.ALERT -> Color(0xFFFF5252)      // Coral Red Alert
    }

    val secondaryColor = when (state) {
        AvatarState.IDLE -> Color(0xFF2979FF)
        AvatarState.LISTENING -> Color(0xFF1DE9B6)
        AvatarState.THINKING -> Color(0xFF651FFF)
        AvatarState.SPEAKING -> Color(0xFFFF9100)
        AvatarState.SUCCESS -> Color(0xFF76FF03)
        AvatarState.ALERT -> Color(0xFFFF1744)
    }

    Box(
        modifier = modifier.size(240.dp),
        contentAlignment = Alignment.Center
    ) {
        Canvas(modifier = Modifier.fillMaxSize()) {
            val center = Offset(size.width / 2f, size.height / 2f)
            val baseRadius = (size.minDimension / 2f) * 0.65f * pulseScale
            val dynamicRadius = baseRadius + (audioLevel * 24.dp.toPx())

            // 1. Ambient Glow Field
            drawCircle(
                brush = Brush.radialGradient(
                    colors = listOf(primaryColor.copy(alpha = 0.35f), Color.Transparent),
                    center = center,
                    radius = baseRadius * 1.6f
                ),
                radius = baseRadius * 1.6f,
                center = center
            )

            // 2. Rotating Holographic Outer Arc Rings
            rotate(degrees = rotation, pivot = center) {
                drawArc(
                    brush = Brush.sweepGradient(
                        colors = listOf(primaryColor, secondaryColor, Color.Transparent, primaryColor)
                    ),
                    startAngle = 0f,
                    sweepAngle = 270f,
                    useCenter = false,
                    style = Stroke(width = 3.dp.toPx(), cap = StrokeCap.Round),
                    size = androidx.compose.ui.geometry.Size(dynamicRadius * 2, dynamicRadius * 2),
                    topLeft = Offset(center.x - dynamicRadius, center.y - dynamicRadius)
                )
            }

            // 3. Counter-Rotating Inner Tech Accents
            rotate(degrees = -rotation * 1.5f, pivot = center) {
                val innerSize = dynamicRadius * 1.4f
                drawArc(
                    color = secondaryColor.copy(alpha = 0.7f),
                    startAngle = 45f,
                    sweepAngle = 180f,
                    useCenter = false,
                    style = Stroke(width = 2.dp.toPx(), cap = StrokeCap.Round),
                    size = androidx.compose.ui.geometry.Size(innerSize, innerSize),
                    topLeft = Offset(center.x - innerSize / 2f, center.y - innerSize / 2f)
                )
            }

            // 4. Central Energy Core
            drawCircle(
                brush = Brush.radialGradient(
                    colors = listOf(
                        Color.White.copy(alpha = 0.95f),
                        primaryColor.copy(alpha = 0.85f),
                        secondaryColor.copy(alpha = 0.4f)
                    ),
                    center = center,
                    radius = baseRadius * 0.7f
                ),
                radius = baseRadius * 0.7f,
                center = center
            )

            // 5. Soundwave Frequency Bars (When Speaking or Listening)
            if (state == AvatarState.SPEAKING || state == AvatarState.LISTENING) {
                val barCount = 18
                val angleStep = (2 * PI / barCount)
                for (i in 0 until barCount) {
                    val angle = i * angleStep
                    val barHeight = (12.dp.toPx() + (sin(i.toDouble() * 1.3 + rotation) * 16.dp.toPx() * audioLevel)).toFloat()
                    val start = Offset(
                        x = center.x + (cos(angle) * (baseRadius + 8.dp.toPx())).toFloat(),
                        y = center.y + (sin(angle) * (baseRadius + 8.dp.toPx())).toFloat()
                    )
                    val end = Offset(
                        x = center.x + (cos(angle) * (baseRadius + 8.dp.toPx() + barHeight)).toFloat(),
                        y = center.y + (sin(angle) * (baseRadius + 8.dp.toPx() + barHeight)).toFloat()
                    )
                    drawLine(
                        color = primaryColor,
                        start = start,
                        end = end,
                        strokeWidth = 3.dp.toPx(),
                        cap = StrokeCap.Round
                    )
                }
            }

            // 6. Holographic Stylized Cyber Eyes
            val eyeSpacing = 22.dp.toPx()
            val eyeY = center.y - 4.dp.toPx()
            val eyeHeight = if (state == AvatarState.THINKING) 3.dp.toPx() else 8.dp.toPx() + (audioLevel * 6.dp.toPx())
            
            // Left Eye
            drawRoundRect(
                color = Color.White,
                topLeft = Offset(center.x - eyeSpacing - 6.dp.toPx(), eyeY - eyeHeight / 2),
                size = androidx.compose.ui.geometry.Size(12.dp.toPx(), eyeHeight),
                cornerRadius = androidx.compose.ui.geometry.CornerRadius(6.dp.toPx())
            )
            // Right Eye
            drawRoundRect(
                color = Color.White,
                topLeft = Offset(center.x + eyeSpacing - 6.dp.toPx(), eyeY - eyeHeight / 2),
                size = androidx.compose.ui.geometry.Size(12.dp.toPx(), eyeHeight),
                cornerRadius = androidx.compose.ui.geometry.CornerRadius(6.dp.toPx())
            )
        }
    }
}
`,
  },
  {
    path: 'app/src/main/java/com/yesmin/ai/domain/gemini/GeminiAgentService.kt',
    name: 'GeminiAgentService.kt',
    category: 'domain',
    language: 'kotlin',
    summaryHi: 'जेमिनी 3.8 फ्लैश इंटीग्रेशन: फंक्शन कॉलिंग टूल्स (टॉर्च, वाईफाई, ब्लूटूथ, वॉल्यूम, ब्राइटनेस) और द्विभाषी सिस्टम प्रॉम्प्ट।',
    summaryEn: 'Google Gemini 3.8 Flash model orchestrator with native Function Calling tool declarations for Android OS hardware.',
    code: `package com.yesmin.ai.domain.gemini

import com.google.genai.Client
import com.google.genai.types.*
import com.yesmin.ai.domain.hardware.DeviceControlManager
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.withContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class GeminiAgentService @Inject constructor(
    private val deviceControlManager: DeviceControlManager
) {
    // Shared Gemini Client initialized with API key
    private val aiClient: Client by lazy {
        Client.builder()
            .apiKey(System.getenv("GEMINI_API_KEY") ?: "")
            .build()
    }

    private val _isProcessing = MutableStateFlow(false)
    val isProcessing = _isProcessing.asStateFlow()

    // Declare Android Device Control tools for Gemini
    private val androidDeviceTools = listOf(
        Tool.builder()
            .functionDeclarations(listOf(
                FunctionDeclaration.builder()
                    .name("toggle_flashlight")
                    .description("Turn Android device flashlight/torch ON or OFF")
                    .parameters(
                        Schema.builder()
                            .type(Type.OBJECT)
                            .properties(mapOf("state" to Schema.builder().type(Type.BOOLEAN).build()))
                            .required(listOf("state"))
                            .build()
                    ).build(),
                FunctionDeclaration.builder()
                    .name("set_volume")
                    .description("Set Android media/ring volume level from 0 to 100")
                    .parameters(
                        Schema.builder()
                            .type(Type.OBJECT)
                            .properties(mapOf("level" to Schema.builder().type(Type.INTEGER).build()))
                            .required(listOf("level"))
                            .build()
                    ).build(),
                FunctionDeclaration.builder()
                    .name("set_brightness")
                    .description("Adjust screen brightness level from 0 to 100")
                    .parameters(
                        Schema.builder()
                            .type(Type.OBJECT)
                            .properties(mapOf("level" to Schema.builder().type(Type.INTEGER).build()))
                            .required(listOf("level"))
                            .build()
                    ).build(),
                FunctionDeclaration.builder()
                    .name("toggle_wifi")
                    .description("Enable or disable Android Wi-Fi network connection")
                    .parameters(
                        Schema.builder()
                            .type(Type.OBJECT)
                            .properties(mapOf("state" to Schema.builder().type(Type.BOOLEAN).build()))
                            .required(listOf("state"))
                            .build()
                    ).build(),
                FunctionDeclaration.builder()
                    .name("toggle_bluetooth")
                    .description("Enable or disable Bluetooth adapter")
                    .parameters(
                        Schema.builder()
                            .type(Type.OBJECT)
                            .properties(mapOf("state" to Schema.builder().type(Type.BOOLEAN).build()))
                            .required(listOf("state"))
                            .build()
                    ).build(),
                FunctionDeclaration.builder()
                    .name("open_app")
                    .description("Launch installed Android application (e.g., WhatsApp, Camera, YouTube, Settings)")
                    .parameters(
                        Schema.builder()
                            .type(Type.OBJECT)
                            .properties(mapOf("appName" to Schema.builder().type(Type.STRING).build()))
                            .required(listOf("appName"))
                            .build()
                    ).build(),
                FunctionDeclaration.builder()
                    .name("lock_device")
                    .description("Immediately lock the Android screen via DevicePolicyManager")
                    .parameters(Schema.builder().type(Type.OBJECT).build())
                    .build()
            )).build()
    )

    private val systemInstruction = """
        You are YESMIN AI (येस्मीन एआई), a polite, futuristic, and helpful Android OS AI Assistant.
        You understand both Hindi (हिन्दी) and English fluently.
        Whenever the user asks you to control device settings (flashlight, volume, brightness, wifi, bluetooth, app launcher, screen lock),
        ALWAYS execute the corresponding function tool and reply with a crisp, polite natural voice confirmation.
    """.trimIndent()

    /**
     * Process user query using Gemini 3.8 Flash model
     */
    suspend fun processUserPrompt(prompt: String): GeminiResponse = withContext(Dispatchers.IO) {
        _isProcessing.value = true
        try {
            val response = aiClient.models.generateContent(
                model = "gemini-3.8-flash",
                contents = listOf(Content.fromText(prompt)),
                config = GenerateContentConfig.builder()
                    .systemInstruction(Content.fromText(systemInstruction))
                    .tools(androidDeviceTools)
                    .temperature(0.7f)
                    .build()
            )

            // Inspect for Function Calls (Device Control actions)
            val toolCalls = response.functionCalls
            var actionResultText: String? = null

            if (!toolCalls.isNullOrEmpty()) {
                for (call in toolCalls) {
                    actionResultText = executeDeviceAction(call.name, call.args)
                }
            }

            val spokenAnswer = response.text ?: actionResultText ?: "आदेश निष्पादित किया गया।"
            GeminiResponse.Success(spokenText = spokenAnswer, executedAction = actionResultText)
        } catch (e: Exception) {
            GeminiResponse.Error(e.localizedMessage ?: "Gemini execution failed")
        } finally {
            _isProcessing.value = false
        }
    }

    private suspend fun executeDeviceAction(functionName: String, args: Map<String, Any?>): String {
        return when (functionName) {
            "toggle_flashlight" -> {
                val state = args["state"] as? Boolean ?: true
                deviceControlManager.setFlashlight(state)
                if (state) "फ्लैशलाइट चालू कर दी गई है।" else "फ्लैशलाइट बंद कर दी गई है।"
            }
            "set_volume" -> {
                val level = (args["level"] as? Number)?.toInt() ?: 70
                deviceControlManager.setVolume(level)
                "वॉल्यूम $level% पर सेट किया गया।"
            }
            "set_brightness" -> {
                val level = (args["level"] as? Number)?.toInt() ?: 75
                deviceControlManager.setBrightness(level)
                "ब्राइटनेस $level% पर सेट की गई।"
            }
            "toggle_wifi" -> {
                val state = args["state"] as? Boolean ?: true
                deviceControlManager.setWifi(state)
                if (state) "वाई-फाई चालू किया गया।" else "वाई-फाई बंद किया गया।"
            }
            "toggle_bluetooth" -> {
                val state = args["state"] as? Boolean ?: true
                deviceControlManager.setBluetooth(state)
                if (state) "ब्लूटूथ चालू किया गया।" else "ब्लूटूथ बंद किया गया।"
            }
            "open_app" -> {
                val appName = args["appName"] as? String ?: "Settings"
                deviceControlManager.launchApp(appName)
                "$appName ऐप खोला जा रहा है।"
            }
            "lock_device" -> {
                deviceControlManager.lockScreen()
                "डिवाइस लॉक कर दी गई है।"
            }
            else -> "कमांड पूर्ण हुई।"
        }
    }
}

sealed class GeminiResponse {
    data class Success(val spokenText: String, val executedAction: String?) : GeminiResponse()
    data class Error(val message: String) : GeminiResponse()
}
`,
  },
  {
    path: 'app/src/main/java/com/yesmin/ai/hardware/DeviceControlManager.kt',
    name: 'DeviceControlManager.kt',
    category: 'hardware',
    language: 'kotlin',
    summaryHi: 'एंड्रॉइड हार्डवेयर कंट्रोलर: CameraManager (फ्लैशलाइट), AudioManager (वॉल्यूम), Settings.System (ब्राइटनेस), Wifi/Bluetooth और DevicePolicyManager (लॉक)।',
    summaryEn: 'Comprehensive Android OS hardware abstraction layer controlling Camera torch, Audio, Screen brightness, Wi-Fi, Bluetooth, and Screen lock.',
    code: `package com.yesmin.ai.hardware

import android.app.admin.DevicePolicyManager
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.hardware.camera2.CameraAccessException
import android.hardware.camera2.CameraCharacteristics
import android.hardware.camera2.CameraManager
import android.media.AudioManager
import android.net.wifi.WifiManager
import android.os.BatteryManager
import android.os.Build
import android.provider.Settings
import dagger.hilt.android.qualifiers.ApplicationContext
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class DeviceControlManager @Inject constructor(
    @ApplicationContext private val context: Context
) {
    private val cameraManager by lazy { context.getSystemService(Context.CAMERA_SERVICE) as CameraManager }
    private val audioManager by lazy { context.getSystemService(Context.AUDIO_SERVICE) as AudioManager }
    private val wifiManager by lazy { context.applicationContext.getSystemService(Context.WIFI_SERVICE) as WifiManager }
    private val bluetoothManager by lazy { context.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager }
    private val devicePolicyManager by lazy { context.getSystemService(Context.DEVICE_POLICY_SERVICE) as DevicePolicyManager }

    /**
     * 1. Toggle Camera Flashlight (Torch)
     */
    fun setFlashlight(enabled: Boolean): Boolean {
        return try {
            val cameraId = cameraManager.cameraIdList.firstOrNull { id ->
                cameraManager.getCameraCharacteristics(id)
                    .get(CameraCharacteristics.FLASH_INFO_AVAILABLE) == true
            } ?: return false

            cameraManager.setTorchMode(cameraId, enabled)
            true
        } catch (e: CameraAccessException) {
            e.printStackTrace()
            false
        }
    }

    /**
     * 2. Set Media & Ring Volume (0 - 100%)
     */
    fun setVolume(percentage: Int) {
        val maxVolume = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
        val targetVolume = (maxVolume * (percentage.coerceIn(0, 100) / 100f)).toInt()
        audioManager.setStreamVolume(
            AudioManager.STREAM_MUSIC,
            targetVolume,
            AudioManager.FLAG_SHOW_UI
        )
    }

    /**
     * 3. Set Screen Brightness (0 - 100%)
     * Requires android.permission.WRITE_SETTINGS
     */
    fun setBrightness(percentage: Int) {
        if (Settings.System.canWrite(context)) {
            val value = (255 * (percentage.coerceIn(0, 100) / 100f)).toInt()
            Settings.System.putInt(
                context.contentResolver,
                Settings.System.SCREEN_BRIGHTNESS,
                value
            )
        } else {
            // Prompt user for WRITE_SETTINGS permission intent
            val intent = Intent(Settings.ACTION_MANAGE_WRITE_SETTINGS).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            context.startActivity(intent)
        }
    }

    /**
     * 4. Toggle Wi-Fi Network
     */
    @Suppress("DEPRECATION")
    fun setWifi(enabled: Boolean) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            // On Android 10+, invoke system Settings Panel
            val panelIntent = Intent(Settings.Panel.ACTION_WIFI).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            context.startActivity(panelIntent)
        } else {
            wifiManager.isWifiEnabled = enabled
        }
    }

    /**
     * 5. Toggle Bluetooth Adapter
     */
    fun setBluetooth(enabled: Boolean) {
        val adapter = bluetoothManager.adapter ?: return
        if (enabled && !adapter.isEnabled) {
            val intent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            context.startActivity(intent)
        } else if (!enabled && adapter.isEnabled) {
            // Android 13+ restricts direct disable, opens Bluetooth settings panel
            val intent = Intent(Settings.ACTION_BLUETOOTH_SETTINGS).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            context.startActivity(intent)
        }
    }

    /**
     * 6. Launch Application by Name or Package
     */
    fun launchApp(appName: String): Boolean {
        val packageManager = context.packageManager
        val targetPackage = when (appName.lowercase()) {
            "whatsapp" -> "com.whatsapp"
            "camera" -> "com.android.camera"
            "youtube" -> "com.google.android.youtube"
            "settings" -> "com.android.settings"
            "maps" -> "com.google.android.apps.maps"
            else -> null
        }

        val launchIntent = if (targetPackage != null) {
            packageManager.getLaunchIntentForPackage(targetPackage)
        } else {
            // Search installed applications matching name
            packageManager.getInstalledApplications(0).firstOrNull { appInfo ->
                packageManager.getApplicationLabel(appInfo).toString().equals(appName, ignoreCase = true)
            }?.let { packageManager.getLaunchIntentForPackage(it.packageName) }
        }

        return if (launchIntent != null) {
            launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            context.startActivity(launchIntent)
            true
        } else false
    }

    /**
     * 7. Lock Screen via DevicePolicyManager
     */
    fun lockScreen(): Boolean {
        val componentName = ComponentName(context, YesminDeviceAdminReceiver::class.java)
        return if (devicePolicyManager.isAdminActive(componentName)) {
            devicePolicyManager.lockNow()
            true
        } else {
            // Request Device Admin privilege
            val intent = Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN).apply {
                putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, componentName)
                putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION, "YESMIN AI needs device admin to lock the screen via voice.")
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            context.startActivity(intent)
            false
        }
    }

    /**
     * 8. Query Battery Level and Status
     */
    fun getBatteryLevel(): Int {
        val batteryManager = context.getSystemService(Context.BATTERY_SERVICE) as BatteryManager
        return batteryManager.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY)
    }
}
`,
  },
  {
    path: 'app/src/main/java/com/yesmin/ai/service/YesminAccessibilityService.kt',
    name: 'YesminAccessibilityService.kt',
    category: 'service',
    language: 'kotlin',
    summaryHi: 'एंड्रॉइड एक्सेसिबिलिटी सर्विस: बिना रूट स्क्रीन पर क्लिक, स्क्रॉल, ऑटो-टाइपिंग और एक्टिव यूआई नोड्स को पढ़ना।',
    summaryEn: 'Zero-root Android Accessibility Service automating UI interactions, clicking nodes, automated typing, and screen inspection.',
    code: `package com.yesmin.ai.service

import android.accessibilityservice.AccessibilityService
import android.accessibilityservice.GestureDescription
import android.graphics.Path
import android.os.Bundle
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityNodeInfo
import com.yesmin.ai.domain.events.AccessibilityEventBus
import dagger.hilt.android.AndroidEntryPoint
import javax.inject.Inject

/**
 * YESMIN AI - Advanced Android Accessibility Automation Service
 * Grants the ability to:
 * 1. Read on-screen UI context for Gemini Multimodal reasoning
 * 2. Click buttons, menus, and submit forms on behalf of the user
 * 3. Type text into input fields automatically
 * 4. Execute complex touch gestures (swipes, long-press)
 */
@AndroidEntryPoint
class YesminAccessibilityService : AccessibilityService() {

    @Inject
    lateinit var eventBus: AccessibilityEventBus

    companion object {
        var instance: YesminAccessibilityService? = null
            private set
    }

    override fun onServiceConnected() {
        super.onServiceConnected()
        instance = this
    }

    override fun onAccessibilityEvent(event: AccessibilityEvent?) {
        event ?: return
        // Forward active screen package & window changes to event bus
        if (event.eventType == AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) {
            val packageName = event.packageName?.toString() ?: ""
            eventBus.postCurrentPackage(packageName)
        }
    }

    override fun onInterrupt() {
        // Handle accessibility interruption
    }

    override fun onDestroy() {
        super.onDestroy()
        instance = null
    }

    /**
     * Find and click a UI node matching text or ID
     */
    fun clickNodeByText(text: String): Boolean {
        val rootNode = rootInActiveWindow ?: return false
        val matchingNodes = rootNode.findAccessibilityNodeInfosByText(text)
        for (node in matchingNodes) {
            if (node.isClickable) {
                return node.performAction(AccessibilityNodeInfo.ACTION_CLICK)
            }
            // Bubble up to clickable parent
            var parent = node.parent
            while (parent != null) {
                if (parent.isClickable) {
                    return parent.performAction(AccessibilityNodeInfo.ACTION_CLICK)
                }
                parent = parent.parent
            }
        }
        return false
    }

    /**
     * Type text into an active editable node
     */
    fun typeTextIntoFocusedNode(text: String): Boolean {
        val rootNode = rootInActiveWindow ?: return false
        val focusedNode = rootNode.findFocus(AccessibilityNodeInfo.FOCUS_INPUT) ?: return false
        val arguments = Bundle().apply {
            putCharSequence(AccessibilityNodeInfo.ACTION_ARGUMENT_SET_TEXT_CHARSEQUENCE, text)
        }
        return focusedNode.performAction(AccessibilityNodeInfo.ACTION_SET_TEXT, arguments)
    }

    /**
     * Perform touch tap gesture at coordinates (X, Y)
     */
    fun tapAtCoordinates(x: Float, y: Float, callback: ((Boolean) -> Unit)? = null) {
        val path = Path().apply { moveTo(x, y) }
        val stroke = GestureDescription.StrokeDescription(path, 0, 50)
        val gesture = GestureDescription.Builder().addStroke(stroke).build()

        dispatchGesture(gesture, object : GestureResultCallback() {
            override fun onCompleted(gestureDescription: GestureDescription?) {
                callback?.invoke(true)
            }
            override fun onCancelled(gestureDescription: GestureDescription?) {
                callback?.invoke(false)
            }
        }, null)
    }
}
`,
  },
  {
    path: 'app/src/main/java/com/yesmin/ai/service/VoiceAssistantService.kt',
    name: 'VoiceAssistantService.kt',
    category: 'service',
    language: 'kotlin',
    summaryHi: 'फॉरग्राउंड वॉयस सर्विस: 24/7 वेक-वर्ड लिसनिंग ("Hey Yesmin"), रियल-टाइम स्पीच रिकग्निशन और टेक्स्ट-टू-स्पीच (TTS)।',
    summaryEn: 'Persistent Android Foreground Service handling low-power wake-word detection, SpeechRecognizer, and multilingual TTS.',
    code: `package com.yesmin.ai.service

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import android.speech.RecognitionListener
import android.speech.RecognizerIntent
import android.speech.SpeechRecognizer
import android.speech.tts.TextToSpeech
import androidx.core.app.NotificationCompat
import com.yesmin.ai.R
import com.yesmin.ai.domain.gemini.GeminiAgentService
import com.yesmin.ai.domain.gemini.GeminiResponse
import dagger.hilt.android.AndroidEntryPoint
import kotlinx.coroutines.*
import java.util.*
import javax.inject.Inject

@AndroidEntryPoint
class VoiceAssistantService : Service(), TextToSpeech.OnInitListener {

    @Inject
    lateinit var geminiAgent: GeminiAgentService

    private val serviceScope = CoroutineScope(Dispatchers.Main + SupervisorJob())
    private var speechRecognizer: SpeechRecognizer? = null
    private var textToSpeech: TextToSpeech? = null
    private var isTtsReady = false

    companion object {
        const val CHANNEL_ID = "yesmin_voice_service"
        const val NOTIFICATION_ID = 1001
        const val ACTION_START_LISTENING = "com.yesmin.ai.ACTION_START_LISTENING"
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        startForeground(NOTIFICATION_ID, buildForegroundNotification())
        initSpeechRecognizer()
        textToSpeech = TextToSpeech(this, this)
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == ACTION_START_LISTENING) {
            startListening()
        }
        return START_STICKY
    }

    private fun initSpeechRecognizer() {
        if (SpeechRecognizer.isRecognitionAvailable(this)) {
            speechRecognizer = SpeechRecognizer.createSpeechRecognizer(this).apply {
                setRecognitionListener(object : RecognitionListener {
                    override fun onResults(results: android.os.Bundle?) {
                        val matches = results?.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION)
                        val spokenText = matches?.firstOrNull() ?: return
                        handleSpokenQuery(spokenText)
                    }
                    override fun onError(error: Int) {
                        // Restart listening on timeout
                        startListening()
                    }
                    override fun onReadyForSpeech(params: android.os.Bundle?) {}
                    override fun onBeginningOfSpeech() {}
                    override fun onRmsChanged(rmsdB: Float) {}
                    override fun onBufferReceived(buffer: ByteArray?) {}
                    override fun onEndOfSpeech() {}
                    override fun onPartialResults(partialResults: android.os.Bundle?) {}
                    override fun onEvent(eventType: Int, params: android.os.Bundle?) {}
                })
            }
        }
    }

    fun startListening() {
        val recognizerIntent = Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH).apply {
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM)
            putExtra(RecognizerIntent.EXTRA_LANGUAGE, "hi-IN") // Supports Hindi & English bilingual
            putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, "hi-IN")
            putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true)
        }
        speechRecognizer?.startListening(recognizerIntent)
    }

    private fun handleSpokenQuery(query: String) {
        serviceScope.launch {
            when (val result = geminiAgent.processUserPrompt(query)) {
                is GeminiResponse.Success -> {
                    speak(result.spokenText)
                }
                is GeminiResponse.Error -> {
                    speak("माफ़ कीजियेगा, कुछ त्रुटि हुई।")
                }
            }
        }
    }

    fun speak(text: String) {
        if (isTtsReady) {
            textToSpeech?.speak(text, TextToSpeech.QUEUE_FLUSH, null, "YesminTTSUtterance")
        }
    }

    override fun onInit(status: Int) {
        if (status == TextToSpeech.SUCCESS) {
            textToSpeech?.language = Locale("hi", "IN")
            isTtsReady = true
        }
    }

    private fun buildForegroundNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("YESMIN AI Active")
            .setContentText("Listening for 'Hey Yesmin' or tap to speak")
            .setSmallIcon(R.drawable.ic_yesmin_logo)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .build()
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "YESMIN AI Voice Service",
                NotificationManager.IMPORTANCE_LOW
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        super.onDestroy()
        speechRecognizer?.destroy()
        textToSpeech?.stop()
        textToSpeech?.shutdown()
        serviceScope.cancel()
    }
}
`,
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    category: 'config',
    language: 'xml',
    summaryHi: 'एंड्रॉइड मेनिफेस्ट: हार्डवेयर अनुमतियां (कैमरा, ऑडियो, ब्लूटूथ, वाईफाई, सिस्टम सेटिंग्स, एक्सेसिबिलिटी सर्विस और डिवाइस एडमिन)।',
    summaryEn: 'Complete AndroidManifest.xml declaring required hardware permissions, foreground services, accessibility service, and device administration.',
    code: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.yesmin.ai">

    <!-- Hardware & Device Control Permissions -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera.flash" android:required="false" />
    
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    
    <!-- Wireless & Connectivity Controls -->
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.BLUETOOTH" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

    <!-- System Settings & Overlay -->
    <uses-permission android:name="android.permission.WRITE_SETTINGS" tools:ignore="ProtectedPermissions" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MICROPHONE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" tools:ignore="QueryAllPackagesPermission" />

    <application
        android:name=".YesminApplication"
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.YesminAI">

        <!-- Main Edge-to-Edge Activity -->
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.YesminAI">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
                <!-- Google Assistant Integration Action -->
                <action android:name="android.intent.action.VOICE_COMMAND" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
        </activity>

        <!-- Voice Assistant Sticky Foreground Service -->
        <service
            android:name=".service.VoiceAssistantService"
            android:foregroundServiceType="microphone"
            android:exported="false" />

        <!-- Zero-Root UI Automation Accessibility Service -->
        <service
            android:name=".service.YesminAccessibilityService"
            android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE"
            android:exported="true">
            <intent-filter>
                <action android:name="android.accessibilityservice.AccessibilityService" />
            </intent-filter>
            <meta-data
                android:name="android.accessibilityservice"
                android:resource="@xml/accessibility_service_config" />
        </service>

        <!-- Device Administration for Instant Screen Lock -->
        <receiver
            android:name=".hardware.YesminDeviceAdminReceiver"
            android:permission="android.permission.BIND_DEVICE_ADMIN"
            android:exported="true">
            <meta-data
                android:name="android.app.device_admin"
                android:resource="@xml/device_admin_policies" />
            <intent-filter>
                <action android:name="android.app.action.DEVICE_ADMIN_ENABLED" />
            </intent-filter>
        </receiver>

        <!-- Quick Settings Status Bar Tile -->
        <service
            android:name=".ui.quicksettings.YesminTileService"
            android:icon="@drawable/ic_yesmin_tile"
            android:label="YESMIN AI"
            android:permission="android.permission.BIND_QUICK_SETTINGS_TILE"
            android:exported="true">
            <intent-filter>
                <action android:name="android.service.quicksettings.action.QS_TILE" />
            </intent-filter>
        </service>

    </application>
</manifest>
`,
  },
  {
    path: 'app/build.gradle.kts',
    name: 'build.gradle.kts (Module: app)',
    category: 'config',
    language: 'groovy',
    summaryHi: 'ग्रैडल कॉन्फ़िगरेशन: Jetpack Compose, Google GenAI SDK, Hilt Dependency Injection, Coroutines और Porcupine Wake Word.',
    summaryEn: 'Modern Android build.gradle.kts declaring dependencies for Jetpack Compose, Google GenAI SDK, Hilt DI, and Coroutines.',
    code: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.hilt.android)
    alias(libs.plugins.ksp)
}

android {
    namespace = "com.yesmin.ai"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.yesmin.ai"
        minSdk = 26
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0-PROD"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildFeatures {
        compose = true
        buildConfig = true
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    // 1. Google Gemini AI TypeScript / Java SDK
    implementation("com.google.genai:google-genai:0.1.0")

    // 2. Jetpack Compose UI
    implementation(platform(libs.androidx.compose.bom))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")

    // 3. Architecture & Dependency Injection
    implementation("com.google.dagger:hilt-android:2.51.1")
    ksp("com.google.dagger:hilt-compiler:2.51.1")
    implementation("androidx.hilt:hilt-navigation-compose:1.2.0")

    // 4. Coroutines & Lifecycle
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.4")
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.4")

    // 5. Wake Word Engine (Picovoice Porcupine)
    implementation("ai.picovoice:porcupine-android:3.0.2")

    // 6. Local Storage & Preferences
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    ksp("androidx.room:room-compiler:2.6.1")
    implementation("androidx.datastore:datastore-preferences:1.1.1")
}
`,
  },
  {
    path: 'app/src/main/java/com/yesmin/ai/MainActivity.kt',
    name: 'MainActivity.kt',
    category: 'ui',
    language: 'kotlin',
    summaryHi: 'मेन एक्टिविटी: एज-टू-एज कंपोज़ यूआई, रनटाइम परमिशन रिक्वेस्ट (कैमरा, ऑडियो, सेटिंग्स) और अवतार-ड्रिवन होम स्क्रीन।',
    summaryEn: 'Edge-to-edge Compose MainActivity managing runtime permissions (Camera, Mic, Settings) and the main voice dashboard.',
    code: `package com.yesmin.ai

import android.Manifest
import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.yesmin.ai.service.VoiceAssistantService
import com.yesmin.ai.ui.avatar.AvatarState
import com.yesmin.ai.ui.avatar.YesminAvatar
import com.yesmin.ai.ui.theme.YesminAITheme
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class MainActivity : ComponentActivity() {

    private val permissionLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        val micGranted = permissions[Manifest.permission.RECORD_AUDIO] ?: false
        val cameraGranted = permissions[Manifest.permission.CAMERA] ?: false
        if (micGranted) {
            startVoiceAssistantService()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        // Request initial permissions
        permissionLauncher.launch(
            arrayOf(
                Manifest.permission.RECORD_AUDIO,
                Manifest.permission.CAMERA,
                Manifest.permission.BLUETOOTH_CONNECT
            )
        )

        setContent {
            YesminAITheme {
                Scaffold(
                    modifier = Modifier.fillMaxSize(),
                    containerColor = Color(0xFF0A0E1A)
                ) { innerPadding ->
                    YesminHomeScreen(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }

    private fun startVoiceAssistantService() {
        val serviceIntent = Intent(this, VoiceAssistantService::class.java).apply {
            action = VoiceAssistantService.ACTION_START_LISTENING
        }
        startService(serviceIntent)
    }
}

@Composable
fun YesminHomeScreen(modifier: Modifier = Modifier) {
    var avatarState by remember { mutableStateOf(AvatarState.IDLE) }
    var audioLevel by remember { mutableStateOf(0.2f) }

    Column(
        modifier = modifier
            .fillMaxSize()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.SpaceBetween
    ) {
        Text(
            text = "YESMIN AI",
            style = MaterialTheme.typography.headlineMedium,
            color = Color.White
        )

        // Holographic Animated Avatar
        YesminAvatar(
            state = avatarState,
            audioLevel = audioLevel,
            modifier = Modifier.size(260.dp)
        )

        Text(
            text = "आदेश देने के लिए 'Hey Yesmin' बोलें या माइक छुएं",
            color = Color.White.copy(alpha = 0.7f),
            style = MaterialTheme.typography.bodyMedium
        )
    }
}
`,
  },
];
