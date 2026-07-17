"use client";

class T2PopUpSynth {
  private ctx: AudioContext | null = null;

  private init() {
    if (this.ctx) {
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      return;
    }
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    } catch (err) {
      console.warn("Web Audio API not supported in this browser:", err);
    }
  }

  // Sparkling crystal wind chimes arpeggio when book opens
  public playBookOpenChime() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66]; // D5, E5, G5, A5, C6, D6 (Pentatonic Scale)

    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.06, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    masterGain.connect(this.ctx.destination);

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const delay = idx * 0.12;

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + delay);

      // Add soft vibrato
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 6; // 6 Hz vibrato
      lfoGain.gain.value = 4; // 4 Hz depth
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      const noteGain = this.ctx.createGain();
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.2, now + delay + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.6);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      lfo.start(now + delay);
      osc.start(now + delay);

      lfo.stop(now + delay + 0.7);
      osc.stop(now + delay + 0.7);
    });
  }

  // Soft organic paper rustle sweep on page flip
  public playPageFlip() {
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 0.45;
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // White noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;

    // Soft lowpass filter to mimic heavy paper rustling
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + duration);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noiseNode.start(now);
    noiseNode.stop(now + duration + 0.05);
  }
}

export const popUpSynth = new T2PopUpSynth();
