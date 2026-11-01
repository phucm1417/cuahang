(() => {
  "use strict";
  function createProgressStore({ key, storage = null, version = 2 }) {
    function getStorage() {
      try { return storage || window.localStorage; } catch { return null; }
    }
    function read() {
      try {
        const value = JSON.parse(getStorage()?.getItem(key) || "null");
        if (!value || typeof value !== "object" || Array.isArray(value)) return null;
        return { ...value, schemaVersion: Number(value.schemaVersion) || 1 };
      } catch {
        return null;
      }
    }
    function write(value) {
      try {
        const target = getStorage();
        if (!target) return false;
        target.setItem(key, JSON.stringify({ ...value, schemaVersion: version }));
        return true;
      } catch {
        return false;
      }
    }
    function clear() {
      try { const target = getStorage(); if (!target) return false; target.removeItem(key); return true; } catch { return false; }
    }
    return Object.freeze({ read, write, clear });
  }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.storage = Object.freeze({ createProgressStore });
})();
