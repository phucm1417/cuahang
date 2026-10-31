window.TiemNhoMaps.register({
  id: "kitchen",
  name: "Bếp",
  wideBackground: "./assets/background-concepts/kitchen-wide-v1.svg",
  portraitBackground: "./assets/background-concepts/kitchen-portrait.svg",
  mobileBackground: "./assets/background-concepts/kitchen-wide-v1.svg",
  icon: '<path d="M3 11h18v2a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM6 16v3m12-3v3M7 8l-1-2m6 2V4m6 4 1-2"/><path d="M5 20h14"/>',
  surface: "kitchen",
  furniture({ portrait, mobile, tableWidth }) {
    return [
      { asset: "kitchen-window", name: "Cửa sổ bếp", surface: "wall", x: 0.16, y: portrait ? 0.13 : 0.145, width: tableWidth * 0.52, aspect: 1, anchor: "center" },
      { asset: "kitchen-wall-cabinet", name: "Tủ bếp treo", surface: "wall", x: 0.52, y: portrait ? 0.14 : 0.145, width: tableWidth * 0.55, aspect: 1.17, anchor: "center" },
      { asset: "kitchen-ingredient-shelf", name: "Kệ nguyên liệu", surface: "wall", x: 0.82, y: 0.14, width: tableWidth * 0.42, aspect: 1.08, anchor: "center" },
      { asset: "kitchen-hanging-rack", name: "Giá treo đồ bếp", surface: "wall", x: 0.30, y: portrait ? 0.21 : mobile ? 0.185 : 0.176, width: tableWidth * 0.40, aspect: 1.15, anchor: "center" },
      { asset: "kitchen-prep-sink", name: "Bàn sơ chế", surface: "floor", x: 0.50, y: portrait ? 0.35 : mobile ? 0.40 : 0.40, width: tableWidth * 0.68, aspect: 1.77, anchor: "bottom", blocks: true },
      { asset: "kitchen-refrigerator", name: "Tủ lạnh", surface: "floor", x: portrait ? 0.145 : mobile ? 0.13 : 0.12, y: portrait ? 0.87 : mobile ? 0.90 : 0.85, width: tableWidth * 0.50, aspect: 0.73, anchor: "bottom", blocks: true },
      { asset: "kitchen-waste-bin", name: "Thùng rác", surface: "floor", x: portrait ? 0.87 : 0.90, y: portrait ? 0.87 : mobile ? 0.90 : 0.85, width: tableWidth * 0.36, aspect: 0.8, anchor: "bottom", blocks: true },
      { asset: "foyer-rug", name: "Thảm chống trượt", surface: "floor", x: 0.5, y: portrait ? 0.83 : mobile ? 0.90 : 0.85, width: tableWidth * 0.88, aspect: 1.75, anchor: "bottom" },
    ];
  },
});
