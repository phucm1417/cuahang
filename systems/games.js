(() => {
  "use strict";
  function createReflexGame({ count = 4, targetCount = 3, roundMs = 1150, gapMs = 360, onRound, onFinish }) {
    let game = null;
    function start() {
      stop(false);
      game = { rounds: 0, hits: 0, target: -1, timer: null, nextTimer: null };
      nextRound();
    }
    function nextRound() {
      if (!game) return;
      if (game.rounds >= count) { stop(true); return; }
      game.rounds += 1;
      game.target = Math.floor(Math.random() * targetCount);
      onRound?.(game.target);
      game.timer = window.setTimeout(() => stop(false), roundMs);
    }
    function hit(index) {
      if (!game) return false;
      window.clearTimeout(game.timer);
      if (index !== game.target) { stop(false); return false; }
      game.hits += 1;
      onRound?.(-1);
      game.nextTimer = window.setTimeout(nextRound, gapMs);
      return true;
    }
    function stop(completed = false) {
      if (!game) return;
      window.clearTimeout(game.timer);
      window.clearTimeout(game.nextTimer);
      const result = { hits: game.hits, completed };
      game = null;
      onFinish?.(result);
    }
    return Object.freeze({ start, hit, stop, get active() { return Boolean(game); } });
  }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.games = Object.freeze({ createReflexGame });
})();
