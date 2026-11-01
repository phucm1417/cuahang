(() => {
  "use strict";
  function createRuntimeState() {
    return {
      money: 0, reputationPoints: 100, chanceLevel: 0, reputationLevel: 1, queueLevel: 0,
      kitchenStoveLevel: 0, kitchenCookLevel: 0, kitchenChefSpeedLevel: 0,
      hallInteriorLevel: 0, kitchenInteriorLevel: 0, unlockedMenuCount: 1,
      gardenData: null, atticData: null, inviteProgress: 0,
      guests: new Map(), waitingQueue: [], queueMarkers: new Map(), pendingPayments: new Map(), paymentButtons: new Map(),
      entryDoorTransitCount: 0, servingGuest: null, staffTaskQueue: [], chefTaskQueue: [],
      kitchenFoodQueue: [], diningFoodQueue: [], chefWorking: false, moneyPickupInProgress: false,
      pendingCoins: 0, tableSeats: [], occupiedTables: new Map(), scenePropObstacles: [],
      layoutName: "desktop", mapMode: "restaurant", journeyGuests: new Set(), muted: false, timers: new Set(),
    };
  }
  function integer(value, minimum = 0, maximum = Number.MAX_SAFE_INTEGER) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.min(maximum, Math.max(minimum, Math.floor(parsed))) : minimum;
  }
  function restore(state, saved, { menuLength, limits }) {
    if (!saved || typeof saved !== "object") return state;
    state.money = integer(saved.money);
    const reputation = Number(saved.reputationPoints);
    if (Number.isFinite(reputation)) state.reputationPoints = Math.max(0, reputation);
    state.chanceLevel = integer(saved.chanceLevel, 0, limits.chance);
    state.reputationLevel = integer(saved.reputationLevel, 1, limits.reputation);
    state.queueLevel = integer(saved.queueLevel);
    state.kitchenStoveLevel = integer(saved.kitchenStoveLevel, 0, limits.stoves);
    state.kitchenCookLevel = integer(saved.kitchenCookLevel, 0, limits.cooking);
    state.kitchenChefSpeedLevel = integer(saved.kitchenChefSpeedLevel, 0, limits.chef);
    state.hallInteriorLevel = integer(saved.hallInteriorLevel, 0, limits.hallInterior);
    state.kitchenInteriorLevel = integer(saved.kitchenInteriorLevel, 0, limits.kitchenInterior);
    state.unlockedMenuCount = integer(saved.unlockedMenuCount, 1, menuLength);
    state.gardenData = saved.gardenData && typeof saved.gardenData === "object" && !Array.isArray(saved.gardenData) ? saved.gardenData : null;
    state.atticData = saved.atticData && typeof saved.atticData === "object" && !Array.isArray(saved.atticData) ? saved.atticData : null;
    return state;
  }
  function serialize(state, areaData = {}) {
    return {
      schemaVersion: 2,
      money: state.money,
      reputationPoints: state.reputationPoints,
      chanceLevel: state.chanceLevel,
      reputationLevel: state.reputationLevel,
      queueLevel: state.queueLevel,
      kitchenStoveLevel: state.kitchenStoveLevel,
      kitchenCookLevel: state.kitchenCookLevel,
      kitchenChefSpeedLevel: state.kitchenChefSpeedLevel,
      hallInteriorLevel: state.hallInteriorLevel,
      kitchenInteriorLevel: state.kitchenInteriorLevel,
      unlockedMenuCount: state.unlockedMenuCount,
      gardenData: areaData.gardenData ?? state.gardenData,
      atticData: areaData.atticData ?? state.atticData,
    };
  }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.state = Object.freeze({ create: createRuntimeState, restore, serialize });
})();
