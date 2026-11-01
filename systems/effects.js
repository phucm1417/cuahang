(() => {
  "use strict";
  const colors = Object.freeze({ coin: ["#f4ca63", "#fff0a8", "#d99a3d"], food: ["#f3a77e", "#fff0c2", "#91ad76"], leaf: ["#9bbd78", "#f0d778", "#fff2cf"], upgrade: ["#f6d36f", "#fff7cf", "#b6ca91"] });
  function createEffects(layer, scene) {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || false;
    function burstAt(target, kind = "coin") {
      if (!target?.isConnected || !layer?.isConnected || !scene?.isConnected || reducedMotion) return;
      const sceneRect = scene.getBoundingClientRect();
      if (!sceneRect.width || !sceneRect.height) return;
      const rect = target.getBoundingClientRect();
      const x = ((rect.left + rect.width / 2 - sceneRect.left) / sceneRect.width) * 100;
      const y = ((rect.top + rect.height / 2 - sceneRect.top) / sceneRect.height) * 100;
      if (x < -2 || x > 102 || y < -2 || y > 102) { pulse(target); return; }
      const palette = colors[kind] || colors.coin;
      const count = kind === "upgrade" ? 12 : 8;
      const fragment = document.createDocumentFragment();
      const particles = [];
      for (let index = 0; index < count; index += 1) {
        const particle = document.createElement("i");
        const angle = (Math.PI * 2 * index) / count + Math.random() * 0.28;
        const distance = 18 + Math.random() * 26;
        particle.className = `effect-particle effect-particle--${kind}`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.setProperty("--fx-x", `${Math.cos(angle) * distance}px`);
        particle.style.setProperty("--fx-y", `${Math.sin(angle) * distance - 10}px`);
        particle.style.setProperty("--fx-color", palette[index % palette.length]);
        particle.style.setProperty("--fx-delay", `${Math.random() * 70}ms`);
        fragment.append(particle);
        particles.push(particle);
      }
      layer.append(fragment);
      window.setTimeout(() => particles.forEach((particle) => particle.remove()), 900);
    }
    function pulse(target, kind = "success") {
      if (!target?.isConnected || reducedMotion) return;
      const className = `is-fx-${kind}`;
      target.classList.remove(className);
      void target.offsetWidth;
      target.classList.add(className);
      window.setTimeout(() => target.classList.remove(className), 520);
    }
    return Object.freeze({ burstAt, pulse });
  }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.effects = Object.freeze({ create: createEffects });
})();
