// Web Audio API Synthesizers for Afrivoya (Kalimba, SOS Siren, and Ambient Tones)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays an authentic African Kalimba / Mbira bell tone chord
 */
export function playKalimbaChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Pentatonic African chord: C5, E5, G5, A5 (523Hz, 659Hz, 784Hz, 880Hz)
    const freqs = [523.25, 659.25, 783.99, 880.0];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      // Wooden resonance attack & gentle ring
      gain.gain.setValueAtTime(0, now + idx * 0.04);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.04 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 1.2);
    });
  } catch (e) {
    // AudioContext blocked or not supported
  }
}

/**
 * Emergency Tactical Siren for SOS Alert (Dual frequency siren sweep)
 */
export function playSOSSiren(durationSeconds = 4): () => void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    // Modulate pitch between 600Hz and 950Hz
    osc.frequency.setValueAtTime(650, now);

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(2.5, now); // 2.5 cycles per sec

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(300, now); // swing +/- 300Hz

    lfo.connect(osc.frequency);
    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.001, now + durationSeconds);

    osc.start(now);
    lfo.start(now);
    osc.stop(now + durationSeconds);
    lfo.stop(now + durationSeconds);

    return () => {
      try {
        gain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        setTimeout(() => {
          osc.stop();
          lfo.stop();
        }, 60);
      } catch (err) {}
    };
  } catch (err) {
    return () => {};
  }
}

/**
 * Reads text using Web Speech API (with warm narration voice if available)
 */
export function speakNarration(text: string, onEnd?: () => void): () => void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return () => {};
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 0.95;

  const voices = window.speechSynthesis.getVoices();
  // Find a rich English voice if possible
  const preferredVoice = voices.find(
    (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Oliver'))
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
}
