let isMuted = false;

export const setMute = (value) => {
  isMuted = value;
};

export const playBeep = (freq = 500) => {
  if (isMuted) return;

  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.05);
};
