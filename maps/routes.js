(() => {
  "use strict";

  const routes = {
    garden: {
      entrance: { wide: [50, 20], portrait: [50, 19] },
      junction: { wide: [50, 31], portrait: [50, 29] },
      market: { wide: [72, 32], portrait: [72, 29] },
      queue: {
        wide: [[83, 37], [73, 37], [63, 37]],
        portrait: [[80, 33], [68, 33], [56, 33]],
      },
    },
    attic: {
      entrance: { wide: [50, 51], portrait: [50, 48] },
      junction: { wide: [50, 59], portrait: [50, 55] },
      attractions: {
        wide: [[20, 85], [50, 87], [65, 83]],
        portrait: [[24, 68], [74, 82], [12, 87]],
      },
    },
  };

  function pointFor(point, layout) {
    return layout === "portrait" ? point.portrait : point.wide;
  }

  async function walk(element, points, layout, cancelled = () => false) {
    if (!element?.isConnected) return;
    element.classList.add("is-walking");
    for (const point of points) {
      if (!element.isConnected || cancelled()) return;
      const [x, y] = pointFor(point, layout);
      const currentX = Number.parseFloat(element.style.left) || x;
      const currentY = Number.parseFloat(element.style.top) || y;
      const distance = Math.hypot((x - currentX) * 0.9, y - currentY);
      const duration = Math.min(1150, Math.max(360, 360 + distance * 23));
      element.style.setProperty("--travel-duration", `${duration}ms`);
      element.style.left = `${x}%`;
      element.style.top = `${y}%`;
      await new Promise((resolve) => window.setTimeout(resolve, duration));
      if (cancelled()) return;
    }
    if (element.isConnected) element.classList.remove("is-walking");
  }

  window.TiemNhoRoutes = Object.freeze({ routes, walk });
})();
