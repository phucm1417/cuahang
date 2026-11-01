(() => {
  "use strict";
  const areaGraph = window.TiemNhoSystems.areas;
  const lobbyTransfers = Object.freeze({
    garden: Object.freeze([[50, 22], [34, 26], [20, 34], [7, 46]]),
    kitchen: Object.freeze([[50, 22], [66, 25], [82, 34], [94, 46]]),
    attic: Object.freeze([[50, 22], [50, 38], [50, 56], [50, 74]]),
    exit: Object.freeze([[7, 46], [20, 34], [34, 26], [50, 14]]),
  });
  function directWorkArea(current) { return current === "kitchen" ? "restaurant" : "kitchen"; }
  function canDirectlySwitch(current) { return current === "restaurant" || current === "kitchen"; }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.mapNavigation = Object.freeze({ areaGraph, lobbyTransfers, directWorkArea, canDirectlySwitch });
})();
