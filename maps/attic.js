(() => {
  "use strict";
  function create(root, context, saved = {}) {
    let level = Math.max(0, Math.min(5, Number(saved.level) || 0));
    let visitors = [];
    let currentGame = null;
    let layout = context.getLayout?.() || "desktop";
    const guestRoute = window.TiemNhoRoutes.routes.attic;
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
      target.addEventListener("click", () => hitTarget(index));
      gamePanel.append(target);
      targets.push(target);
    }
    root.append(gamePanel);

    function changed() { context.onChange?.(); }
    function attractionPoint(index) {
      return {
        wide: guestRoute.attractions.wide[index],
        portrait: guestRoute.attractions.portrait[index],
      };
    }
    function walkGuest(guest, points) {
      const routeId = ++guest.routeId;
      return window.TiemNhoRoutes.walk(guest.element, points, layout, () => routeId !== guest.routeId);
    }
    function visit() {
      if (visitors.length >= 4) return false;
      const station = visitors.length % 3;
      const guest = { element: document.createElement("div"), station, routeId: 0 };
      guest.element.className = "map-visitor attic-visitor is-arriving";
      guest.element.innerHTML = "<img alt=\"\" draggable=\"false\"><span class=\"attic-guest-sparkle\" aria-hidden=\"true\">✦</span>";
      guest.element.querySelector("img").src = `./assets/sprites/Idle_${2 + Math.floor(Math.random() * 9)}/south.png`;
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
          guest.element.remove();
          context.reward?.(18 + level * 4 + Math.floor(Math.random() * 8), 1 + Math.floor(level / 2));
          context.playSound?.("coin");
          changed();
        });
      }, stay);
      return true;
    }
    function startMiniGame(id) {
      if (currentGame) endMiniGame(false);
      currentGame = { id, rounds: 0, hits: 0, target: -1, timer: null, nextTimer: null };
      gamePanel.hidden = false;
      attractionButtons.forEach(({ button }) => button.classList.toggle("is-playing", button.classList.contains(`attic-attraction--${id}`)));
      nextRound();
    }
    function nextRound() {
      if (!currentGame) return;
      if (currentGame.rounds >= 4) { endMiniGame(true); return; }
      currentGame.rounds += 1;
      currentGame.target = Math.floor(Math.random() * targets.length);
      targets.forEach((target, index) => {
        target.classList.toggle("is-lit", index === currentGame.target);
        target.disabled = false;
      });
      currentGame.timer = window.setTimeout(() => endMiniGame(false), 1150);
    }
    function hitTarget(index) {
      if (!currentGame) return;
      window.clearTimeout(currentGame.timer);
      if (index !== currentGame.target) { endMiniGame(false); return; }
      currentGame.hits += 1;
      targets.forEach((target) => { target.disabled = true; target.classList.remove("is-lit"); });
      currentGame.nextTimer = window.setTimeout(nextRound, 360);
    }
    function endMiniGame(completed) {
      if (!currentGame) return;
      window.clearTimeout(currentGame.timer);
      window.clearTimeout(currentGame.nextTimer);
      const hits = currentGame.hits;
      currentGame = null;
      gamePanel.hidden = true;
      attractionButtons.forEach(({ button }) => button.classList.remove("is-playing"));
      if (hits > 0) {
        const bonus = completed ? 16 : 0;
        context.reward?.(hits * (8 + level * 2) + bonus, hits + (completed ? 3 : 0));
        context.playSound?.(completed ? "success" : "coin");
        changed();
      } else context.playSound?.("error");
    }
    function upgrade() {
      if (level >= 5) return false;
      if (!context.spend?.(600 * 2 ** level)) return false;
      level += 1;
      changed();
      return true;
    }
    function renderUpgrade() {
      return {
        level,
        max: 5,
        cost: level >= 5 ? null : 600 * 2 ** level,
        detail: level >= 5 ? "Không gian giải trí đã đạt tối đa" : `Tăng thu nhập khách và mini game · cấp ${level + 1}`,
      };
    }
    function canVisit() { return visitors.length < 4; }
    function setLayout(nextLayout) {
      layout = nextLayout;
      attractionButtons.forEach(({ item, button }) => {
        const point = layout === "portrait" ? item.portrait : [item.x, item.y];
        button.style.left = `${point[0] * 100}%`;
        button.style.top = `${point[1] * 100}%`;
      });
    }
    function setActive(isActive) {
      if (!isActive && currentGame) endMiniGame(false);
    }
    function serialize() { return { level }; }
    setLayout(context.getLayout?.() || "desktop");
    return { visit, canVisit, upgrade, renderUpgrade, setLayout, setActive, serialize };
  }

  window.TiemNhoMaps.register({
    id: "attic", name: "Tầng gác", wideBackground: "./assets/background-concepts/attic-wide.svg",
    portraitBackground: "./assets/background-concepts/attic-portrait.svg",
    icon: '<path d="M4 19V8l8-5 8 5v11H4Z"/><path d="M8 19v-7h8v7M3 9l9-6 9 6"/>',
    surface: "attic", create,
  });
})();
