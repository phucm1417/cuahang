(() => {
  "use strict";
  const crops = [
    { id: "carrot", name: "Cà rốt", icon: "🥕", asset: "carrot.svg", seed: 5, price: 24, grow: 15000, fame: 2 },
    { id: "tomato", name: "Cà chua", icon: "🍅", asset: "tomato.svg", seed: 7, price: 30, grow: 19000, fame: 3 },
    { id: "flower", name: "Hoa cúc", icon: "🌼", asset: "daisy.svg", seed: 9, price: 38, grow: 23000, fame: 4 },
    { id: "sunflower", name: "Hướng dương", icon: "🌻", asset: "sunflower.svg", seed: 12, price: 48, grow: 28000, fame: 5 },
  ];
  const positions = {
    desktop: [[0.28, 0.53], [0.50, 0.53], [0.72, 0.53], [0.28, 0.75], [0.50, 0.75], [0.72, 0.75]],
    mobile: [[0.247, 0.53], [0.50, 0.53], [0.753, 0.53], [0.247, 0.75], [0.50, 0.75], [0.753, 0.75]],
    portrait: [[0.34, 0.37], [0.66, 0.37], [0.34, 0.52], [0.66, 0.52], [0.34, 0.67], [0.66, 0.67]],
  };

  function create(root, context, saved = {}) {
    let layout = "desktop";
    let selectedTool = "carrot";
    let active = false;
    let tickTimer = null;
    let plotNodes = [];
    let visitors = [];
    let data = {
      level: Math.max(0, Math.min(2, Number(saved.level) || 0)),
      plots: Array.from({ length: 6 }, (_, index) => {
        const plot = saved.plots?.[index];
        return plot?.crop && crops.some((crop) => crop.id === plot.crop)
          ? { crop: plot.crop, readyAt: Math.max(Date.now(), Number(plot.readyAt) || Date.now()), watered: Boolean(plot.watered) }
          : null;
      }),
      inventory: crops.map(({ id }) => Math.max(0, Math.floor(Number(saved.inventory?.[id]) || 0))),
    };

    root.replaceChildren();
    const plotLayer = document.createElement("div");
    plotLayer.className = "garden-plots";
    root.append(plotLayer);
    const toolbar = document.createElement("div");
    toolbar.className = "garden-tools";
    const cropButtons = new Map();
    crops.forEach((crop) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "garden-tool";
      button.setAttribute("aria-label", `${crop.name}, ${crop.seed} xu`);
      button.innerHTML = `<img src="./assets/maps/crops/${crop.asset}" alt=""><small>0</small><b>${crop.seed}</b>`;
      button.addEventListener("click", () => {
        selectedTool = crop.id;
        render();
      });
      cropButtons.set(crop.id, button);
      toolbar.append(button);
    });
    const waterButton = document.createElement("button");
    waterButton.type = "button";
    waterButton.className = "garden-tool garden-tool--water";
    waterButton.setAttribute("aria-label", "Tưới cây");
    waterButton.innerHTML = "<img src=\"./assets/maps/crops/watering-can.svg\" alt=\"\">";
    waterButton.addEventListener("click", () => {
      selectedTool = "water";
      render();
    });
    toolbar.append(waterButton);
    root.append(toolbar);

    const visitorLayer = document.createElement("div");
    visitorLayer.className = "garden-visitors";
    root.append(visitorLayer);

    function activePlotCount() { return 4 + data.level; }
    function cropById(id) { return crops.find((crop) => crop.id === id); }
    function changed() {
      render();
      context.onChange?.();
    }
    function createPlots() {
      const points = positions[layout] || positions.desktop;
      plotLayer.replaceChildren();
      plotNodes = data.plots.map((plot, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "garden-plot";
        button.style.left = `${points[index][0] * 100}%`;
        button.style.top = `${points[index][1] * 100}%`;
        button.setAttribute("aria-label", `Luống ${index + 1}`);
        const icon = document.createElement("img");
        icon.className = "garden-plot__crop";
        icon.alt = "";
        const progress = document.createElement("i");
        progress.className = "garden-plot__progress";
        const water = document.createElement("b");
        water.className = "garden-plot__water";
        button.append(icon, progress, water);
        button.addEventListener("click", () => interactWithPlot(index));
        plotLayer.append(button);
        return { button, icon, progress, water };
      });
    }
    function interactWithPlot(index) {
      if (index >= activePlotCount()) return;
      const plot = data.plots[index];
      const now = Date.now();
      if (!plot) {
        const crop = cropById(selectedTool);
        if (!crop || !context.spend?.(crop.seed)) return;
        data.plots[index] = { crop: crop.id, readyAt: now + crop.grow, watered: false };
        context.playSound?.("plant");
        changed();
        return;
      }
      if (now >= plot.readyAt) {
        const crop = cropById(plot.crop);
        const inventoryIndex = crops.findIndex((item) => item.id === plot.crop);
        data.inventory[inventoryIndex] += 1;
        data.plots[index] = null;
        context.playSound?.("harvest");
        changed();
        return;
      }
      if (selectedTool === "water" && !plot.watered) {
        const crop = cropById(plot.crop);
        plot.readyAt = Math.max(now + 3500, plot.readyAt - crop.grow * 0.38);
        plot.watered = true;
        context.playSound?.("water");
        changed();
      }
    }
    function render() {
      const points = positions[layout] || positions.desktop;
      plotNodes.forEach((node, index) => {
        const plot = data.plots[index];
        node.button.style.left = `${points[index][0] * 100}%`;
        node.button.style.top = `${points[index][1] * 100}%`;
        node.button.classList.toggle("is-locked", index >= activePlotCount());
        node.button.classList.toggle("is-growing", Boolean(plot && Date.now() < plot.readyAt));
        node.button.classList.toggle("is-ready", Boolean(plot && Date.now() >= plot.readyAt));
        const crop = plot ? cropById(plot.crop) : null;
        node.icon.hidden = !crop;
        if (crop && node.icon.dataset.crop !== crop.id) {
          node.icon.src = `./assets/maps/crops/${crop.asset}`;
          node.icon.dataset.crop = crop.id;
        }
        const progress = plot ? Math.min(100, Math.max(4, (1 - (plot.readyAt - Date.now()) / cropById(plot.crop).grow) * 100)) : 0;
        node.progress.style.setProperty("--growth", `${progress}%`);
        node.water.textContent = plot?.watered ? "💧" : "";
        node.button.setAttribute("aria-label", index >= activePlotCount()
          ? `Luống ${index + 1} chưa mở`
          : !plot ? `Trồng ${cropById(selectedTool)?.name || "cây"} tại luống ${index + 1}`
            : Date.now() >= plot.readyAt ? `Thu hoạch ${cropById(plot.crop).name}`
              : plot.watered ? `${cropById(plot.crop).name} đang lớn` : `Tưới ${cropById(plot.crop).name}`);
      });
      crops.forEach((crop) => {
        const index = crops.findIndex((item) => item.id === crop.id);
        const button = cropButtons.get(crop.id);
        button.classList.toggle("is-selected", selectedTool === crop.id);
        button.querySelector("small").textContent = data.inventory[index];
      });
      visitors.forEach((visitor) => {
        visitor.element.querySelector(".map-visitor__order").disabled = data.inventory[crops.indexOf(visitor.crop)] < 1;
      });
      waterButton.classList.toggle("is-selected", selectedTool === "water");
    }
    function visit() {
      if (visitors.length >= 3) return false;
      const crop = crops[Math.floor(Math.random() * crops.length)];
      const guest = {
        crop,
        element: document.createElement("div"),
        timer: null,
      };
      guest.element.className = "map-visitor garden-visitor is-arriving";
      guest.element.innerHTML = `<img alt="" draggable="false"><button type="button" class="map-visitor__order" aria-label="Mua ${crop.name} · ${crop.price} xu"><img src="./assets/maps/crops/${crop.asset}" alt=""><small>${crop.price}</small></button>`;
      guest.element.querySelector("img").src = `./assets/sprites/Idle_${2 + Math.floor(Math.random() * 9)}/south.png`;
      const order = guest.element.querySelector("button");
      order.disabled = data.inventory[crops.indexOf(crop)] < 1;
      order.addEventListener("click", () => {
        const index = crops.indexOf(crop);
        if (data.inventory[index] < 1) return;
        data.inventory[index] -= 1;
        visitors = visitors.filter((item) => item !== guest);
        guest.element.classList.add("is-leaving");
        context.reward?.(crop.price + data.level * 4, crop.fame + Math.floor(data.level / 2));
        context.playSound?.("coin");
        window.setTimeout(() => guest.element.remove(), 700);
        changed();
      });
      visitorLayer.append(guest.element);
      visitors.push(guest);
      guest.element.style.left = "50%";
      guest.element.style.top = "30%";
      window.setTimeout(() => {
        guest.element.classList.remove("is-arriving");
        guest.element.style.left = `${82 - (visitors.length - 1) * 10}%`;
        guest.element.style.top = "38%";
      }, 900);
      window.setTimeout(() => {
        if (!visitors.includes(guest)) return;
        visitors = visitors.filter((item) => item !== guest);
        guest.element.classList.add("is-leaving");
        window.setTimeout(() => guest.element.remove(), 700);
        changed();
      }, 25000);
      return true;
    }
    function upgrade() {
      if (data.level >= 2) return false;
      const cost = 500 * 2 ** data.level;
      if (!context.spend?.(cost)) return false;
      data.level += 1;
      changed();
      return true;
    }
    function renderUpgrade() {
      return {
        level: data.level,
        max: 2,
        cost: data.level >= 2 ? null : 500 * 2 ** data.level,
        detail: data.level >= 2 ? "Đã mở đủ luống trồng" : `Mở thêm luống trồng · ${activePlotCount()} luống`,
      };
    }
    function canVisit() { return visitors.length < 3; }
    function setLayout(next) {
      if (next === layout) return;
      layout = next;
      createPlots();
      render();
    }
    function setActive(next) {
      active = next;
      if (tickTimer) window.clearInterval(tickTimer);
      tickTimer = active ? window.setInterval(render, 650) : null;
    }
    function serialize() {
      return {
        level: data.level,
        plots: data.plots.map((plot) => plot ? { ...plot } : null),
        inventory: Object.fromEntries(crops.map((crop, index) => [crop.id, data.inventory[index]])),
      };
    }
    createPlots();
    render();
    return { visit, canVisit, upgrade, renderUpgrade, setLayout, setActive, serialize };
  }

  window.TiemNhoMaps.register({
    id: "garden", name: "Vườn", wideBackground: "./assets/background-concepts/garden-wide.svg",
    portraitBackground: "./assets/background-concepts/garden-portrait.svg",
    icon: '<path d="M12 21V11m0 4c-7 0-9-4-9-9 5 0 9 3 9 9Zm0-2c0-6 3-10 9-10 0 6-3 10-9 10Z"/>',
    surface: "garden", create,
  });
})();
