(() => {
  "use strict";
  const definitions = new Map();
  window.TiemNhoMaps = Object.freeze({
    register(definition) {
      if (!definition?.id || definitions.has(definition.id)) throw new Error(`Map không hợp lệ: ${definition?.id}`);
      definitions.set(definition.id, Object.freeze(definition));
    },
    get(id) { return definitions.get(id); },
    list() { return [...definitions.keys()]; },
  });
})();
