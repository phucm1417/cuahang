(() => {
  "use strict";
  const areas = window.TiemNhoSystems?.areas?.customerAreas || ["restaurant", "garden", "attic"];

  function shuffled(source) {
    const result = [...source];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const other = Math.floor(Math.random() * (index + 1));
      [result[index], result[other]] = [result[other], result[index]];
    }
    return result;
  }

  function createJourney({ minActivities = 1, maxActivities = 3 } = {}) {
    const requestedMin = Number.isFinite(Number(minActivities)) ? Math.floor(Number(minActivities)) : 1;
    const requestedMax = Number.isFinite(Number(maxActivities)) ? Math.floor(Number(maxActivities)) : areas.length;
    const minimum = Math.max(1, Math.min(areas.length, requestedMin));
    const maximum = Math.max(minimum, Math.min(areas.length, requestedMax));
    const count = minimum + Math.floor(Math.random() * (maximum - minimum + 1));
    return { activities: shuffled(areas).slice(0, count), activityIndex: 0, completedActivities: [], journeyPhase: "invited" };
  }

  function createCustomer({ id, spriteFolder } = {}) {
    const safeId = typeof id === "string" && id ? id : `guest-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const safeSprite = typeof spriteFolder === "string" && /^Idle(?:_\d+)?$/.test(spriteFolder) ? spriteFolder : "Idle_2";
    return { id: safeId, spriteFolder: safeSprite, ...createJourney() };
  }

  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.characters = Object.freeze({ createJourney, createCustomer });
})();
