(() => {
  "use strict";
  function createEconomy(adapter) {
    return Object.freeze({
      canAfford(amount) { return adapter.getMoney() >= amount; },
      spend(amount) {
        if (!Number.isFinite(amount) || amount < 0 || adapter.getMoney() < amount) return false;
        adapter.setMoney(adapter.getMoney() - amount);
        adapter.onChange?.();
        return true;
      },
      earn(amount, reputation = 0) {
        adapter.setMoney(adapter.getMoney() + Math.max(0, amount));
        adapter.setReputation(adapter.getReputation() + reputation);
        adapter.onChange?.();
      },
      adjustReputation(amount) {
        adapter.setReputation(Math.max(0, adapter.getReputation() + amount));
        adapter.onChange?.();
      },
    });
  }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.economy = Object.freeze({ create: createEconomy });
})();
