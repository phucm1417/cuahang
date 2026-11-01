(() => {
  "use strict";
  const sounds = Object.freeze({
    soft: { notes: [523, 659], wave: "sine", step: 0.12, length: 0.21, volume: 0.045 },
    click: { notes: [430], wave: "sine", step: 0.04, length: 0.09, volume: 0.03 },
    invite: { notes: [440, 587], wave: "triangle", step: 0.075, length: 0.14, volume: 0.04 },
    order: { notes: [587, 740, 880], wave: "triangle", step: 0.08, length: 0.15, volume: 0.045 },
    cook: { notes: [330, 392, 494], wave: "sine", step: 0.11, length: 0.24, volume: 0.04 },
    transfer: { notes: [784, 659], wave: "sine", step: 0.07, length: 0.12, volume: 0.035 },
    serve: { notes: [659, 784, 988], wave: "triangle", step: 0.07, length: 0.16, volume: 0.045 },
    pickup: { notes: [523], wave: "sine", step: 0.04, length: 0.12, volume: 0.04 },
    coin: { notes: [659, 880], wave: "sine", step: 0.12, length: 0.21, volume: 0.05 },
    upgrade: { notes: [523, 659, 784], wave: "triangle", step: 0.08, length: 0.17, volume: 0.045 },
    success: { notes: [659, 784, 1047], wave: "sine", step: 0.09, length: 0.22, volume: 0.05 },
    error: { notes: [392, 330], wave: "triangle", step: 0.09, length: 0.16, volume: 0.035 },
    plant: { notes: [392, 523], wave: "sine", step: 0.08, length: 0.14, volume: 0.035 },
    harvest: { notes: [659, 784], wave: "triangle", step: 0.07, length: 0.16, volume: 0.045 },
    water: { notes: [587, 740], wave: "sine", step: 0.09, length: 0.17, volume: 0.03 },
  });
  function createAudio() {
    let context = null;
    let muted = false;
    function play(kind = "soft") {
      if (muted) return;
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      try {
        context ||= new AudioContextClass();
        if (context.state === "suspended") context.resume()?.catch(() => {});
        const sound = sounds[kind] || sounds.soft;
        const now = context.currentTime;
        sound.notes.forEach((frequency, index) => {
          const start = now + index * sound.step;
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          oscillator.type = sound.wave;
          oscillator.frequency.setValueAtTime(frequency, start);
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(sound.volume, start + 0.018);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + sound.length);
          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.start(start);
          oscillator.stop(start + sound.length + 0.01);
        });
      } catch {
        // Audio availability must never block a game action.
      }
    }
    return Object.freeze({ play, setMuted(value) { muted = Boolean(value); }, get muted() { return muted; } });
  }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.audio = Object.freeze({ create: createAudio });
})();
