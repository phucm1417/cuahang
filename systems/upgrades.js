(() => {
  "use strict";
  const costs = Object.freeze({
    chance: (level) => 15 + level * 20,
    reputation: (level) => 35 + (level - 1) * 45,
    queue: (level) => 500 * 2 ** level,
    stoves: (level) => 400 * 2 ** level,
    cooking: (level) => 300 * 2 ** level,
    chef: (level) => 350 * 2 ** level,
    interior: (level) => 500 * 2 ** level,
    garden: (level) => 500 * 2 ** level,
    attic: (level) => 600 * 2 ** level,
  });
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.upgrades = Object.freeze({ cost: (kind, level) => costs[kind]?.(level) ?? null });
})();
