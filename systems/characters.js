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

  function createJourney() {
    const count = 1 + Math.floor(Math.random() * 3);
    return { activities: shuffled(areas).slice(0, count), activityIndex: 0, completedActivities: [] };
  }

  function createCustomer({ id, spriteFolder }) {
    return { id, spriteFolder, ...createJourney() };
  }

  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.characters = Object.freeze({ createJourney, createCustomer });
})();
