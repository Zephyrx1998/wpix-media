import { useCallback, useRef } from "react";

// Create audio context lazily to avoid autoplay restrictions
const getAudioContext = (() => {
  let audioContext: AudioContext | null = null;
  return () => {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContext;
  };
})();

export const useChatSounds = () => {
  const isEnabledRef = useRef(true);

  // Soft chime for welcome notification
  const playWelcomeSound = useCallback(() => {
    if (!isEnabledRef.current) return;
    
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      // Two-note ascending chime
      const frequencies = [523.25, 659.25]; // C5, E5
      
      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(freq, now);
        
        const startTime = now + i * 0.12;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.5);
      });
    } catch (e) {
      console.log("Audio not available");
    }
  }, []);

  // Soft pop for sent message
  const playSendSound = useCallback(() => {
    if (!isEnabledRef.current) return;
    
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, now); // A5
      oscillator.frequency.exponentialRampToValueAtTime(1100, now + 0.08);
      
      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      oscillator.start(now);
      oscillator.stop(now + 0.15);
    } catch (e) {
      console.log("Audio not available");
    }
  }, []);

  // Soft notification for received message
  const playReceiveSound = useCallback(() => {
    if (!isEnabledRef.current) return;
    
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      // Two-note descending notification
      const frequencies = [784, 659.25]; // G5, E5
      
      frequencies.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(freq, now);
        
        const startTime = now + i * 0.1;
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.03);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.3);
      });
    } catch (e) {
      console.log("Audio not available");
    }
  }, []);

  // Soft click for opening chat
  const playOpenSound = useCallback(() => {
    if (!isEnabledRef.current) return;
    
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, now);
      oscillator.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      
      oscillator.start(now);
      oscillator.stop(now + 0.12);
    } catch (e) {
      console.log("Audio not available");
    }
  }, []);

  // Soft click for closing chat
  const playCloseSound = useCallback(() => {
    if (!isEnabledRef.current) return;
    
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(700, now);
      oscillator.frequency.exponentialRampToValueAtTime(500, now + 0.1);
      
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      
      oscillator.start(now);
      oscillator.stop(now + 0.12);
    } catch (e) {
      console.log("Audio not available");
    }
  }, []);

  const setEnabled = useCallback((enabled: boolean) => {
    isEnabledRef.current = enabled;
  }, []);

  return {
    playWelcomeSound,
    playSendSound,
    playReceiveSound,
    playOpenSound,
    playCloseSound,
    setEnabled,
  };
};
