(() => {
  "use strict";
  function current(guest) { return guest.activities?.[guest.activityIndex] || null; }
  function advance(guest) {
    const finished = current(guest);
    if (finished) guest.completedActivities.push(finished);
    guest.activityIndex += 1;
    return current(guest);
  }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.journeys = Object.freeze({ current, advance, isComplete: (guest) => !current(guest) });
})();
