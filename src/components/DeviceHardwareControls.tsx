import React from 'react';
import {
  Zap,
  Volume2,
  Sun,
  Wifi,
  Bluetooth,
  Battery,
  BatteryCharging,
  ShieldAlert,
  Lock,
  Smartphone,
  ExternalLink,
  Power
} from 'lucide-react';
import { DeviceState, Language } from '../types';

interface DeviceHardwareControlsProps {
  deviceState: DeviceState;
  setDeviceState: React.Dispatch<React.SetStateAction<DeviceState>>;
  language: Language;
  onLogEvent: (tag: string, message: string, level?: 'I' | 'D' | 'W' | 'E') => void;
}

export const DeviceHardwareControls: React.FC<DeviceHardwareControlsProps> = ({
  deviceState,
  setDeviceState,
  language,
  onLogEvent,
}) => {
  const toggleFlashlight = () => {
    const newState = !deviceState.flashlight;
    setDeviceState((prev) => ({ ...prev, flashlight: newState }));
    onLogEvent(
      'CameraManager',
      `setTorchMode(cameraId="0", enabled=${newState}) -> SUCCESS`,
      newState ? 'I' : 'D'
    );
  };

  const toggleWifi = () => {
    const newState = !deviceState.wifi;
    setDeviceState((prev) => ({ ...prev, wifi: newState }));
    onLogEvent('WifiManager', `setWifiEnabled(${newState})`, 'I');
  };

  const toggleBluetooth = () => {
    const newState = !deviceState.bluetooth;
    setDeviceState((prev) => ({ ...prev, bluetooth: newState }));
    onLogEvent('BluetoothAdapter', `Bluetooth adapter state -> ${newState ? 'STATE_ON' : 'STATE_OFF'}`, 'I');
  };

  const toggleBatterySaver = () => {
    const newState = !deviceState.batterySaver;
    setDeviceState((prev) => ({ ...prev, batterySaver: newState }));
    onLogEvent('PowerManager', `PowerSaveMode changed to ${newState}`, 'I');
  };

  const toggleCharging = () => {
    const newState = !deviceState.isCharging;
    setDeviceState((prev) => ({ ...prev, isCharging: newState }));
    onLogEvent('BatteryManager', `ACTION_POWER_${newState ? 'CONNECTED' : 'DISCONNECTED'}`, 'I');
  };

  const triggerLock = () => {
    setDeviceState((prev) => ({ ...prev, isLocked: true }));
    onLogEvent('DevicePolicyManager', 'lockNow() called by YESMIN AI', 'W');
  };

  const launchApp = (appName: string) => {
    setDeviceState((prev) => ({ ...prev, activeApp: appName, isLocked: false }));
    onLogEvent('ActivityManager', `START u0 {act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] pkg=com.${appName.toLowerCase()}}`, 'I');
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              {language === 'hi' ? 'एंड्रॉइड हार्डवेयर कंट्रोल पैनल' : 'Android Hardware Control Panel'}
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              HAL & System Service Simulation (Android 15)
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-emerald-950 text-emerald-400 border border-emerald-500/30">
          ONLINE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        {/* Flashlight Torch Toggle */}
        <button
          onClick={toggleFlashlight}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
            deviceState.flashlight
              ? 'bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/20 text-white'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <Zap className={`w-5 h-5 ${deviceState.flashlight ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${deviceState.flashlight ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-700 text-slate-400'}`}>
              {deviceState.flashlight ? 'ON' : 'OFF'}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold">{language === 'hi' ? 'फ्लैशलाइट (Torch)' : 'Flashlight'}</p>
            <p className="text-[10px] text-slate-400 font-mono">CameraManager</p>
          </div>
        </button>

        {/* Wi-Fi Toggle */}
        <button
          onClick={toggleWifi}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
            deviceState.wifi
              ? 'bg-cyan-500/15 border-cyan-500/50 shadow-lg shadow-cyan-500/20 text-white'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <Wifi className={`w-5 h-5 ${deviceState.wifi ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${deviceState.wifi ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-700 text-slate-400'}`}>
              {deviceState.wifi ? 'CONNECTED' : 'DISCONNECTED'}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold">{language === 'hi' ? 'वाई-फाई (Wi-Fi)' : 'Wi-Fi Network'}</p>
            <p className="text-[10px] text-slate-400 font-mono">WifiManager</p>
          </div>
        </button>

        {/* Bluetooth Toggle */}
        <button
          onClick={toggleBluetooth}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
            deviceState.bluetooth
              ? 'bg-blue-500/15 border-blue-500/50 shadow-lg shadow-blue-500/20 text-white'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <Bluetooth className={`w-5 h-5 ${deviceState.bluetooth ? 'text-blue-400' : 'text-slate-400'}`} />
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${deviceState.bluetooth ? 'bg-blue-400/20 text-blue-300' : 'bg-slate-700 text-slate-400'}`}>
              {deviceState.bluetooth ? 'ACTIVE' : 'OFF'}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold">{language === 'hi' ? 'ब्लूटूथ (Bluetooth)' : 'Bluetooth'}</p>
            <p className="text-[10px] text-slate-400 font-mono">BluetoothManager</p>
          </div>
        </button>

        {/* Battery Saver Mode */}
        <button
          onClick={toggleBatterySaver}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
            deviceState.batterySaver
              ? 'bg-emerald-500/15 border-emerald-500/50 shadow-lg shadow-emerald-500/20 text-white'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <Battery className={`w-5 h-5 ${deviceState.batterySaver ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${deviceState.batterySaver ? 'bg-emerald-400/20 text-emerald-300' : 'bg-slate-700 text-slate-400'}`}>
              {deviceState.batterySaver ? 'ON' : 'OFF'}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold">{language === 'hi' ? 'बैटरी सेवर' : 'Battery Saver'}</p>
            <p className="text-[10px] text-slate-400 font-mono">PowerManager</p>
          </div>
        </button>

        {/* Charging Simulator Toggle */}
        <button
          onClick={toggleCharging}
          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
            deviceState.isCharging
              ? 'bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/20 text-white'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <BatteryCharging className={`w-5 h-5 ${deviceState.isCharging ? 'text-amber-400' : 'text-slate-400'}`} />
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${deviceState.isCharging ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-700 text-slate-400'}`}>
              {deviceState.isCharging ? 'CHARGING' : 'BATTERY'}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold">{language === 'hi' ? 'चार्जर प्लग' : 'Power Plug'}</p>
            <p className="text-[10px] text-slate-400 font-mono">BatteryManager</p>
          </div>
        </button>

        {/* Lock Screen Trigger */}
        <button
          onClick={triggerLock}
          className="p-3 rounded-2xl border border-red-500/30 bg-red-950/20 hover:bg-red-900/30 text-red-200 transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <Lock className="w-5 h-5 text-red-400" />
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-400/20 text-red-300">
              LOCK
            </span>
          </div>
          <div className="mt-3">
            <p className="text-xs font-semibold">{language === 'hi' ? 'स्क्रीन लॉक करें' : 'Lock Screen'}</p>
            <p className="text-[10px] text-slate-400 font-mono">DevicePolicyManager</p>
          </div>
        </button>
      </div>

      {/* Sliders: Volume & Brightness */}
      <div className="space-y-4 pt-2 pb-3 border-t border-slate-800">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-medium">{language === 'hi' ? 'मीडिया वॉल्यूम' : 'Media Volume'}</span>
              <span className="text-[10px] text-slate-500 font-mono">(AudioManager)</span>
            </div>
            <span className="font-mono text-cyan-300 font-semibold">{deviceState.volume}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={deviceState.volume}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setDeviceState((prev) => ({ ...prev, volume: val }));
              onLogEvent('AudioManager', `setStreamVolume(STREAM_MUSIC, ${val}%)`, 'D');
            }}
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">{language === 'hi' ? 'स्क्रीन ब्राइटनेस' : 'Screen Brightness'}</span>
              <span className="text-[10px] text-slate-500 font-mono">(Settings.System)</span>
            </div>
            <span className="font-mono text-amber-300 font-semibold">{deviceState.brightness}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={deviceState.brightness}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setDeviceState((prev) => ({ ...prev, brightness: val }));
              onLogEvent('Settings.System', `putInt(SCREEN_BRIGHTNESS, ${Math.round((val / 100) * 255)})`, 'D');
            }}
            className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>
      </div>

      {/* App Launcher Selector */}
      <div className="pt-3 border-t border-slate-800">
        <p className="text-[11px] font-medium text-slate-400 mb-2">
          {language === 'hi' ? 'ऐप्स लॉन्च करें (PackageManager & Intent)' : 'Simulate App Launch (Intent / PackageManager)'}
        </p>
        <div className="flex gap-2">
          {['WhatsApp', 'Camera', 'Settings'].map((app) => (
            <button
              key={app}
              onClick={() => launchApp(app)}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                deviceState.activeApp === app
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {app}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
