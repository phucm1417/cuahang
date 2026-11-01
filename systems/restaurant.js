(() => {
  "use strict";
  function createDiningRoom({ getTableCount, getQueueLimit, occupiedTables }) {
    function tableCount() { const value = Number(getTableCount()); return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0; }
    function queueLimit() { const value = Number(getQueueLimit()); return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0; }
    function findFreeTable() {
      const openTables = tableCount();
      for (let index = 0; index < openTables; index += 1) {
        if (!occupiedTables.has(index)) return index;
      }
      return -1;
    }
    function reserve(tableIndex, guestId) {
      if (!Number.isInteger(tableIndex) || tableIndex < 0 || tableIndex >= tableCount() || !guestId || occupiedTables.has(tableIndex)) return false;
      occupiedTables.set(tableIndex, guestId);
      return true;
    }
    function release(tableIndex, guestId) {
      if (occupiedTables.get(tableIndex) !== guestId) return false;
      return occupiedTables.delete(tableIndex);
    }
    function queueGuest(queue, guest) {
      if (!Array.isArray(queue) || !guest || queue.length >= queueLimit()) return false;
      queue.push(guest);
      return true;
    }
    function takeNext(queue) { return Array.isArray(queue) && queue.length ? queue.shift() : null; }
    function capacity() { return tableCount() + queueLimit(); }
    return Object.freeze({ findFreeTable, reserve, release, queueGuest, takeNext, capacity });
  }
  window.TiemNhoSystems ||= {};
  window.TiemNhoSystems.restaurant = Object.freeze({ createDiningRoom });
})();
