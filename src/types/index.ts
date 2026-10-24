export type Language = 'hi' | 'en';

export type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'action_success' | 'action_alert';

export interface DeviceState {
  flashlight: boolean;
  volume: number; // 0 to 100
  brightness: number; // 0 to 100
  wifi: boolean;
  bluetooth: boolean;
  battery: number; // 0 to 100
  isCharging: boolean;
  batterySaver: boolean;
  isLocked: boolean;
  activeApp: string | null;
  dnd: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  toolCall?: {
    name: string;
    args: Record<string, any>;
  };
  toolResult?: string;
  audioPlaying?: boolean;
}

export interface LogcatEntry {
  id: string;
  timestamp: string;
  tag: string;
  level: 'I' | 'D' | 'W' | 'E' | 'V';
  message: string;
}

export interface ArchitectureLayer {
  id: string;
  titleHi: string;
  titleEn: string;
  descriptionHi: string;
  descriptionEn: string;
  components: {
    name: string;
    roleHi: string;
    roleEn: string;
    tech: string;
  }[];
}

export interface CodeFile {
  path: string;
  name: string;
  category: 'ui' | 'service' | 'domain' | 'hardware' | 'config';
  language: 'kotlin' | 'xml' | 'groovy' | 'json';
  summaryHi: string;
  summaryEn: string;
  code: string;
}
