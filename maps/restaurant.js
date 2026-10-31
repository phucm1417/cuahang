window.TiemNhoMaps.register({
  id: "restaurant",
  name: "Nhà hàng",
  wideBackground: "./assets/background-concepts/restaurant-wide-v2.svg",
  portraitBackground: "./assets/background-concepts/restaurant-portrait.svg",
  mobileBackground: "./background.png",
  icon: '<path d="M3 20V10l9-7 9 7v10h-6v-6H9v6z"/><path d="M2 10h20"/>',
  surface: "restaurant",
  furniture({ portrait, mobile, tableWidth, sceneAspect }) {
    const desk = {
      x: portrait ? 0.17 : mobile ? 0.17 : 0.15,
      y: portrait ? 0.35 : mobile ? 0.46 : 0.52,
      width: tableWidth * 0.65,
      aspect: 1.5,
    };
    const deskHeight = desk.width * sceneAspect / desk.aspect;
    return [
      { asset: "hall-service-desk", name: "Quầy thu ngân", surface: "floor", x: desk.x, y: desk.y, width: desk.width, aspect: desk.aspect, anchor: "bottom", blocks: true },
      { asset: "tip-jar", name: "Hũ tiền tip", surface: "floor", x: desk.x, y: desk.y - deskHeight * (1 - 0.2875), width: tableWidth * 0.22, aspect: 0.8, anchor: "bottom" },
      { asset: "tea-table", name: "Bàn trà", surface: "floor", x: portrait ? 0.84 : mobile ? 0.86 : 0.88, y: portrait ? 0.35 : mobile ? 0.46 : 0.52, width: tableWidth * 0.60, aspect: 1.6, anchor: "bottom", blocks: true },
      { asset: "entry-planter", name: "Chậu cây cửa vào", surface: "floor", x: portrait ? 0.38 : 0.36, y: portrait ? 0.34 : mobile ? 0.46 : 0.52, width: tableWidth * 0.45, aspect: 1.15, anchor: "bottom", blocks: true },
      { asset: "entry-planter", name: "Chậu cây cửa vào", surface: "floor", x: portrait ? 0.62 : 0.64, y: portrait ? 0.34 : mobile ? 0.46 : 0.52, width: tableWidth * 0.45, aspect: 1.15, anchor: "bottom", blocks: true, flip: true },
      { asset: "foyer-rug", name: "Thảm sảnh", surface: "floor", x: 0.5, y: portrait ? 0.82 : mobile ? 0.86 : 0.86, width: tableWidth * 1.10, aspect: 1.75, anchor: "bottom" },
      { asset: "wall-window", name: "Cửa sổ sảnh", surface: "wall", x: 0.16, y: portrait ? 0.12 : 0.123, width: tableWidth * 0.55, aspect: 1.33, anchor: "center" },
    ];
  },
});
