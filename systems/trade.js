(() => {
  "use strict";
  const crops = [
    { id: "carrot", name: "Cà rốt", icon: "🥕", asset: "carrot.svg", seed: 5, price: 24, grow: 15000, fame: 2 },
    { id: "tomato", name: "Cà chua", icon: "🍅", asset: "tomato.svg", seed: 7, price: 30, grow: 19000, fame: 3 },
    { id: "flower", name: "Hoa cúc", icon: "🌼", asset: "daisy.svg", seed: 9, price: 38, grow: 23000, fame: 4 },
    { id: "sunflower", name: "Hướng dương", icon: "🌻", asset: "sunflower.svg", seed: 12, price: 48, grow: 28000, fame: 5 },
  ].map((item) => Object.freeze(item));
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.trade = Object.freeze({ crops: Object.freeze(crops) });
})();
