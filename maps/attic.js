(() => {
  "use strict";
  function create(root, context, saved = {}) {
    let level = Math.max(0, Math.min(5, Number(saved.level) || 0));
    let visitors = [];
    let layout = context.getLayout?.() || "desktop";
    const guestRoute = window.TiemNhoSystems.movement.routes.attic;
    root.replaceChildren();

    const attractions = document.createElement("div");
    attractions.className = "attic-attractions";
    const furniture = [
      { id: "piano", icon: "♫", label: "Chơi đàn", x: 0.20, y: 0.72, portrait: [0.50, 0.61] },
      { id: "arcade", icon: "✦", label: "Máy trò chơi", x: 0.50, y: 0.735, portrait: [0.50, 0.77] },
      { id: "table", icon: "◈", label: "Bàn chơi", x: 0.80, y: 0.74, portrait: [0.50, 0.90] },
    ];
    const attractionButtons = furniture.map((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `attic-attraction attic-attraction--${item.id}`;
      button.setAttribute("aria-label", item.label);
      button.style.left = `${item.x * 100}%`;
      button.style.top = `${item.y * 100}%`;
      button.innerHTML = `<span aria-hidden="true">${item.icon}</span>`;
      button.addEventListener("click", () => startMiniGame(item.id));
      attractions.append(button);
      return { item, button };
    });
    root.append(attractions);

    const visitorLayer = document.createElement("div");
    visitorLayer.className = "attic-visitors";
    root.append(visitorLayer);
    const gamePanel = document.createElement("div");
    gamePanel.className = "attic-mini-game";
    gamePanel.hidden = true;
    gamePanel.setAttribute("aria-label", "Trò chơi phản xạ");
    const targets = [];
    for (let index = 0; index < 3; index += 1) {
      const target = document.createElement("button");
      target.type = "button";
      target.className = "attic-mini-target";
      target.setAttribute("aria-label", `Mục tiêu ${index + 1}`);
      target.innerHTML = "<span aria-hidden=\"true\">✦</span>";
      target.addEventListener("click", () => {
        if (reflexGame?.hit(index)) context.effect?.("upgrade", target);
      });
      gamePanel.append(target);
      targets.push(target);
    }
    root.append(gamePanel);

    const reflexGame = window.TiemNhoSystems.games.createReflexGame({
      onRound(targetIndex) {
        targets.forEach((target, index) => {
          target.classList.toggle("is-lit", index === targetIndex);
          target.disabled = targetIndex < 0;
        });
      },
      onFinish({ hits, completed }) {
        gamePanel.hidden = true;
        attractionButtons.forEach(({ button }) => button.classList.remove("is-playing"));
        if (hits > 0) {
          context.reward?.(hits * (8 + level * 2) + (completed ? 16 : 0), hits + (completed ? 3 : 0));
          context.playSound?.(completed ? "success" : "coin");
          changed();
        } else context.playSound?.("error");
      },
    });

    function changed() { context.onChange?.(); }
    function attractionPoint(index) {
      return {
        wide: guestRoute.attractions.wide[index],
        portrait: guestRoute.attractions.portrait[index],
      };
    }
    function walkGuest(guest, points) {
      const routeId = ++guest.routeId;
      return window.TiemNhoSystems.movement.walk(guest.element, points, layout, () => routeId !== guest.routeId);
    }
    function visitGuest(customer, onComplete) {
      if (!canVisit()) return false;
      const station = Math.floor(Math.random() * furniture.length);
      const guest = { customer, element: document.createElement("div"), station, routeId: 0 };
      guest.element.className = "map-visitor attic-visitor";
      guest.element.dataset.spriteFolder = customer.spriteFolder;
      guest.element.innerHTML = "<img alt=\"\" draggable=\"false\"><span class=\"attic-guest-sparkle\" aria-hidden=\"true\">✦</span>";
      guest.element.querySelector("img").src = `./assets/sprites/${customer.spriteFolder}/south.png`;
      visitorLayer.append(guest.element);
      visitors.push(guest);
      const point = layout === "portrait" ? guestRoute.entrance.portrait : guestRoute.entrance.wide;
      guest.element.style.left = `${point[0]}%`;
      guest.element.style.top = `${point[1]}%`;
      guest.element.style.opacity = "0";
      requestAnimationFrame(() => { guest.element.style.opacity = "1"; });
      guest.element.classList.remove("is-arriving");
      const stop = attractionPoint(station);
      const mid = {
        wide: [stop.wide[0], guestRoute.junction.wide[1]],
        portrait: [stop.portrait[0], guestRoute.junction.portrait[1]],
      };
      walkGuest(guest, [guestRoute.entrance, guestRoute.junction, mid, stop]);
      const stay = 7000 + Math.random() * 5000;
      window.setTimeout(() => {
        if (!visitors.includes(guest)) return;
        guest.element.classList.add("is-departing");
        visitors = visitors.filter((item) => item !== guest);
        walkGuest(guest, [mid, guestRoute.junction, guestRoute.entrance]).then(() => {
          context.effect?.("coin", guest.element);
          guest.element.remove();
          context.reward?.(18 + level * 4 + Math.floor(Math.random() * 8), 1 + Math.floor(level / 2));
          context.playSound?.("coin");
          changed();
          onComplete?.();
        });
      }, stay);
      return true;
    }
    function startMiniGame(id) {
      if (reflexGame.active) reflexGame.stop(false);
      gamePanel.hidden = false;
      attractionButtons.forEach(({ button }) => button.classList.toggle("is-playing", button.classList.contains(`attic-attraction--${id}`)));
      reflexGame.start();
    }
    function upgrade() {
      if (level >= 5) return false;
      if (!context.spend?.(window.TiemNhoSystems.upgrades.cost("attic", level))) return false;
      level += 1;
      changed();
      return true;
    }
    function renderUpgrade() {
      return {
        level,
        max: 5,
        cost: level >= 5 ? null : window.TiemNhoSystems.upgrades.cost("attic", level),
        detail: level >= 5 ? "Không gian giải trí đã đạt tối đa" : `Tăng thu nhập khách và mini game · cấp ${level + 1}`,
      };
    }
    function canVisit() { return visitors.length < 8; }
    function setLayout(nextLayout) {
      layout = nextLayout;
      attractionButtons.forEach(({ item, button }) => {
        const point = layout === "portrait" ? item.portrait : [item.x, item.y];
        button.style.left = `${point[0] * 100}%`;
        button.style.top = `${point[1] * 100}%`;
      });
    }
    function setActive(isActive) {
      if (!isActive && reflexGame.active) reflexGame.stop(false);
    }
    function serialize() { return { level }; }
    setLayout(context.getLayout?.() || "desktop");
    return { visitGuest, canVisit, upgrade, renderUpgrade, setLayout, setActive, serialize };
  }

  window.TiemNhoMaps.register({
    id: "attic", name: "Tầng gác", wideBackground: "./assets/background-concepts/attic-wide.svg",
    portraitBackground: "./assets/background-concepts/attic-portrait.svg",
    icon: '<path d="M4 19V8l8-5 8 5v11H4Z"/><path d="M8 19v-7h8v7M3 9l9-6 9 6"/>',
    surface: "attic", create,
  });
})();
