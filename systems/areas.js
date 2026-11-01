(() => {
  "use strict";
  const graph = Object.freeze({
    entrance: "restaurant",
    customerAreas: Object.freeze(["restaurant", "garden", "attic"]),
    links: Object.freeze({
      restaurant: Object.freeze(["garden", "kitchen", "attic"]),
      garden: Object.freeze(["restaurant"]),
      kitchen: Object.freeze(["restaurant"]),
      attic: Object.freeze(["restaurant"]),
    }),
    mapNodes: Object.freeze({
      restaurant: Object.freeze([50, 48]),
      garden: Object.freeze([16, 48]),
      kitchen: Object.freeze([84, 48]),
      attic: Object.freeze([50, 83]),
    }),
    externalDoor: Object.freeze({ map: "restaurant", x: 50, y: 13 }),
  });
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.areas = graph;
})();
