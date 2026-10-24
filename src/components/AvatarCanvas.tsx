import React, { useEffect, useRef } from 'react';
import { AvatarState } from '../types';

interface AvatarCanvasProps {
  state: AvatarState;
  audioLevel?: number; // 0 to 1
  size?: number;
  onClick?: () => void;
}

export const AvatarCanvas: React.FC<AvatarCanvasProps> = ({
  state,
  audioLevel = 0,
  size = 280,
  onClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef(state);
  const audioLevelRef = useRef(audioLevel);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    audioLevelRef.current = audioLevel;
  }, [audioLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    let blinkTimer = 0;
    let isBlinking = false;

    // Particle array for atmospheric energy
    const particles = Array.from({ length: 48 }, () => ({
      angle: Math.random() * Math.PI * 2,
      distance: Math.random() * (size * 0.45) + (size * 0.15),
      speed: (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.7 + 0.3,
    }));

    const render = () => {
      time += 0.03;
      blinkTimer += 0.016;
      if (blinkTimer > 3.5) {
        isBlinking = true;
        if (blinkTimer > 3.65) {
          isBlinking = false;
          blinkTimer = 0;
        }
      }

      ctx.clearRect(0, 0, size, size);

      const currentState = stateRef.current;
      const currentAudio = audioLevelRef.current;
      const cx = size / 2;
      const cy = size / 2;

      // Color palette based on state
      let primaryColor = '#00f0ff'; // Neon Cyan
      let secondaryColor = '#0066ff';
      let glowColor = 'rgba(0, 240, 255, 0.4)';
      let coreColor = '#ffffff';

      if (currentState === 'listening') {
        primaryColor = '#00ff88'; // Emerald neon
        secondaryColor = '#00cc66';
        glowColor = 'rgba(0, 255, 136, 0.5)';
      } else if (currentState === 'thinking') {
        primaryColor = '#9d4edd'; // Purple / Violet
        secondaryColor = '#5a189a';
        glowColor = 'rgba(157, 78, 221, 0.5)';
      } else if (currentState === 'speaking') {
        primaryColor = '#ff007f'; // Magenta
        secondaryColor = '#ffaa00';
        glowColor = 'rgba(255, 0, 127, 0.5)';
      } else if (currentState === 'action_success') {
        primaryColor = '#00f5d4'; // Turquoise
        secondaryColor = '#70e000';
        glowColor = 'rgba(0, 245, 212, 0.6)';
      } else if (currentState === 'action_alert') {
        primaryColor = '#ff3366';
        secondaryColor = '#ff0000';
        glowColor = 'rgba(255, 51, 102, 0.6)';
      }

      const pulse = Math.sin(time * 2) * 0.06 + 1;
      const audioPulse = currentAudio * 0.35;
      const dynamicScale = pulse + audioPulse;
      const baseRadius = (size * 0.28) * dynamicScale;

      // 1. Ambient Outer Glow Halo
      const ambientGlow = ctx.createRadialGradient(cx, cy, baseRadius * 0.5, cx, cy, baseRadius * 1.8);
      ambientGlow.addColorStop(0, glowColor);
      ambientGlow.addColorStop(0.5, 'rgba(0,0,0,0.1)');
      ambientGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // 2. Floating Orbit Particles
      particles.forEach((p) => {
        p.angle += p.speed * (currentState === 'thinking' ? 2.5 : 1);
        const px = cx + Math.cos(p.angle) * p.distance;
        const py = cy + Math.sin(p.angle) * p.distance;

        ctx.fillStyle = primaryColor;
        ctx.globalAlpha = p.alpha * (0.6 + currentAudio * 0.4);
        ctx.beginPath();
        ctx.arc(px, py, p.size * (1 + currentAudio), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // 3. Rotating Outer Rings
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.4);
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([12, 8, 4, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 1.25, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-time * 0.6);
      ctx.strokeStyle = secondaryColor;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([20, 15]);
      ctx.beginPath();
      ctx.arc(0, 0, baseRadius * 1.1, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 4. Central Hologram Sphere
      const sphereGrad = ctx.createRadialGradient(
        cx - baseRadius * 0.3,
        cy - baseRadius * 0.3,
        baseRadius * 0.1,
        cx,
        cy,
        baseRadius
      );
      sphereGrad.addColorStop(0, coreColor);
      sphereGrad.addColorStop(0.4, primaryColor);
      sphereGrad.addColorStop(0.85, secondaryColor);
      sphereGrad.addColorStop(1, 'rgba(10, 15, 30, 0.95)');

      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseRadius, 0, Math.PI * 2);
      ctx.fill();

      // Inner boundary ring
      ctx.strokeStyle = primaryColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5. Soundwave Spikes (when speaking or listening)
      if (currentState === 'speaking' || currentState === 'listening') {
        const rayCount = 24;
        for (let i = 0; i < rayCount; i++) {
          const rayAngle = (i / rayCount) * Math.PI * 2;
          const rayHeight = (Math.sin(time * 5 + i) * 0.5 + 0.5) * (18 + currentAudio * 40);
          const x1 = cx + Math.cos(rayAngle) * (baseRadius + 2);
          const y1 = cy + Math.sin(rayAngle) * (baseRadius + 2);
          const x2 = cx + Math.cos(rayAngle) * (baseRadius + 2 + rayHeight);
          const y2 = cy + Math.sin(rayAngle) * (baseRadius + 2 + rayHeight);

          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      // 6. Holographic Eyes & Expressions
      const eyeSpacing = baseRadius * 0.42;
      const eyeY = cy - baseRadius * 0.1;
      const eyeWidth = baseRadius * 0.22;
      let eyeHeight = isBlinking ? 2 : baseRadius * 0.28;

      if (currentState === 'thinking') {
        eyeHeight = 4; // Contemplative squint
      } else if (currentState === 'listening') {
        eyeHeight = baseRadius * 0.35; // Wide focused
      }

      // Eyes Glow
      ctx.shadowColor = primaryColor;
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ffffff';

      // Left Eye
      ctx.beginPath();
      ctx.ellipse(cx - eyeSpacing, eyeY, eyeWidth / 2, eyeHeight / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Right Eye
      ctx.beginPath();
      ctx.ellipse(cx + eyeSpacing, eyeY, eyeWidth / 2, eyeHeight / 2, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pupils / Neon Iris
      if (!isBlinking && eyeHeight > 4) {
        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        const lookOffset = Math.sin(time) * 3;
        ctx.arc(cx - eyeSpacing + lookOffset, eyeY, eyeWidth * 0.3, 0, Math.PI * 2);
        ctx.arc(cx + eyeSpacing + lookOffset, eyeY, eyeWidth * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Dynamic Voice Mouth (Speaking / Idle / Smile)
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      if (currentState === 'speaking') {
        const mouthWidth = baseRadius * 0.35;
        const mouthOpen = Math.abs(Math.sin(time * 12)) * (12 + currentAudio * 16);
        ctx.ellipse(cx, cy + baseRadius * 0.35, mouthWidth / 2, Math.max(3, mouthOpen / 2), 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();
      } else if (currentState === 'action_success') {
        // Bright smile
        ctx.arc(cx, cy + baseRadius * 0.25, baseRadius * 0.22, 0.2, Math.PI - 0.2, false);
        ctx.stroke();
      } else {
        // Gentle subtle smile curve
        ctx.arc(cx, cy + baseRadius * 0.28, baseRadius * 0.16, 0.3, Math.PI - 0.3, false);
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  return (
    <div
      onClick={onClick}
      className="relative flex items-center justify-center cursor-pointer select-none group"
      style={{ width: size, height: size }}
      title="YESMIN AI Holographic Avatar - Tap to interact"
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};
