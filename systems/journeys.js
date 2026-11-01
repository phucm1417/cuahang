(() => {
  "use strict";
  function current(guest) { return guest.activities?.[guest.activityIndex] || null; }
  function beginActivity(guest) {
    const activity = current(guest);
    if (!activity) return null;
    if (guest.activeActivityIndex === guest.activityIndex && guest.activityToken) return guest.activityToken;
    guest.activityToken = `${guest.id}:${guest.activityIndex}:${Date.now()}:${Math.random()}`;
    guest.activeActivityIndex = guest.activityIndex;
    guest.journeyPhase = "active";
    return guest.activityToken;
  }
  function completeActivity(guest, token) {
    if (!token || guest.activityToken !== token || guest.activeActivityIndex !== guest.activityIndex) return null;
    const finished = current(guest);
    if (!finished) return null;
    guest.completedActivities ||= [];
    guest.completedActivities.push(finished);
    guest.activityToken = null;
    guest.activeActivityIndex = null;
    guest.activityIndex += 1;
    guest.journeyPhase = current(guest) ? "travelling" : "complete";
    return Object.freeze({ finished, next: current(guest), isComplete: !current(guest) });
  }
  function advance(guest) {
    const token = guest.activityToken || beginActivity(guest);
    return completeActivity(guest, token)?.next || null;
  }
  function cancelActivity(guest, token) {
    if (!token || guest.activityToken !== token) return false;
    guest.activityToken = null;
    guest.activeActivityIndex = null;
    guest.journeyPhase = "travelling";
    return true;
  }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.journeys = Object.freeze({ current, beginActivity, completeActivity, cancelActivity, advance, isComplete: (guest) => !current(guest) });
})();
