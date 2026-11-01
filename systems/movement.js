(() => {
  "use strict";
  const routes = Object.freeze({
    garden: Object.freeze({
      entrance: Object.freeze({ wide: [50, 20], portrait: [50, 19] }),
      junction: Object.freeze({ wide: [50, 31], portrait: [50, 29] }),
      market: Object.freeze({ wide: [72, 32], portrait: [72, 29] }),
      queue: Object.freeze({ wide: [[83, 37], [73, 37], [63, 37]], portrait: [[80, 33], [68, 33], [56, 33]] }),
      wander: Object.freeze({ wide: [[23, 34], [80, 42], [58, 39], [30, 41]], portrait: [[24, 34], [76, 43], [68, 40], [31, 44]] }),
    }),
    attic: Object.freeze({
      entrance: Object.freeze({ wide: [50, 51], portrait: [50, 48] }),
      junction: Object.freeze({ wide: [50, 59], portrait: [50, 55] }),
      attractions: Object.freeze({ wide: [[20, 85], [50, 87], [65, 83]], portrait: [[24, 68], [74, 82], [12, 87]] }),
    }),
  });
  function pointFor(point, layout) { return layout === "portrait" ? point.portrait : point.wide; }
  async function walk(element, points, layout, cancelled = () => false) {
    if (!element?.isConnected) return;
    element.classList.add("is-walking");
    for (const point of points) {
      if (!element.isConnected || cancelled()) return;
      const [x, y] = pointFor(point, layout);
      const currentX = Number.parseFloat(element.style.left) || x;
      const currentY = Number.parseFloat(element.style.top) || y;
      const duration = Math.min(1150, Math.max(360, 360 + Math.hypot((x - currentX) * 0.9, y - currentY) * 23));
      element.style.setProperty("--travel-duration", `${duration}ms`);
      element.style.left = `${x}%`;
      element.style.top = `${y}%`;
      await new Promise((resolve) => window.setTimeout(resolve, duration));
      if (cancelled()) return;
    }
    if (element.isConnected) element.classList.remove("is-walking");
  }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.movement = Object.freeze({ routes, pointFor, walk });
})();
