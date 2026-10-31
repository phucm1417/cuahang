(() => {
  "use strict";

  const STORAGE_KEY = "tiem-nho-save-v1";
  const MAP_ORDER = window.TiemNhoMaps.list();
  const guestSprites = ["Idle_2", "Idle_3", "Idle_4", "Idle_5", "Idle_6", "Idle_7", "Idle_8", "Idle_9", "Idle_10", "Idle_12"];
  const menu = [
    { name: "Súp nấm", icon: "🍲", sprite: "./assets/sprite-library/food/mushroom-soup.svg", price: 16 },
    { name: "Mì rau củ", icon: "🍜", sprite: "./assets/sprite-library/food/garden-noodles.svg", price: 20 },
    { name: "Bánh táo", icon: "🥧", sprite: "./assets/sprite-library/food/apple-pie.svg", price: 24 },
    { name: "Trà mật ong", icon: "🫖", sprite: "./assets/sprite-library/food/honey-tea.svg", price: 18 },
    { name: "Cơm trắng", sprite: "./restaurant-sprites/large/com_trang.png", price: 18 },
    { name: "Trứng ốp la", sprite: "./restaurant-sprites/large/trung_op_la.png", price: 18 },
    { name: "Đậu hũ sốt cà", sprite: "./restaurant-sprites/large/dau_hu_sot_ca.png", price: 18 },
    { name: "Canh rau", sprite: "./restaurant-sprites/large/canh_rau.png", price: 18 },
    { name: "Dưa leo", sprite: "./restaurant-sprites/large/dua_leo.png", price: 18 },
    { name: "Bánh bao", sprite: "./restaurant-sprites/large/banh_bao.png", price: 18 },
    { name: "Bánh mì", sprite: "./restaurant-sprites/large/banh_mi.png", price: 18 },
    { name: "Bánh xèo", sprite: "./restaurant-sprites/large/banh_xeo.png", price: 18 },
    { name: "Phở bò", sprite: "./restaurant-sprites/large/pho_bo.png", price: 18 },
    { name: "Chè", sprite: "./restaurant-sprites/large/che.png", price: 18 },
    { name: "Cà phê sữa đá", sprite: "./restaurant-sprites/large/ca_phe.png", price: 18 },
    { name: "Dưa hấu", sprite: "./restaurant-sprites/large/dua_hau.png", price: 18 },
    { name: "Bánh flan", sprite: "./restaurant-sprites/large/banh_flan.png", price: 18 },
    { name: "Xôi xéo", sprite: "./restaurant-sprites/large/xoi_xeo.png", price: 18 },
    { name: "Xôi gấc", sprite: "./restaurant-sprites/large/xoi_gac.png", price: 18 },
    { name: "Bún bò Huế", sprite: "./restaurant-sprites/large/bun_bo_hue.png", price: 18 },
    { name: "Bún riêu", sprite: "./restaurant-sprites/large/bun_rieu.png", price: 18 },
    { name: "Bún chả", sprite: "./restaurant-sprites/large/bun_cha.png", price: 18 },
    { name: "Mì Quảng", sprite: "./restaurant-sprites/large/mi_quang.png", price: 18 },
    { name: "Cơm tấm", sprite: "./restaurant-sprites/large/com_tam.png", price: 18 },
    { name: "Gỏi cuốn", sprite: "./restaurant-sprites/large/goi_cuon.png", price: 18 },
    { name: "Chả giò", sprite: "./restaurant-sprites/large/cha_gio.png", price: 18 },
    { name: "Bánh cuốn", sprite: "./restaurant-sprites/large/banh_cuon.png", price: 18 },
    { name: "Bánh canh", sprite: "./restaurant-sprites/large/banh_canh.png", price: 18 },
    { name: "Hủ tiếu", sprite: "./restaurant-sprites/large/hu_tieu.png", price: 18 },
    { name: "Lẩu", sprite: "./restaurant-sprites/large/lau.png", price: 18 },
    { name: "Cá kho tộ", sprite: "./restaurant-sprites/large/ca_kho.png", price: 18 },
    { name: "Thịt kho trứng", sprite: "./restaurant-sprites/large/thit_kho_trung.png", price: 18 },
    { name: "Gà nướng", sprite: "./restaurant-sprites/large/ga_nuong.png", price: 18 },
    { name: "Sườn nướng", sprite: "./restaurant-sprites/large/suon_nuong.png", price: 18 },
    { name: "Bò lúc lắc", sprite: "./restaurant-sprites/large/bo_luc_lac.png", price: 18 },
    { name: "Mực xào", sprite: "./restaurant-sprites/large/muc_xao.png", price: 18 },
    { name: "Tôm rang", sprite: "./restaurant-sprites/large/tom_rang.png", price: 18 },
    { name: "Cá chiên", sprite: "./restaurant-sprites/large/ca_chien.png", price: 18 },
    { name: "Nem nướng", sprite: "./restaurant-sprites/large/nem_nuong.png", price: 18 },
    { name: "Bò bía", sprite: "./restaurant-sprites/large/bo_bia.png", price: 18 },
    { name: "Bánh tráng trộn", sprite: "./restaurant-sprites/large/banh_trang_tron.png", price: 18 },
    { name: "Sinh tố bơ", sprite: "./restaurant-sprites/large/sinh_to_bo.png", price: 18 },
    { name: "Sinh tố xoài", sprite: "./restaurant-sprites/large/sinh_to_xoai.png", price: 18 },
    { name: "Nước cam", sprite: "./restaurant-sprites/large/nuoc_cam.png", price: 18 },
    { name: "Trà đào", sprite: "./restaurant-sprites/large/tra_dao.png", price: 18 },
    { name: "Trà sữa trân châu", sprite: "./restaurant-sprites/large/tra_sua.png", price: 18 },
    { name: "Nước dừa", sprite: "./restaurant-sprites/large/nuoc_dua.png", price: 18 },
    { name: "Sữa đậu nành", sprite: "./restaurant-sprites/large/sua_dau_nanh.png", price: 18 },
    { name: "Bia", sprite: "./restaurant-sprites/large/bia.png", price: 18 },
    { name: "Trà đá", sprite: "./restaurant-sprites/large/tra_da.png", price: 18 },
    { name: "Kem dừa", sprite: "./restaurant-sprites/large/kem_dua.png", price: 18 },
    { name: "Bánh da lợn", sprite: "./restaurant-sprites/large/banh_da_lon.png", price: 18 },
    { name: "Bánh chuối", sprite: "./restaurant-sprites/large/banh_chuoi.png", price: 18 },
    { name: "Khoai lang", sprite: "./restaurant-sprites/large/khoai_lang.png", price: 18 },
    { name: "Bắp nướng", sprite: "./restaurant-sprites/large/bap_nuong.png", price: 18 },
  ];
  const baseChancePerTap = 25;
  const maxChanceLevel = 5;
  const maxReputationLevel = 10;
  const menuUnlockBaseCost = 30;
  const menuUnlockGrowth = 1.28;
  const menuSaleGrowth = 1.75;
  const lockedDishRequestChance = 0.1;
  const positiveMoodChance = 0.25;
  const positiveMoods = ["love", "happy", "joy"];
  const hallFurnitureNames = ["quầy thu ngân", "hũ tiền tip", "bàn trà", "chậu cây bên trái", "chậu cây bên phải", "thảm sảnh", "cửa sổ sảnh"];
  const kitchenFurnitureNames = ["cửa sổ bếp", "tủ bếp treo", "kệ nguyên liệu", "giá treo dụng cụ", "bàn sơ chế", "tủ lạnh", "thùng rác", "thảm chống trượt"];
  const negativeMoods = ["angry", "confused"];
  const emotionArt = {
    love: '<path d="M16 26C8 20 4 16 4 11.5 4 8 6.5 6 9.5 6c2.7 0 5.1 1.6 6.5 4 1.4-2.4 3.8-4 6.5-4 3 0 5.5 2 5.5 5.5C28 16 24 20 16 26Z" fill="#f4b3b0" stroke="#6b5636" stroke-width="2" stroke-linejoin="round"/><path d="M9 11q1.5-1.8 3.5-2" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/>',
    happy: '<circle cx="16" cy="16" r="11.5" fill="#ffe08a" stroke="#6b5636" stroke-width="2"/><path d="M10 14q1.5-2 3 0m6 0q1.5-2 3 0M11 19q5 4.5 10 0" stroke="#6b5636" stroke-width="2" fill="none" stroke-linecap="round"/><ellipse cx="8.5" cy="18" rx="1.8" ry="1.2" fill="#f19b8c"/><ellipse cx="23.5" cy="18" rx="1.8" ry="1.2" fill="#f19b8c"/>',
    joy: '<g stroke="#6b5636" stroke-width="1.8" stroke-linejoin="round"><ellipse cx="16" cy="9.5" rx="3.8" ry="4.8" fill="#ffc4b8"/><ellipse cx="22.5" cy="13.5" rx="4.8" ry="3.8" fill="#ffc4b8"/><ellipse cx="19.5" cy="21" rx="3.8" ry="4.8" fill="#ffc4b8"/><ellipse cx="12.5" cy="21" rx="3.8" ry="4.8" fill="#ffc4b8"/><ellipse cx="9.5" cy="13.5" rx="4.8" ry="3.8" fill="#ffc4b8"/></g><circle cx="16" cy="16" r="3.6" fill="#ffd45c" stroke="#6b5636" stroke-width="1.8"/>',
    angry: '<path d="M7 17C4 14 6 9 10 9.5 11 6 16 5 18 7.5 21 6 25 8.5 24.5 12 27.5 13.5 27 18 24 18.5 24.5 22 20 24 18 22 15 24.5 10 23.5 10 20 7.5 20.5 6 19 7 17Z" fill="#f7d0c4" stroke="#6b5636" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 12 14 13.5M22 12 18 13.5" stroke="#6b5636" stroke-width="2" stroke-linecap="round"/><circle cx="12.5" cy="16.5" r="1.4" fill="#6b5636"/><circle cx="19.5" cy="16.5" r="1.4" fill="#6b5636"/><path d="M12.5 21Q16 19.5 19.5 21" stroke="#6b5636" stroke-width="1.8" fill="none" stroke-linecap="round"/>',
    confused: '<text x="13" y="22" text-anchor="middle" font-size="20" font-weight="bold" font-family="Georgia,serif" fill="#8fb3d9" stroke="#6b5636" stroke-width="1" paint-order="stroke">?</text><path d="M25 7c-1.5 2.5-2.2 3.8-2.2 5a2.2 2.2 0 0 0 4.4 0c0-1.2-.7-2.5-2.2-5Z" fill="#a9d1ee" stroke="#6b5636" stroke-width="1.4" stroke-linejoin="round"/>',
  };

  const el = {
    money: document.querySelector("#money-value"),
    reputation: document.querySelector("#reputation-value"),
    roomScene: document.querySelector("#room-scene"),
    wallPropsLayer: document.querySelector("#wall-props-layer"),
    floorPropsLayer: document.querySelector("#floor-props-layer"),
    mapPlacementZones: document.querySelector("#map-placement-zones"),
    wallPlacementZone: document.querySelector("#wall-placement-zone"),
    floorPlacementZone: document.querySelector("#floor-placement-zone"),
    gardenMapLayer: document.querySelector("#garden-map-layer"),
    atticMapLayer: document.querySelector("#attic-map-layer"),
    menuOpen: document.querySelector("#menu-open"),
    menuPanel: document.querySelector("#menu-panel"),
    menuClose: document.querySelector("#menu-close"),
    menuList: document.querySelector("#menu-list"),
    entryDoor: document.querySelector("#entry-door"),
    invite: document.querySelector("#invite-button"),
    invitePercent: document.querySelector("#invite-percent"),
    inviteSuccess: document.querySelector("#invite-success"),
    upgradeOpen: document.querySelector("#upgrade-open"),
    upgradePanel: document.querySelector("#upgrade-panel"),
    upgradeClose: document.querySelector("#upgrade-close"),
    chanceUpgrade: document.querySelector("#upgrade-chance"),
    chanceCost: document.querySelector("#chance-cost"),
    chanceDetail: document.querySelector("#chance-detail"),
    chanceLevel: document.querySelector("#chance-level"),
    reputationUpgrade: document.querySelector("#upgrade-reputation"),
    reputationCost: document.querySelector("#reputation-cost"),
    reputationDetail: document.querySelector("#reputation-detail"),
    reputationLevel: document.querySelector("#reputation-level"),
    queueUpgrade: document.querySelector("#upgrade-queue"),
    queueCost: document.querySelector("#queue-cost"),
    queueDetail: document.querySelector("#queue-detail"),
    queueLevel: document.querySelector("#queue-level"),
    restaurantUpgrades: document.querySelector("#restaurant-upgrades"),
    kitchenUpgrades: document.querySelector("#kitchen-upgrades"),
    kitchenStoveUpgrade: document.querySelector("#upgrade-kitchen-stoves"),
    kitchenStoveDetail: document.querySelector("#kitchen-stove-detail"),
    kitchenStoveLevel: document.querySelector("#kitchen-stove-level"),
    kitchenStoveCost: document.querySelector("#kitchen-stove-cost"),
    kitchenCookUpgrade: document.querySelector("#upgrade-kitchen-cook"),
    kitchenCookDetail: document.querySelector("#kitchen-cook-detail"),
    kitchenCookLevel: document.querySelector("#kitchen-cook-level"),
    kitchenCookCost: document.querySelector("#kitchen-cook-cost"),
    kitchenChefUpgrade: document.querySelector("#upgrade-kitchen-chef"),
    kitchenChefDetail: document.querySelector("#kitchen-chef-detail"),
    kitchenChefLevel: document.querySelector("#kitchen-chef-level"),
    kitchenChefCost: document.querySelector("#kitchen-chef-cost"),
    hallInteriorUpgrade: document.querySelector("#upgrade-hall-interior"),
    hallInteriorDetail: document.querySelector("#hall-interior-detail"),
    hallInteriorLevel: document.querySelector("#hall-interior-level"),
    hallInteriorCost: document.querySelector("#hall-interior-cost"),
    kitchenInteriorUpgrade: document.querySelector("#upgrade-kitchen-interior"),
    kitchenInteriorDetail: document.querySelector("#kitchen-interior-detail"),
    kitchenInteriorLevel: document.querySelector("#kitchen-interior-level"),
    kitchenInteriorCost: document.querySelector("#kitchen-interior-cost"),
    gardenUpgrades: document.querySelector("#garden-upgrades"),
    gardenUpgrade: document.querySelector("#upgrade-garden-plots"),
    gardenUpgradeDetail: document.querySelector("#garden-upgrade-detail"),
    gardenUpgradeLevel: document.querySelector("#garden-upgrade-level"),
    gardenUpgradeCost: document.querySelector("#garden-upgrade-cost"),
    atticUpgrades: document.querySelector("#attic-upgrades"),
    atticUpgrade: document.querySelector("#upgrade-attic-leisure"),
    atticUpgradeDetail: document.querySelector("#attic-upgrade-detail"),
    atticUpgradeLevel: document.querySelector("#attic-upgrade-level"),
    atticUpgradeCost: document.querySelector("#attic-upgrade-cost"),
    tableLayer: document.querySelector("#table-layer"),
    chairLayer: document.querySelector("#chair-layer"),
    kitchenLayer: document.querySelector("#kitchen-layer"),
    cookingLayer: document.querySelector("#cooking-layer"),
    kitchenFoodCounter: document.querySelector("#kitchen-food-counter"),
    kitchenFoodSlots: document.querySelector("#kitchen-food-slots"),
    hallFoodCounter: document.querySelector("#hall-food-counter"),
    hallFoodSlots: document.querySelector("#hall-food-slots"),
    mapToggle: document.querySelector("#map-toggle"),
    mapToggleIcon: document.querySelector("#map-toggle-icon"),
    guestLayer: document.querySelector("#guest-layer"),
    orderLayer: document.querySelector("#order-layer"),
    waitingQueue: document.querySelector("#waiting-queue"),
    paymentLayer: document.querySelector("#payment-layer"),
    staff: document.querySelector("#staff"),
    staffCarry: document.querySelector("#staff-carry"),
    chef: document.querySelector("#chef"),
    chefCarry: document.querySelector("#chef-carry"),
    sound: document.querySelector("#sound-toggle"),
    saveStatus: document.querySelector("#save-status"),
    testMoneyAmount: document.querySelector("#test-money-amount"),
    testAddMoney: document.querySelector("#test-add-money"),
    testResetGame: document.querySelector("#test-reset-game"),
  };

  const state = {
    money: 0,
    reputationPoints: 100,
    chanceLevel: 0,
    reputationLevel: 1,
    queueLevel: 0,
    kitchenStoveLevel: 0,
    kitchenCookLevel: 0,
    kitchenChefSpeedLevel: 0,
    hallInteriorLevel: 0,
    kitchenInteriorLevel: 0,
    unlockedMenuCount: 1,
    gardenData: null,
    atticData: null,
    inviteProgress: 0,
    guests: new Map(),
    waitingQueue: [],
    queueMarkers: new Map(),
    pendingPayments: new Map(),
    paymentButtons: new Map(),
    entryDoorTransitCount: 0,
    servingGuest: null,
    staffTaskQueue: [],
    chefTaskQueue: [],
    kitchenFoodQueue: [],
    diningFoodQueue: [],
    chefWorking: false,
    moneyPickupInProgress: false,
    pendingCoins: 0,
    tableSeats: [],
    occupiedTables: new Map(),
    scenePropObstacles: [],
    layoutName: "desktop",
    mapMode: "restaurant",
    muted: false,
    timers: new Set(),
  };
  const staffMotion = {
    x: 53,
    y: 31,
    path: [],
    pathIndex: 0,
    mode: "wandering",
    pauseUntil: 0,
    lastFrame: 0,
    facing: "south",
    onArrive: null,
    destination: null,
  };
  const staffGrid = { step: 4, xs: [], ys: [], nodes: [] };
  const STAFF_SPEED = 92;
  const CHEF_SPEED_MULTIPLIER = 1.7;
  const MONEY_PICKUP_SPEED_MULTIPLIER = 1.8;
  const chefMotion = { x: 82, y: 57, facing: "south" };
  let chefWanderPauseUntil = 0;
  let foodDragState = null;
  let mapControllers = {};

  function loadProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!saved) return;
      state.money = Math.max(0, Math.floor(Number(saved.money) || 0));
      const savedReputationPoints = Number(saved.reputationPoints);
      if (Number.isFinite(savedReputationPoints)) {
        state.reputationPoints = Math.max(0, savedReputationPoints);
      }
      state.chanceLevel = Math.min(maxChanceLevel, Math.max(0, Math.floor(Number(saved.chanceLevel) || 0)));
      state.reputationLevel = Math.min(maxReputationLevel, Math.max(1, Math.floor(Number(saved.reputationLevel) || 1)));
      state.queueLevel = Math.max(0, Math.floor(Number(saved.queueLevel) || 0));
      state.kitchenStoveLevel = Math.min(5, Math.max(0, Math.floor(Number(saved.kitchenStoveLevel) || 0)));
      state.kitchenCookLevel = Math.min(10, Math.max(0, Math.floor(Number(saved.kitchenCookLevel) || 0)));
      state.kitchenChefSpeedLevel = Math.min(10, Math.max(0, Math.floor(Number(saved.kitchenChefSpeedLevel) || 0)));
      state.hallInteriorLevel = Math.min(7, Math.max(0, Math.floor(Number(saved.hallInteriorLevel) || 0)));
      state.kitchenInteriorLevel = Math.min(8, Math.max(0, Math.floor(Number(saved.kitchenInteriorLevel) || 0)));
      state.unlockedMenuCount = Math.min(menu.length, Math.max(1, Math.floor(Number(saved.unlockedMenuCount) || 1)));
      state.gardenData = saved.gardenData || null;
      state.atticData = saved.atticData || null;
    } catch {
      // The game remains playable when browser storage is unavailable or malformed.
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        money: state.money,
        reputationPoints: state.reputationPoints,
        chanceLevel: state.chanceLevel,
        reputationLevel: state.reputationLevel,
        queueLevel: state.queueLevel,
        kitchenStoveLevel: state.kitchenStoveLevel,
        kitchenCookLevel: state.kitchenCookLevel,
        kitchenChefSpeedLevel: state.kitchenChefSpeedLevel,
        hallInteriorLevel: state.hallInteriorLevel,
        kitchenInteriorLevel: state.kitchenInteriorLevel,
        unlockedMenuCount: state.unlockedMenuCount,
        gardenData: mapControllers.garden?.serialize?.() || state.gardenData,
        atticData: mapControllers.attic?.serialize?.() || state.atticData,
      }));
      el.saveStatus.innerHTML = '<span class="save-check" aria-hidden="true">✓</span> Tiến độ được lưu tự động';
    } catch {
      el.saveStatus.innerHTML = '<span class="save-check" aria-hidden="true">✓</span> Có thể tiếp tục chơi trên trang này';
    }
  }

  function initializeMapControllers() {
    const context = {
      spend(amount) {
        if (state.money < amount) return false;
        state.money -= amount;
        render();
        saveProgress();
        return true;
      },
      reward(amount, reputation) {
        state.money += amount;
        state.reputationPoints += reputation;
        render();
        saveProgress();
      },
      onChange() { render(); saveProgress(); },
      playSound: chime,
      getLayout: () => state.layoutName,
    };
    mapControllers.garden = window.TiemNhoMaps.get("garden").create(el.gardenMapLayer, context, state.gardenData || {});
    mapControllers.attic = window.TiemNhoMaps.get("attic").create(el.atticMapLayer, context, state.atticData || {});
  }

  function coins(value) {
    return Math.floor(value).toLocaleString("vi-VN");
  }

  function chanceCost() { return 15 + state.chanceLevel * 20; }
  function reputationCost() { return 35 + (state.reputationLevel - 1) * 45; }
  function queueCost() { return 500 * 2 ** state.queueLevel; }
  function kitchenStoveCost() { return 400 * 2 ** state.kitchenStoveLevel; }
  function kitchenCookCost() { return 300 * 2 ** state.kitchenCookLevel; }
  function kitchenChefCost() { return 350 * 2 ** state.kitchenChefSpeedLevel; }
  function interiorCost(level) { return 500 * 2 ** level; }
  function kitchenStoveCount() { return 1 + state.kitchenStoveLevel; }
  function kitchenCookDuration() { return Math.max(550, Math.round(1450 * 0.88 ** state.kitchenCookLevel)); }
  function chancePerTap() { return Math.min(50, baseChancePerTap + state.chanceLevel * 5); }
  function priceMultiplier() {
    return 1 + (state.reputationLevel - 1) * 0.1
      + (state.hallInteriorLevel + state.kitchenInteriorLevel) * 0.05;
  }
  function menuUnlockCost(index) { return Math.ceil((menuUnlockBaseCost * menuUnlockGrowth ** (index - 1)) / 5) * 5; }
  function menuBaseSalePrice(index) {
    if (index <= 0) return menu[0].price;
    const exponentialPrice = menu[0].price * menuSaleGrowth ** index;
    const menuEntryDiscount = menuUnlockCost(index) * 0.3;
    return Math.max(menuBaseSalePrice(index - 1) + 1, Math.round(exponentialPrice - menuEntryDiscount));
  }
  function menuSalePrice(index) { return Math.round(menuBaseSalePrice(index) * priceMultiplier()); }
  function reputationLabel() {
    return Number(state.reputationPoints.toFixed(1)).toLocaleString("vi-VN", { maximumFractionDigits: 1 });
  }
  function guestSalePrice(guest) {
    return guest.dishIndex >= 0
      ? menuSalePrice(guest.dishIndex)
      : Math.round(guest.dish.price * priceMultiplier());
  }
  function unlockedTableCount() { return Math.min(6, state.reputationLevel); }
  function waitingQueueLimit() { return 2 + state.queueLevel; }
  function findFreeTable() {
    for (let index = 0; index < unlockedTableCount(); index += 1) {
      if (!state.occupiedTables.has(index)) return index;
    }
    return -1;
  }
  function guestCapacity() { return unlockedTableCount() + waitingQueueLimit(); }

  function purchaseMenuItem(index) {
    if (index !== state.unlockedMenuCount || index >= menu.length) return;
    const cost = menuUnlockCost(index);
    if (state.money < cost) return;
    state.money -= cost;
    state.unlockedMenuCount += 1;
    render();
    saveProgress();
    chime("coin");
  }

  function renderMenu() {
    const fragment = document.createDocumentFragment();
    menu.forEach((item, index) => {
      const isUnlocked = index < state.unlockedMenuCount;
      const canPurchase = index === state.unlockedMenuCount;
      const row = document.createElement("button");
      row.type = "button";
      row.className = "menu-item";
      if (!isUnlocked) row.classList.add("is-locked");
      const image = document.createElement("img");
      image.className = "menu-food";
      image.src = item.sprite;
      image.alt = "";
      const name = document.createElement("span");
      name.className = "menu-name";
      name.textContent = item.name;
      row.append(image, name);
      if (isUnlocked) {
        const price = document.createElement("strong");
        price.className = "menu-sale-price";
        price.textContent = `Bán ${coins(menuSalePrice(index))} xu`;
        row.append(price);
      } else {
        const prices = document.createElement("span");
        prices.className = "menu-prices";
        const salePreview = document.createElement("span");
        salePreview.className = "menu-sale-preview";
        salePreview.textContent = `Bán ${coins(menuSalePrice(index))} xu`;
        const buy = document.createElement("span");
        buy.className = "menu-buy";
        buy.innerHTML = `<span aria-hidden="true">＋</span> Mở ${coins(menuUnlockCost(index))} xu`;
        prices.append(salePreview, buy);
        row.append(prices);
        row.disabled = !canPurchase || state.money < menuUnlockCost(index);
        row.setAttribute("aria-label", canPurchase
          ? `Mở khóa ${item.name} với giá ${coins(menuUnlockCost(index))} xu`
          : `${item.name} chưa thể mở khóa`);
        row.addEventListener("click", () => purchaseMenuItem(index));
      }
      fragment.append(row);
    });
    el.menuList.replaceChildren(fragment);
  }

  function syncPanelLayout() {
    const menuOpen = el.menuPanel.open;
    const upgradesOpen = el.upgradePanel.open;
    document.body.classList.toggle("panel-menu-open", menuOpen);
    document.body.classList.toggle("panel-upgrade-open", upgradesOpen);
    document.body.classList.toggle("panel-both-open", menuOpen && upgradesOpen);
    el.mapPlacementZones.hidden = !upgradesOpen || !["restaurant", "kitchen"].includes(state.mapMode);
  }

  function getMapGeometry() {
    const kitchen = state.mapMode === "kitchen";
    if (state.layoutName === "portrait") {
      return kitchen
        ? { width: 720, height: 1600, wall: { x: 42, y: 42, width: 636, height: 378 }, floor: { x: 42, y: 420, width: 636, height: 1124 } }
        : { width: 720, height: 1600, wall: { x: 42, y: 42, width: 636, height: 344 }, floor: { x: 42, y: 386, width: 636, height: 1158 } };
    }
    if (state.layoutName === "mobile") {
      return kitchen
        ? { width: 1024, height: 1024, wall: { x: 42, y: 30, width: 940, height: 230 }, floor: { x: 42, y: 260, width: 940, height: 710 } }
        : { width: 1024, height: 1024, wall: { x: 42, y: 30, width: 940, height: 215 }, floor: { x: 42, y: 245, width: 940, height: 725 } };
    }
    return kitchen
      ? { width: 1800, height: 1000, wall: { x: 54, y: 44, width: 1692, height: 208 }, floor: { x: 96, y: 250, width: 1608, height: 632 } }
      : { width: 1800, height: 1000, wall: { x: 54, y: 44, width: 1692, height: 206 }, floor: { x: 96, y: 247, width: 1608, height: 632 } };
  }

  function placementZoneStyle(element, region, geometry) {
    element.style.left = `${region.x / geometry.width * 100}%`;
    element.style.top = `${region.y / geometry.height * 100}%`;
    element.style.width = `${region.width / geometry.width * 100}%`;
    element.style.height = `${region.height / geometry.height * 100}%`;
  }

  function renderPlacementZones(geometry) {
    placementZoneStyle(el.wallPlacementZone, geometry.wall, geometry);
    placementZoneStyle(el.floorPlacementZone, geometry.floor, geometry);
  }

  function applyMapBackground() {
    const definition = window.TiemNhoMaps.get(state.mapMode) || window.TiemNhoMaps.get("restaurant");
    const source = state.layoutName === "portrait"
      ? definition.portraitBackground
      : state.layoutName === "mobile"
        ? definition.mobileBackground || definition.wideBackground
        : definition.wideBackground;
    if (source) el.roomScene.style.backgroundImage = `url("${source}")`;
  }

  function renderMapMode() {
    const definition = window.TiemNhoMaps.get(state.mapMode) || window.TiemNhoMaps.get("restaurant");
    const inKitchen = state.mapMode === "kitchen";
    const inGarden = state.mapMode === "garden";
    const inAttic = state.mapMode === "attic";
    el.roomScene.classList.toggle("is-kitchen", inKitchen);
    el.roomScene.classList.toggle("is-garden", inGarden);
    el.roomScene.classList.toggle("is-attic", inAttic);
    applyMapBackground();
    el.gardenMapLayer.hidden = !inGarden;
    el.atticMapLayer.hidden = !inAttic;
    mapControllers.garden?.setActive(inGarden);
    mapControllers.attic?.setActive(inAttic);
    mapControllers.garden?.setLayout(state.layoutName);
    mapControllers.attic?.setLayout(state.layoutName);
    renderPlacementZones(getMapGeometry());
    renderSceneProps();
    rebuildStaffGrid();
    el.restaurantUpgrades.hidden = state.mapMode !== "restaurant";
    el.kitchenUpgrades.hidden = !inKitchen;
    el.gardenUpgrades.hidden = !inGarden;
    el.atticUpgrades.hidden = !inAttic;
    el.staff.querySelector("img").src = spriteUrl("Idle_5", staffMotion.facing);
    el.chef.querySelector("img").src = spriteUrl("Idle", chefMotion.facing);
    el.chef.classList.add("is-visible");
    const nextMap = MAP_ORDER[(MAP_ORDER.indexOf(state.mapMode) + 1) % MAP_ORDER.length];
    const nextDefinition = window.TiemNhoMaps.get(nextMap);
    el.mapToggle.removeAttribute("aria-pressed");
    el.mapToggle.setAttribute("aria-label", `Đến ${nextDefinition.name}`);
    el.mapToggleIcon.innerHTML = nextDefinition.icon;
    el.invite.setAttribute("aria-label", inGarden ? "Đón khách đến vườn" : inAttic ? "Đón khách lên tầng gác" : "Mời khách");
    if (el.upgradePanel.open) syncPanelLayout();
  }

  function renderSceneProps() {
    if (!el.wallPropsLayer || !el.floorPropsLayer) return;
    const portrait = state.layoutName === "portrait";
    const mobile = state.layoutName === "mobile";
    const tableWidth = mobile ? 0.32 : 0.21;
    const geometry = getMapGeometry();
    const definition = window.TiemNhoMaps.get(state.mapMode);
    const props = definition?.furniture?.({
      portrait,
      mobile,
      tableWidth,
      sceneAspect: el.roomScene.clientWidth / Math.max(1, el.roomScene.clientHeight),
    }) || [];
    const level = state.mapMode === "kitchen" ? state.kitchenInteriorLevel : state.hallInteriorLevel;
    const visibleProps = props.slice(0, level);
    const wallElements = [];
    const floorElements = [];
    state.scenePropObstacles = [];
    visibleProps.forEach((prop) => {
      const zone = geometry[prop.surface];
      const widthInMap = prop.width * geometry.width;
      const heightInMap = widthInMap / prop.aspect;
      const centerX = prop.x * geometry.width;
      const anchorY = prop.y * geometry.height;
      const fitsAcrossMap = centerX - widthInMap / 2 >= zone.x
        && centerX + widthInMap / 2 <= zone.x + zone.width;
      const fitsOnSurface = prop.surface === "wall"
        ? anchorY - heightInMap / 2 >= zone.y && anchorY + heightInMap / 2 <= zone.y + zone.height
        : anchorY >= zone.y && anchorY <= zone.y + zone.height;
      if (!fitsAcrossMap || !fitsOnSurface) return;
      const element = document.createElement("div");
      element.className = `scene-prop scene-prop--${prop.surface}${prop.anchor === "bottom" ? " is-floor-anchored" : ""}`;
      element.setAttribute("aria-label", prop.name);
      element.classList.toggle("scene-prop--rug", prop.asset === "foyer-rug");
      const widthPercent = prop.width * 100;
      const heightPercent = widthPercent * (el.roomScene.clientWidth / Math.max(1, el.roomScene.clientHeight)) / prop.aspect;
      element.style.left = `${prop.x * 100}%`;
      element.style.top = `${prop.y * 100}%`;
      element.style.width = `${widthPercent}%`;
      element.style.height = `${heightPercent}%`;
      const image = document.createElement("img");
      image.src = `./assets/scene-props/${prop.asset}.svg`;
      image.alt = "";
      image.draggable = false;
      if (prop.flip) image.style.transform = "scaleX(-1)";
      element.append(image);
      (prop.surface === "wall" ? wallElements : floorElements).push(element);
      if (prop.blocks) {
        const top = prop.anchor === "bottom" ? prop.y * 100 - heightPercent : prop.y * 100 - heightPercent / 2;
        state.scenePropObstacles.push({
          left: prop.x * 100 - widthPercent / 2 - 1,
          right: prop.x * 100 + widthPercent / 2 + 1,
          top: top - 1,
          bottom: prop.anchor === "bottom" ? prop.y * 100 + 1 : top + heightPercent + 1,
        });
      }
    });
    el.wallPropsLayer.replaceChildren(...wallElements);
    el.floorPropsLayer.replaceChildren(...floorElements);
    renderPlacementZones(geometry);
  }

  function render() {
    el.money.textContent = coins(state.money);
    el.reputation.textContent = reputationLabel();
    el.invitePercent.textContent = `${Math.min(100, state.inviteProgress)}%`;
    el.invite.style.setProperty("--invite-fill", `${Math.min(100, state.inviteProgress)}%`);
    el.chanceDetail.textContent = state.chanceLevel >= maxChanceLevel
      ? "Đã đạt mức thu hút cao nhất"
      : `Tăng ${5}% tiến độ mời mỗi lần bấm`;
    el.chanceLevel.innerHTML = `Cấp ${state.chanceLevel} <span class="level-track"><i style="width:${state.chanceLevel / maxChanceLevel * 100}%"></i></span>`;
    el.chanceCost.textContent = state.chanceLevel >= maxChanceLevel ? "MAX" : coins(chanceCost());
    el.chanceUpgrade.disabled = state.chanceLevel >= maxChanceLevel || state.money < chanceCost();
    el.reputationDetail.textContent = state.reputationLevel >= maxReputationLevel
      ? "Giá món đã đạt mức tối đa"
      : state.reputationLevel < 6
        ? `+10% giá món · mở bàn ${state.reputationLevel + 1}`
        : `+${Math.round((priceMultiplier() - 1 + 0.1) * 100)}% giá món`;
    el.reputationLevel.innerHTML = `Cấp ${state.reputationLevel} <span class="level-track"><i style="width:${state.reputationLevel / maxReputationLevel * 100}%"></i></span>`;
    el.reputationCost.textContent = state.reputationLevel >= maxReputationLevel ? "MAX" : coins(reputationCost());
    el.reputationUpgrade.disabled = state.reputationLevel >= maxReputationLevel || state.money < reputationCost();
    el.queueDetail.textContent = `Hàng chờ tối đa ${waitingQueueLimit()} khách`;
    el.queueLevel.textContent = `Cấp ${state.queueLevel} · ${waitingQueueLimit()} chỗ`;
    el.queueCost.textContent = coins(queueCost());
    el.queueUpgrade.disabled = state.money < queueCost();
    el.kitchenStoveDetail.textContent = kitchenStoveCount() >= 6 ? "Đã mở đủ 6 vị trí nấu" : "Mở thêm một vị trí nấu";
    el.kitchenStoveLevel.textContent = `${kitchenStoveCount()} / 6 bếp`;
    el.kitchenStoveCost.textContent = kitchenStoveCount() >= 6 ? "MAX" : coins(kitchenStoveCost());
    el.kitchenStoveUpgrade.disabled = kitchenStoveCount() >= 6 || state.money < kitchenStoveCost();
    el.kitchenCookDetail.textContent = state.kitchenCookLevel >= 10 ? "Đã đạt tốc độ nấu tối đa" : `Thời gian nấu còn ${Number((kitchenCookDuration() / 1000).toFixed(1))} giây`;
    el.kitchenCookLevel.textContent = `Cấp ${state.kitchenCookLevel} / 10`;
    el.kitchenCookCost.textContent = state.kitchenCookLevel >= 10 ? "MAX" : coins(kitchenCookCost());
    el.kitchenCookUpgrade.disabled = state.kitchenCookLevel >= 10 || state.money < kitchenCookCost();
    el.kitchenChefDetail.textContent = state.kitchenChefSpeedLevel >= 10 ? "Đã đạt tốc độ tối đa" : `Tăng ${Math.round((state.kitchenChefSpeedLevel + 1) * 12)}% tốc độ di chuyển`;
    el.kitchenChefLevel.textContent = `Cấp ${state.kitchenChefSpeedLevel} / 10`;
    el.kitchenChefCost.textContent = state.kitchenChefSpeedLevel >= 10 ? "MAX" : coins(kitchenChefCost());
    el.kitchenChefUpgrade.disabled = state.kitchenChefSpeedLevel >= 10 || state.money < kitchenChefCost();
    const gardenUpgrade = mapControllers.garden?.renderUpgrade();
    if (gardenUpgrade) {
      el.gardenUpgradeDetail.textContent = gardenUpgrade.detail;
      el.gardenUpgradeLevel.textContent = `${4 + gardenUpgrade.level} / 6 luống`;
      el.gardenUpgradeCost.textContent = gardenUpgrade.cost === null ? "MAX" : coins(gardenUpgrade.cost);
      el.gardenUpgrade.disabled = gardenUpgrade.cost === null || state.money < gardenUpgrade.cost;
    }
    const atticUpgrade = mapControllers.attic?.renderUpgrade();
    if (atticUpgrade) {
      el.atticUpgradeDetail.textContent = atticUpgrade.detail;
      el.atticUpgradeLevel.textContent = `Cấp ${atticUpgrade.level} / ${atticUpgrade.max}`;
      el.atticUpgradeCost.textContent = atticUpgrade.cost === null ? "MAX" : coins(atticUpgrade.cost);
      el.atticUpgrade.disabled = atticUpgrade.cost === null || state.money < atticUpgrade.cost;
    }
    const hallNextFurniture = hallFurnitureNames[state.hallInteriorLevel];
    const hallInteriorBonus = state.hallInteriorLevel * 5;
    el.hallInteriorDetail.textContent = hallNextFurniture
      ? `Mở ${hallNextFurniture} · +5% giá bán`
      : "Đã mở toàn bộ nội thất sảnh";
    el.hallInteriorLevel.textContent = `${state.hallInteriorLevel} / ${hallFurnitureNames.length} · +${hallInteriorBonus}%`;
    el.hallInteriorCost.textContent = hallNextFurniture ? coins(interiorCost(state.hallInteriorLevel)) : "MAX";
    el.hallInteriorUpgrade.disabled = !hallNextFurniture || state.money < interiorCost(state.hallInteriorLevel);
    const kitchenNextFurniture = kitchenFurnitureNames[state.kitchenInteriorLevel];
    const kitchenInteriorBonus = state.kitchenInteriorLevel * 5;
    el.kitchenInteriorDetail.textContent = kitchenNextFurniture
      ? `Mở ${kitchenNextFurniture} · +5% giá bán`
      : "Đã mở toàn bộ nội thất bếp";
    el.kitchenInteriorLevel.textContent = `${state.kitchenInteriorLevel} / ${kitchenFurnitureNames.length} · +${kitchenInteriorBonus}%`;
    el.kitchenInteriorCost.textContent = kitchenNextFurniture ? coins(interiorCost(state.kitchenInteriorLevel)) : "MAX";
    el.kitchenInteriorUpgrade.disabled = !kitchenNextFurniture || state.money < interiorCost(state.kitchenInteriorLevel);
    renderMenu();
    const isDestinationMap = state.mapMode === "garden" || state.mapMode === "attic";
    el.invite.disabled = isDestinationMap
      ? !mapControllers[state.mapMode]?.canVisit()
      : state.guests.size + state.waitingQueue.length >= guestCapacity();
    const inviteLabel = state.mapMode === "garden" ? "Đón khách đến vườn"
      : state.mapMode === "attic" ? "Đón khách lên tầng gác" : "Mời khách";
    el.invite.setAttribute("aria-label", el.invite.disabled
      ? "Hiện không thể đón thêm khách"
      : `${inviteLabel}, tiến độ ${state.inviteProgress} phần trăm, mỗi lần bấm tăng ${chancePerTap()} phần trăm`);
    renderMoneyBubbles();
  }

  function getLayoutName() {
    if (!window.matchMedia("(max-width: 600px)").matches) return "desktop";
    return window.matchMedia("(orientation: portrait)").matches ? "portrait" : "mobile";
  }

  function getSeatLayout(name) {
    const portrait = name === "portrait";
    const mobile = name !== "desktop";
    const columns = mobile ? [7, 61] : [12, 40, 68];
    const rows = portrait ? [37, 50, 63] : mobile ? [25, 45, 65] : [35, 61];
    const width = mobile ? 32 : 21;
    const height = portrait ? 10.5 : mobile ? 22 : 24;
    const seats = [];
    rows.forEach((top) => columns.forEach((left) => {
      // Match the single centered chair in the table sprite on every layout.
      const seatX = left + width * 0.5;
      const seatY = top + height * 0.27;
      const serveX = left + width * 0.62;
      const serveY = top + height * 0.43;
      seats.push({
        left, top, width, height, seatX, seatY,
        serveX, serveY,
      });
    }));
    return seats;
  }

  function applyGuestPosition(guest) {
    const seat = state.tableSeats[guest.tableIndex];
    if (!seat || !guest.dom) return;
    guest.seat = seat;
    guest.dom.customer.style.setProperty("--seat-x", `${seat.seatX}%`);
    guest.dom.customer.style.setProperty("--seat-y", `${seat.seatY}%`);
    guest.dom.customer.style.left = `${seat.seatX}%`;
    guest.dom.customer.style.top = `${seat.seatY}%`;
    el.staff.style.setProperty("--serve-target-x", `${seat.serveX}%`);
    el.staff.style.setProperty("--serve-target-y", `${seat.serveY}%`);
    const actionLeft = seat.seatX;
    const actionTop = seat.seatY - (state.layoutName !== "desktop" ? 14 : 12);
    guest.dom.orderAction.style.left = `${actionLeft}%`;
    guest.dom.orderAction.style.top = `${actionTop}%`;
    guest.dom.dish.style.left = `${seat.left + seat.width * 0.5}%`;
    guest.dom.dish.style.top = `${seat.top + seat.height * 0.39}%`;
  }

  function renderWaitingQueue() {
    const activeIds = new Set(state.waitingQueue.map((guest) => guest.id));
    for (const [id, marker] of state.queueMarkers) {
      if (activeIds.has(id)) continue;
      marker.walkToken = (marker.walkToken || 0) + 1;
      if (marker.finishDoorTransit) marker.finishDoorTransit();
      marker.remove();
      state.queueMarkers.delete(id);
    }
    state.waitingQueue.forEach((guest, index) => {
      let marker = state.queueMarkers.get(guest.id);
      const target = {
        x: (state.layoutName === "portrait" ? 67 : state.layoutName === "mobile" ? 61 : 68)
          + index * (state.layoutName === "portrait" ? 13 : state.layoutName === "mobile" ? 14 : 9),
        y: state.layoutName === "portrait" ? 10 : state.layoutName === "mobile" ? 14 : 16,
      };
      if (!marker) {
        marker = document.createElement("div");
        marker.className = "waiting-guest is-walking";
        marker.dataset.spriteFolder = guest.spriteFolder;
        marker.setAttribute("role", "listitem");
        marker.setAttribute("aria-label", `Khách đang chờ số ${index + 1}`);
        marker.style.left = `${state.layoutName === "portrait" ? 67 : 50}%`;
        marker.style.top = `${state.layoutName === "portrait" ? 10 : 13}%`;
        const image = document.createElement("img");
        image.src = spriteUrl(guest.spriteFolder, directionBetween({ x: 50, y: 13 }, target));
        image.alt = "";
        image.draggable = false;
        marker.append(image);
        state.queueMarkers.set(guest.id, marker);
        el.waitingQueue.append(marker);
        const start = { x: 50, y: 13 };
        moveCharacter(marker, image, start, target, "west", null, "enter");
      } else {
        const previousX = parseFloat(marker.style.left);
        const previousY = parseFloat(marker.style.top);
        const image = marker.querySelector("img");
        if (Math.abs(previousX - target.x) > 0.1 || Math.abs(previousY - target.y) > 0.1) {
          const doorMode = isInsideEntryDoor({ x: previousX, y: previousY }) ? "enter" : "none";
          moveCharacter(marker, image, { x: previousX, y: previousY }, target, "west", null, doorMode);
        }
      }
      marker.setAttribute("aria-label", `Khách đang chờ số ${index + 1}`);
    });
    el.waitingQueue.hidden = state.waitingQueue.length === 0;
  }

  function renderMoneyBubbles() {
    for (const [tableIndex, button] of state.paymentButtons) {
      if (state.pendingPayments.has(tableIndex)) continue;
      button.remove();
      state.paymentButtons.delete(tableIndex);
    }
    state.pendingPayments.forEach((payment, tableIndex) => {
      let button = state.paymentButtons.get(tableIndex);
      if (!button) {
        button = document.createElement("button");
        button.className = "table-action money-action";
        button.type = "button";
        button.setAttribute("aria-label", "Nhặt tiền thanh toán");
        const coin = document.createElement("span");
        coin.className = "coin-icon";
        coin.setAttribute("aria-hidden", "true");
        const amount = document.createElement("strong");
        button.append(coin, amount);
        button.addEventListener("click", () => requestMoneyPickup(tableIndex));
        state.paymentButtons.set(tableIndex, button);
        el.paymentLayer.append(button);
      }
      const amount = button.querySelector("strong");
      const scale = 1 + Math.min(0.2, Math.log2(1 + payment.amount / 25) * 0.05);
      button.style.left = `${payment.anchor.x}%`;
      button.style.top = `${payment.anchor.y}%`;
      button.style.setProperty("--money-scale", scale.toFixed(3));
      amount.textContent = `${coins(payment.amount)} xu`;
      button.disabled = payment.requested;
      button.setAttribute("aria-label", payment.requested
        ? `Đang chờ nhân viên nhặt ${coins(payment.amount)} xu ở bàn ${tableIndex + 1}`
        : `Nhặt ${coins(payment.amount)} xu ở bàn ${tableIndex + 1}`);
    });
  }

  function renderFoodCounter(slotsElement, queue, label) {
    const fragment = document.createDocumentFragment();
    for (let slotIndex = 0; slotIndex < 6; slotIndex += 1) {
      const guest = queue[slotIndex];
      const slot = document.createElement("div");
      slot.className = `food-counter-slot${guest ? " is-occupied" : " is-empty"}`;
      if (guest) {
        const item = document.createElement("button");
        item.className = `food-counter-item${guest.phase === "waiter-picking-up" ? " is-claimed" : ""}`;
        item.type = "button";
        item.dataset.guestId = guest.id;
        item.setAttribute("aria-label", `${guest.dish.name}, món dành cho bàn ${guest.tableIndex + 1}`);
        const image = document.createElement("img");
        image.src = guest.dish.sprite;
        image.alt = "";
        image.draggable = false;
        item.append(image);
        item.addEventListener("pointerdown", (event) => beginFoodDrag(event, guest));
        item.addEventListener("click", (event) => {
          if (event.detail === 0 && guest.phase === "on-dining-counter") {
            cancelGuestDeliveryTimer(guest);
            guest.phase = "player-dragging";
            serveDishToGuest(guest);
          }
        });
        slot.append(item);
      }
      fragment.append(slot);
    }
    slotsElement.replaceChildren(fragment);
    slotsElement.parentElement.setAttribute("aria-label", `${label}: ${queue.length} trên 6 món`);
  }

  function renderFoodCounters() {
    renderFoodCounter(el.kitchenFoodSlots, state.kitchenFoodQueue, "Quầy bếp");
    renderFoodCounter(el.hallFoodSlots, state.diningFoodQueue, "Quầy sảnh");
  }

  function clearFoodDropTargets() {
    state.guests.forEach((guest) => {
      guest.dom?.dish?.classList.remove("is-drop-target", "is-drop-hover");
      guest.dom?.dish?.querySelector(".drop-target-icon")?.remove();
    });
  }

  function beginFoodDrag(event, guest) {
    if (event.button !== 0 || !state.guests.has(guest.id)
      || !["on-dining-counter", "queued-waiter-delivery", "waiter-picking-up"].includes(guest.phase)) return;
    event.preventDefault();
    chime("pickup");
    const previousPhase = guest.phase;
    cancelGuestDeliveryTimer(guest);
    removeQueuedFoodDelivery(guest);
    if (previousPhase === "waiter-picking-up") interruptWaiterPickup(guest);
    guest.phase = "player-dragging";
    const ghost = document.createElement("div");
    ghost.className = "food-drag-ghost";
    const image = document.createElement("img");
    image.src = guest.dish.sprite;
    image.alt = "";
    ghost.append(image);
    ghost.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    document.body.append(ghost);
    foodDragState = {
      pointerId: event.pointerId,
      guest,
      ghost,
      item: event.currentTarget,
      target: false,
      latestX: event.clientX,
      latestY: event.clientY,
      sceneRect: el.roomScene.getBoundingClientRect(),
      frame: 0,
    };
    foodDragState.item.classList.add("is-dragging");
    foodDragState.item.classList.remove("is-claimed");
    guest.dom.dish.classList.add("is-drop-target");
    const hint = document.createElement("span");
    hint.className = "drop-target-icon";
    hint.setAttribute("aria-hidden", "true");
    hint.textContent = "↓";
    guest.dom.dish.replaceChildren(hint);
    updateFoodDrag(event);
    window.addEventListener("pointermove", updateFoodDrag, { passive: false });
    window.addEventListener("pointerup", finishFoodDrag);
    window.addEventListener("pointercancel", cancelFoodDrag);
  }

  function updateFoodDrag(event) {
    if (!foodDragState || event.pointerId !== foodDragState.pointerId) return;
    event.preventDefault();
    foodDragState.latestX = event.clientX;
    foodDragState.latestY = event.clientY;
    if (!foodDragState.frame) {
      foodDragState.frame = requestAnimationFrame(renderFoodDragFrame);
    }
  }

  function isPointOnGuestTable(clientX, clientY, guest, sceneRect = el.roomScene.getBoundingClientRect()) {
    if (!sceneRect.width || !sceneRect.height) return false;
    const x = (clientX - sceneRect.left) / sceneRect.width * 100;
    const y = (clientY - sceneRect.top) / sceneRect.height * 100;
    return x >= guest.seat.left && x <= guest.seat.left + guest.seat.width
      && y >= guest.seat.top && y <= guest.seat.top + guest.seat.height;
  }

  function renderFoodDragFrame() {
    if (!foodDragState) return;
    foodDragState.frame = 0;
    const { latestX, latestY, ghost, guest, sceneRect } = foodDragState;
    ghost.style.transform = `translate3d(${latestX}px, ${latestY}px, 0) translate(-50%, -50%)`;
    const onTable = isPointOnGuestTable(latestX, latestY, guest, sceneRect);
    foodDragState.target = onTable;
    guest.dom.dish.classList.toggle("is-drop-hover", onTable);
  }

  function cleanupFoodDrag() {
    if (!foodDragState) return null;
    const drag = foodDragState;
    if (drag.frame) cancelAnimationFrame(drag.frame);
    window.removeEventListener("pointermove", updateFoodDrag);
    window.removeEventListener("pointerup", finishFoodDrag);
    window.removeEventListener("pointercancel", cancelFoodDrag);
    drag.item.classList.remove("is-dragging");
    drag.ghost.remove();
    foodDragState = null;
    clearFoodDropTargets();
    return drag;
  }

  function finishFoodDrag(event) {
    if (!foodDragState || event.pointerId !== foodDragState.pointerId) return;
    updateFoodDrag(event);
    foodDragState.latestX = event.clientX;
    foodDragState.latestY = event.clientY;
    if (foodDragState.frame) cancelAnimationFrame(foodDragState.frame);
    renderFoodDragFrame();
    const drag = cleanupFoodDrag();
    if (drag?.target) serveDishToGuest(drag.guest);
    else resumeAutomaticFoodDelivery(drag?.guest);
  }

  function cancelFoodDrag(event) {
    if (!foodDragState || event.pointerId !== foodDragState.pointerId) return;
    const drag = cleanupFoodDrag();
    resumeAutomaticFoodDelivery(drag?.guest);
  }

  function showDishAtTable(guest) {
    guest.phase = "eating";
    const dishSprite = document.createElement("img");
    dishSprite.src = guest.dish.sprite;
    dishSprite.alt = guest.dish.name;
    guest.dom.dish.replaceChildren(dishSprite);
    guest.dom.dish.setAttribute("aria-label", guest.dish.name);
    guest.dom.dish.classList.add("is-visible");
    chime("serve");
    schedule(() => finishMeal(guest), 1600);
  }

  function removeFromDiningCounter(guest) {
    const index = state.diningFoodQueue.indexOf(guest);
    if (index !== -1) state.diningFoodQueue.splice(index, 1);
    renderFoodCounters();
  }

  function cancelGuestDeliveryTimer(guest) {
    if (!guest.deliveryTimer) return;
    window.clearTimeout(guest.deliveryTimer);
    state.timers.delete(guest.deliveryTimer);
    guest.deliveryTimer = null;
  }

  function removeQueuedFoodDelivery(guest) {
    state.staffTaskQueue = state.staffTaskQueue.filter((task) => task.kind !== "deliver-food" || task.guest !== guest);
  }

  function interruptWaiterPickup(guest) {
    if (state.servingGuest !== guest || staffMotion.mode !== "food-pickup") return;
    staffMotion.path = [];
    staffMotion.pathIndex = 0;
    staffMotion.mode = "wandering";
    staffMotion.onArrive = null;
    staffMotion.destination = null;
    staffMotion.pauseUntil = performance.now() + 450;
    el.staff.classList.remove("is-walking");
    el.staffCarry.hidden = true;
    state.servingGuest = null;
  }

  function resumeAutomaticFoodDelivery(guest) {
    if (!guest || !state.guests.has(guest.id) || guest.phase !== "player-dragging") return;
    guest.phase = "on-dining-counter";
    renderFoodCounters();
    scheduleAutomaticFoodDelivery(guest, 350);
    processNextStaffTask();
  }

  function serveDishToGuest(guest) {
    if (!state.guests.has(guest.id) || guest.phase !== "player-dragging") return;
    removeFromDiningCounter(guest);
    showDishAtTable(guest);
    if (state.servingGuest === guest) state.servingGuest = null;
    processNextStaffTask();
  }

  function placeDishOnKitchenCounter(guest) {
    if (!state.guests.has(guest.id) || guest.phase !== "chef-to-pass") return;
    if (state.kitchenFoodQueue.length >= 6) {
      schedule(() => placeDishOnKitchenCounter(guest), 400);
      return;
    }
    el.chef.classList.remove("is-placing-food");
    el.chefCarry.hidden = true;
    guest.phase = "on-kitchen-counter";
    state.kitchenFoodQueue.push(guest);
    animateCounterReceive(el.kitchenFoodCounter);
    chime("success");
    state.chefWorking = false;
    renderFoodCounters();
    processNextKitchenTask();
    schedule(() => {
      const item = [...el.kitchenFoodSlots.querySelectorAll(".food-counter-item")]
        .find((slotItem) => slotItem.dataset.guestId === guest.id);
      item?.classList.add("is-sending");
      schedule(() => {
        const kitchenIndex = state.kitchenFoodQueue.indexOf(guest);
        if (kitchenIndex === -1 || guest.phase !== "on-kitchen-counter") return;
        state.kitchenFoodQueue.splice(kitchenIndex, 1);
        guest.phase = "in-food-transit";
        renderFoodCounters();
        schedule(() => {
          if (!state.guests.has(guest.id) || guest.phase !== "in-food-transit") return;
          placeDishOnDiningCounter(guest);
        }, 250);
      }, 200);
    }, 400);
  }

  function placeDishOnDiningCounter(guest) {
    if (!state.guests.has(guest.id) || guest.phase !== "in-food-transit") return;
    if (state.diningFoodQueue.length >= 6) {
      schedule(() => placeDishOnDiningCounter(guest), 500);
      return;
    }
    guest.phase = "on-dining-counter";
    state.diningFoodQueue.push(guest);
    animateCounterReceive(el.hallFoodCounter);
    renderFoodCounters();
    chime("transfer");
    scheduleAutomaticFoodDelivery(guest, 2400);
  }

  function scheduleAutomaticFoodDelivery(guest, delay) {
    cancelGuestDeliveryTimer(guest);
    guest.deliveryTimer = schedule(() => {
      guest.deliveryTimer = null;
      if (!state.guests.has(guest.id) || guest.phase !== "on-dining-counter") return;
      if (foodDragState?.guest === guest) {
        scheduleAutomaticFoodDelivery(guest, 450);
        return;
      }
      guest.phase = "queued-waiter-delivery";
      state.staffTaskQueue.push({ kind: "deliver-food", guest });
      processNextStaffTask();
    }, delay);
  }

  function animateCounterReceive(counter) {
    counter.classList.remove("is-receiving");
    void counter.offsetWidth;
    counter.classList.add("is-receiving");
    schedule(() => counter.classList.remove("is-receiving"), 650);
  }

  function arrangeTables() {
    const nextLayout = getLayoutName();
    state.layoutName = nextLayout;
    applyMapBackground();
    mapControllers.garden?.setLayout(nextLayout);
    mapControllers.attic?.setLayout(nextLayout);
    state.tableSeats = getSeatLayout(nextLayout);
    if (!el.tableLayer.children.length) {
      state.tableSeats.forEach((_, index) => {
        const table = document.createElement("div");
        table.className = "table-prop";
        const tableImage = document.createElement("img");
        tableImage.src = "./assets/animal-restaurant-table.svg";
        tableImage.alt = "";
        tableImage.draggable = false;
        table.append(tableImage);
        el.tableLayer.append(table);

        const chair = document.createElement("div");
        chair.className = "chair-prop";
        const chairImage = document.createElement("img");
        chairImage.src = "./assets/animal-restaurant-chair.svg";
        chairImage.alt = "";
        chairImage.draggable = false;
        chair.append(chairImage);
        el.chairLayer.append(chair);

        const kitchenProp = document.createElement("div");
        kitchenProp.className = "kitchen-prop";
        const stoveImage = document.createElement("img");
        stoveImage.src = "./assets/animal-restaurant-stove.svg";
        stoveImage.alt = "";
        stoveImage.draggable = false;
        kitchenProp.append(stoveImage);
        el.kitchenLayer.append(kitchenProp);
      });
    }
    [el.tableLayer, el.chairLayer, el.kitchenLayer].forEach((layer) => [...layer.children].forEach((table, index) => {
      const position = state.tableSeats[index];
      table.style.left = `${position.left}%`;
      table.style.top = `${position.top}%`;
      table.style.width = `${position.width}%`;
      table.style.height = `${position.height}%`;
      const visibleCount = layer === el.kitchenLayer ? kitchenStoveCount() : unlockedTableCount();
      table.style.display = index < visibleCount ? "block" : "none";
    }));
    renderSceneProps();
    rebuildStaffGrid();
    if (staffMotion.destination) moveStaffTo(staffMotion.destination, staffMotion.mode, staffMotion.onArrive);
    state.guests.forEach(applyGuestPosition);
    renderWaitingQueue();
  }

  function schedule(callback, delay) {
    const timer = window.setTimeout(() => {
      state.timers.delete(timer);
      callback();
    }, delay);
    state.timers.add(timer);
    return timer;
  }

  function beginDoorTransit() {
    state.entryDoorTransitCount += 1;
    el.entryDoor.classList.add("is-open");
    let finished = false;
    return () => {
      if (finished) return;
      finished = true;
      state.entryDoorTransitCount = Math.max(0, state.entryDoorTransitCount - 1);
      if (state.entryDoorTransitCount === 0) el.entryDoor.classList.remove("is-open");
    };
  }

  function isInsideEntryDoor(position) {
    // Open as the full character approaches; close after the sprite clears the threshold.
    return position.x >= 42 && position.x <= 58 && position.y >= -1 && position.y <= 30;
  }

  function chime(kind = "soft") {
    if (state.muted) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      const context = new AudioContextClass();
      const now = context.currentTime;
      const sound = {
        soft: { notes: [523, 659], wave: "sine", step: 0.12, length: 0.21, volume: 0.07 },
        click: { notes: [430], wave: "sine", step: 0.04, length: 0.09, volume: 0.035 },
        invite: { notes: [440, 587], wave: "triangle", step: 0.075, length: 0.14, volume: 0.045 },
        order: { notes: [587, 740, 880], wave: "triangle", step: 0.08, length: 0.15, volume: 0.05 },
        cook: { notes: [330, 392, 494], wave: "sine", step: 0.11, length: 0.24, volume: 0.045 },
        transfer: { notes: [784, 659], wave: "sine", step: 0.07, length: 0.12, volume: 0.04 },
        serve: { notes: [659, 784, 988], wave: "triangle", step: 0.07, length: 0.16, volume: 0.05 },
        pickup: { notes: [523], wave: "sine", step: 0.04, length: 0.12, volume: 0.045 },
        coin: { notes: [659, 880], wave: "sine", step: 0.12, length: 0.21, volume: 0.07 },
        upgrade: { notes: [523, 659, 784], wave: "triangle", step: 0.08, length: 0.17, volume: 0.055 },
        success: { notes: [659, 784, 1047], wave: "sine", step: 0.09, length: 0.22, volume: 0.06 },
        error: { notes: [392, 330], wave: "triangle", step: 0.09, length: 0.16, volume: 0.04 },
      }[kind] || { notes: [523, 659], wave: "sine", step: 0.12, length: 0.21, volume: 0.07 };
      sound.notes.forEach((frequency, index) => {
        const start = now + index * sound.step;
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = sound.wave;
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(sound.volume, start + 0.018);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + sound.length);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + sound.length + 0.01);
      });
      window.setTimeout(() => context.close(), 900);
    } catch {
      // Audio is optional; it never blocks an interaction.
    }
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function availableMenu() {
    return menu.slice(0, state.unlockedMenuCount);
  }

  function spriteUrl(folder, direction) {
    return `./assets/sprites/${folder}/${direction}.png`;
  }

  function directionForVector(dx, dy) {
    if (!dx && !dy) return "south";
    const angle = Math.atan2(dy, dx);
    const octant = (Math.round(angle / (Math.PI / 4)) + 8) % 8;
    return ["east", "south-east", "south", "south-west", "west", "north-west", "north", "north-east"][octant];
  }

  function directionBetween(from, to) {
    const scene = document.querySelector("#room-scene");
    return directionForVector(
      (to.x - from.x) * scene.clientWidth / 100,
      (to.y - from.y) * scene.clientHeight / 100,
    );
  }

  function moveCharacter(element, image, from, target, finalDirection, onArrive, doorMode = "none", speedMultiplier = 1) {
    const scene = el.roomScene;
    let finishDoorTransit = null;
    if (element.finishDoorTransit) {
      if (isInsideEntryDoor(from)) finishDoorTransit = element.finishDoorTransit;
      else element.finishDoorTransit();
      element.finishDoorTransit = null;
    }
    const token = (element.walkToken || 0) + 1;
    let x = from.x;
    let y = from.y;
    let lastFrame = 0;
    let lastDirection = directionBetween(from, target);
    element.walkToken = token;
    element.walkTarget = { ...target };
    element.style.left = `${x}%`;
    element.style.top = `${y}%`;
    element.classList.add("is-walking");
    element.classList.toggle("is-in-door", isInsideEntryDoor(from));
    image.src = spriteUrl(element.dataset.spriteFolder || "Idle", lastDirection);
    let doorTransitStarted = Boolean(finishDoorTransit);
    if (!doorTransitStarted && doorMode === "enter" && isInsideEntryDoor(from)) {
      doorTransitStarted = true;
      finishDoorTransit = beginDoorTransit();
    }
    element.finishDoorTransit = finishDoorTransit;

    const updateDoorTransit = (position) => {
      const insideDoor = isInsideEntryDoor(position);
      element.classList.toggle("is-in-door", insideDoor);
      if ((doorMode === "enter" || doorMode === "exit") && insideDoor && !doorTransitStarted) {
        doorTransitStarted = true;
        finishDoorTransit = beginDoorTransit();
        element.finishDoorTransit = finishDoorTransit;
      } else if (doorTransitStarted && !insideDoor && finishDoorTransit) {
        finishDoorTransit();
        finishDoorTransit = null;
        element.finishDoorTransit = null;
      }
    };

    const step = (now) => {
      if (element.walkToken !== token || !element.isConnected) return;
      const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 0;
      lastFrame = now;
      const dx = (target.x - x) * scene.clientWidth / 100;
      const dy = (target.y - y) * scene.clientHeight / 100;
      const distance = Math.hypot(dx, dy);
      const speed = STAFF_SPEED * speedMultiplier * Math.max(0.75, scene.clientWidth / 1000);

      if (distance <= Math.max(0.5, speed * dt)) {
        element.style.left = `${target.x}%`;
        element.style.top = `${target.y}%`;
        element.classList.remove("is-walking");
        element.walkTarget = null;
        updateDoorTransit(target);
        if (finishDoorTransit && !isInsideEntryDoor(target)) {
          finishDoorTransit();
          element.finishDoorTransit = null;
        }
        image.src = spriteUrl(element.dataset.spriteFolder || "Idle", finalDirection);
        if (onArrive) onArrive();
        return;
      }
      if (distance > 0 && dt > 0) {
        const stepDistance = Math.min(distance, speed * dt);
        const moveX = dx / distance * stepDistance;
        const moveY = dy / distance * stepDistance;
        x += moveX / scene.clientWidth * 100;
        y += moveY / scene.clientHeight * 100;
        element.style.left = `${x}%`;
        element.style.top = `${y}%`;
        updateDoorTransit({ x, y });
        const direction = directionForVector(moveX, moveY);
        if (direction !== lastDirection) {
          image.src = spriteUrl(element.dataset.spriteFolder || "Idle", direction);
          lastDirection = direction;
        }
      }
      requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  function seatApproachPoints(seat) {
    const candidates = [
      { x: seat.left - 3.5, y: seat.seatY },
      { x: seat.left + seat.width + 3.5, y: seat.seatY },
    ].filter((point) => point.x >= 4 && point.x <= 96 && staffPointIsClear(point.x, point.y));
    return candidates.length ? candidates : [closestStaffNode({ x: seat.seatX, y: seat.seatY })].filter(Boolean);
  }

  function pathToStaffPoint(from, target) {
    const path = findStaffPath(from, target);
    if (!path.length) return [target];
    const last = path[path.length - 1];
    if (Math.hypot(last.x - target.x, last.y - target.y) > 0.1 && staffPointIsClear(target.x, target.y)) {
      path.push(target);
    }
    return path;
  }

  function moveCharacterAlong(element, image, start, points, onArrive, doorModeIndex = -1, doorMode = "none") {
    if (!points.length) {
      if (onArrive) onArrive();
      return;
    }
    const moveSegment = (index, from) => {
      const target = points[index];
      const mode = index === doorModeIndex ? doorMode : "none";
      moveCharacter(element, image, from, target, directionBetween(from, target), () => {
        if (index + 1 < points.length) moveSegment(index + 1, target);
        else if (onArrive) onArrive();
      }, mode);
    };
    moveSegment(0, start);
  }

  function walkGuestToSeat(guest, doorway, onArrive) {
    const approaches = seatApproachPoints(guest.seat);
    const approach = approaches
      .map((point) => ({ point, path: pathToStaffPoint(doorway, point) }))
      .sort((a, b) => a.path.length - b.path.length)[0].point;
    const route = pathToStaffPoint(doorway, approach);
    route.push({ x: guest.seat.seatX, y: guest.seat.seatY });
    moveCharacterAlong(guest.dom.customer, guest.dom.sprite, doorway, route, onArrive, 0, "enter");
  }

  function staffPointIsClear(x, y) {
    if (x < 4 || x > 96 || y < 30 || y > 95) return false;
    const overlapsTable = state.tableSeats.some((seat, index) => index < unlockedTableCount()
      && x >= seat.left - 2.2 && x <= seat.left + seat.width + 2.2
      && y >= seat.top - 2.5 && y <= seat.top + seat.height + 2.5);
    if (overlapsTable) return false;
    const counterZones = state.layoutName === "portrait"
      ? [{ left: 36, right: 64, top: 73, bottom: 89 }]
      : state.layoutName === "mobile"
      ? [
        { left: 0, right: 27, top: 48, bottom: 67 },
        { left: 73, right: 100, top: 48, bottom: 67 },
      ]
      : [
        { left: 0, right: 14, top: 49, bottom: 68 },
        { left: 86, right: 100, top: 49, bottom: 68 },
      ];
    const insideFurniture = state.scenePropObstacles.some((zone) => x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom);
    return !insideFurniture && !counterZones.some((zone) => x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom);
  }

  function rebuildStaffGrid() {
    staffGrid.xs = Array.from({ length: 24 }, (_, index) => 4 + index * staffGrid.step);
    staffGrid.ys = Array.from({ length: 18 }, (_, index) => 30 + index * staffGrid.step);
    staffGrid.nodes = [];
    staffGrid.ys.forEach((y, row) => staffGrid.xs.forEach((x, col) => {
      if (staffPointIsClear(x, y)) staffGrid.nodes.push({ x, y, col, row });
    }));
  }

  function closestStaffNode(point) {
    const scene = document.querySelector("#room-scene");
    const aspect = scene.clientWidth / Math.max(1, scene.clientHeight);
    return staffGrid.nodes.reduce((nearest, node) => {
      const distance = Math.hypot((node.x - point.x) * aspect, node.y - point.y);
      return !nearest || distance < nearest.distance ? { node, distance } : nearest;
    }, null)?.node || null;
  }

  function findStaffPath(from, to) {
    const start = closestStaffNode(from);
    const goal = closestStaffNode(to);
    if (!start || !goal) return [];
    const key = (node) => `${node.col},${node.row}`;
    const nodes = new Map(staffGrid.nodes.map((node) => [key(node), node]));
    const startKey = key(start);
    const goalKey = key(goal);
    const open = new Set([startKey]);
    const cameFrom = new Map();
    const gScore = new Map([[startKey, 0]]);
    const scene = document.querySelector("#room-scene");
    const aspect = scene.clientWidth / Math.max(1, scene.clientHeight);
    const heuristic = (node) => Math.hypot((node.x - goal.x) * aspect, node.y - goal.y);

    while (open.size) {
      let currentKey = null;
      let currentScore = Infinity;
      for (const candidateKey of open) {
        const candidate = nodes.get(candidateKey);
        const score = (gScore.get(candidateKey) || 0) + heuristic(candidate);
        if (score < currentScore) { currentKey = candidateKey; currentScore = score; }
      }
      if (currentKey === goalKey) {
        const path = [goal];
        let cursor = goalKey;
        while (cameFrom.has(cursor)) {
          cursor = cameFrom.get(cursor);
          path.unshift(nodes.get(cursor));
        }
        return path.slice(1);
      }
      open.delete(currentKey);
      const current = nodes.get(currentKey);
      for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
        for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
          if (!rowOffset && !colOffset) continue;
          const neighbor = nodes.get(`${current.col + colOffset},${current.row + rowOffset}`);
          if (!neighbor) continue;
          if (rowOffset && colOffset && (
            !nodes.has(`${current.col + colOffset},${current.row}`)
            || !nodes.has(`${current.col},${current.row + rowOffset}`)
          )) continue;
          const step = Math.hypot(colOffset * staffGrid.step * aspect, rowOffset * staffGrid.step);
          const tentative = gScore.get(currentKey) + step;
          const neighborKey = key(neighbor);
          if (tentative >= (gScore.get(neighborKey) ?? Infinity)) continue;
          cameFrom.set(neighborKey, currentKey);
          gScore.set(neighborKey, tentative);
          open.add(neighborKey);
        }
      }
    }
    return [];
  }

  function setStaffPosition(x, y) {
    staffMotion.x = x;
    staffMotion.y = y;
    el.staff.style.left = `${x}%`;
    el.staff.style.top = `${y}%`;
  }

  function setStaffFacing(dx, dy) {
    if (dx || dy) {
      staffMotion.facing = directionForVector(dx, dy);
      el.staff.querySelector("img").src = spriteUrl("Idle_5", staffMotion.facing);
    }
  }

  function moveStaffTo(target, mode, onArrive) {
    const path = findStaffPath(staffMotion, target);
    if (!path.length) {
      if (mode !== "wandering") {
        staffMotion.mode = "wandering";
        staffMotion.onArrive = null;
        staffMotion.destination = null;
        if (onArrive) onArrive();
        return;
      }
      staffMotion.mode = "wandering";
      staffMotion.onArrive = null;
      staffMotion.destination = null;
      staffMotion.pauseUntil = performance.now() + 300;
      return;
    }
    if (Math.hypot(path[path.length - 1].x - target.x, path[path.length - 1].y - target.y) > 0.1
      && staffPointIsClear(target.x, target.y)) path.push({ x: target.x, y: target.y });
    staffMotion.path = path;
    staffMotion.pathIndex = 0;
    staffMotion.mode = mode;
    staffMotion.onArrive = onArrive || null;
    staffMotion.destination = { ...target };
    staffMotion.pauseUntil = 0;
    el.staff.classList.add("is-walking");
  }

  function chooseWanderTarget() {
    const candidates = staffGrid.nodes.filter((node) => {
      const dx = (node.x - staffMotion.x) * document.querySelector("#room-scene").clientWidth / 100;
      const dy = (node.y - staffMotion.y) * document.querySelector("#room-scene").clientHeight / 100;
      return Math.hypot(dx, dy) > 130;
    });
    if (!candidates.length) {
      staffMotion.pauseUntil = performance.now() + 700;
      return;
    }
    moveStaffTo(randomItem(candidates), "wandering");
  }

  function updateStaffMovement(now) {
    const scene = document.querySelector("#room-scene");
    const dt = staffMotion.lastFrame ? Math.min((now - staffMotion.lastFrame) / 1000, 0.05) : 0;
    staffMotion.lastFrame = now;
    const waypoint = staffMotion.path[staffMotion.pathIndex];
    if (waypoint) {
      const dx = (waypoint.x - staffMotion.x) * scene.clientWidth / 100;
      const dy = (waypoint.y - staffMotion.y) * scene.clientHeight / 100;
      const distance = Math.hypot(dx, dy);
      const pickupMultiplier = staffMotion.mode === "collecting-money" ? MONEY_PICKUP_SPEED_MULTIPLIER : 1;
      const velocity = STAFF_SPEED * pickupMultiplier * Math.max(0.75, scene.clientWidth / 1000);
      if (distance <= velocity * dt) {
        setStaffPosition(waypoint.x, waypoint.y);
        staffMotion.pathIndex += 1;
        if (staffMotion.pathIndex >= staffMotion.path.length) {
          staffMotion.path = [];
          staffMotion.destination = null;
          el.staff.classList.remove("is-walking");
          if (staffMotion.mode === "taking-order" || staffMotion.mode === "food-pickup"
            || staffMotion.mode === "delivering-food" || staffMotion.mode === "collecting-money") {
            const complete = staffMotion.onArrive;
            staffMotion.mode = "wandering";
            staffMotion.onArrive = null;
            if (complete) complete();
            staffMotion.pauseUntil = performance.now() + 350;
          } else {
            staffMotion.pauseUntil = now + 450 + Math.random() * 900;
          }
        }
      } else if (distance > 0) {
        const step = Math.min(distance, velocity * dt);
        const moveX = dx / distance * step;
        const moveY = dy / distance * step;
        setStaffFacing(moveX, moveY);
        setStaffPosition(staffMotion.x + moveX / scene.clientWidth * 100, staffMotion.y + moveY / scene.clientHeight * 100);
      }
    } else if (staffMotion.mode === "wandering" && now >= staffMotion.pauseUntil) {
      chooseWanderTarget();
    }
    requestAnimationFrame(updateStaffMovement);
  }

  function startStaffWander() {
    rebuildStaffGrid();
    setStaffPosition(staffMotion.x, staffMotion.y);
    el.staff.classList.add("is-visible");
    staffMotion.facing = "south";
    el.staff.querySelector("img").src = spriteUrl("Idle_5", staffMotion.facing);
    requestAnimationFrame(updateStaffMovement);
  }

  function chooseChefWanderTarget() {
    const scene = el.roomScene;
    const candidates = staffGrid.nodes.filter((node) => {
      if (node.y < 56 || node.x < 8 || node.x > 92) return false;
      const dx = (node.x - chefMotion.x) * scene.clientWidth / 100;
      const dy = (node.y - chefMotion.y) * scene.clientHeight / 100;
      return Math.hypot(dx, dy) > 90;
    });
    if (!candidates.length) {
      chefWanderPauseUntil = performance.now() + 800;
      return;
    }
    chefMoveTo(randomItem(candidates), () => {
      chefWanderPauseUntil = performance.now() + 700 + Math.random() * 1100;
    });
  }

  function updateChefWander(now) {
    if (!state.chefWorking && !state.chefTaskQueue.length
      && !el.chef.classList.contains("is-walking") && now >= chefWanderPauseUntil) {
      chooseChefWanderTarget();
    }
    requestAnimationFrame(updateChefWander);
  }

  function startChefWander() {
    setChefPosition(chefMotion.x, chefMotion.y);
    el.chef.classList.add("is-visible");
    el.chef.querySelector("img").src = spriteUrl("Idle", chefMotion.facing);
    chefWanderPauseUntil = performance.now() + 700;
    requestAnimationFrame(updateChefWander);
  }

  function inviteGuest() {
    const isDestinationMap = state.mapMode === "garden" || state.mapMode === "attic";
    const controller = mapControllers[state.mapMode];
    if (isDestinationMap ? !controller?.canVisit() : state.guests.size + state.waitingQueue.length >= guestCapacity()) return;
    state.inviteProgress = Math.min(100, state.inviteProgress + chancePerTap());
    chime("invite");
    if (state.inviteProgress >= 100) {
      state.inviteProgress = 0;
      if ((isDestinationMap ? controller.visit() : spawnGuest())) showInviteSuccess();
    }
    render();
  }


  function showInviteSuccess() {
    el.inviteSuccess.hidden = false;
    el.inviteSuccess.classList.remove("is-visible");
    void el.inviteSuccess.offsetWidth;
    el.inviteSuccess.classList.add("is-visible");
    schedule(() => {
      el.inviteSuccess.classList.remove("is-visible");
      el.inviteSuccess.hidden = true;
    }, 900);
  }

  function createGuest(request = null) {
    const lockedMenu = menu.slice(state.unlockedMenuCount);
    const dish = request?.dish || (lockedMenu.length && Math.random() < lockedDishRequestChance
      ? randomItem(lockedMenu)
      : randomItem(availableMenu()));
    const dishIndex = menu.findIndex((item) => item === dish || item.name === dish.name);
    return {
      id: `${Date.now()}-${Math.random()}`,
      spriteFolder: request?.spriteFolder || randomItem(guestSprites),
      tableIndex: -1,
      dish,
      dishIndex,
      phase: "queued",
      revenue: 0,
      quotedPrice: 0,
      exited: false,
      collected: false,
      dom: null,
    };
  }

  function createGuestElements(guest) {
    const customer = document.createElement("div");
    customer.className = "customer";
    customer.dataset.spriteFolder = guest.spriteFolder;
    const sprite = document.createElement("img");
    sprite.alt = "";
    sprite.draggable = false;
    customer.append(sprite);

    const dish = document.createElement("div");
    dish.className = "dish-on-table";
    dish.dataset.guestId = guest.id;
    dish.setAttribute("aria-hidden", "true");

    const orderAction = document.createElement("button");
    orderAction.className = "table-action order-action";
    orderAction.type = "button";
    orderAction.hidden = true;
    const orderIcon = document.createElement("img");
    orderIcon.className = "action-icon";
    orderIcon.alt = "";
    orderAction.append(orderIcon);
    orderAction.addEventListener("click", () => deliverOrder(guest));

    guest.dom = { customer, sprite, dish, orderAction, orderIcon };
    el.guestLayer.append(customer, dish);
    el.orderLayer.append(orderAction);
  }

  function showGuestEmotion(guest, emotion) {
    if (!guest.dom?.customer?.isConnected) return;
    const bubble = document.createElement("div");
    bubble.className = `emotion-bubble emotion-${emotion}`;
    bubble.setAttribute("aria-hidden", "true");
    bubble.innerHTML = `<svg viewBox="0 0 32 32" focusable="false">${emotionArt[emotion]}</svg>`;
    guest.dom.customer.append(bubble);
    schedule(() => bubble.remove(), 2400);
  }

  function showLockedDishRequest(guest) {
    guest.phase = "locked-order";
    chime("error");
    guest.dom.orderIcon.src = guest.dish.sprite;
    guest.dom.orderAction.disabled = true;
    guest.dom.orderAction.classList.add("is-locked-request");
    guest.dom.orderAction.setAttribute("aria-label", `${guest.dish.name} chưa được mở khóa; khách rời quán thất vọng.`);
    const lock = document.createElement("span");
    lock.className = "order-lock-icon";
    lock.setAttribute("aria-hidden", "true");
    lock.textContent = "🔒";
    guest.dom.orderAction.append(lock);
    guest.dom.orderAction.hidden = false;
    showGuestEmotion(guest, randomItem(negativeMoods));
    state.reputationPoints = Math.max(0, Math.round(state.reputationPoints * 0.9 * 10) / 10);
    el.reputation.textContent = reputationLabel();
    saveProgress();
    schedule(() => {
      if (!state.guests.has(guest.id) || guest.phase !== "locked-order") return;
      guest.dom.orderAction.hidden = true;
      startGuestExit(guest);
    }, 1800);
  }

  function setOrderButtons() {
    state.guests.forEach((guest) => {
      if (guest.phase === "order-ready") guest.dom.orderAction.disabled = false;
    });
  }

  function seatGuest(guest, tableIndex) {
    guest.tableIndex = tableIndex;
    guest.phase = "entering";
    state.guests.set(guest.id, guest);
    state.occupiedTables.set(tableIndex, guest.id);
    createGuestElements(guest);
    applyGuestPosition(guest);
    const start = guest.fromQueue && guest.queuePosition
      ? guest.queuePosition
      : { x: 50, y: 13 };
    guest.dom.customer.style.transform = "translate(-50%, -55%)";
    guest.dom.customer.className = "customer is-visible is-entering is-walking";
    const finishSeating = () => {
        if (!state.guests.has(guest.id) || guest.phase !== "entering") return;
        guest.phase = "waiting-order";
        guest.dom.customer.className = "customer is-visible is-seated";
        guest.dom.sprite.src = spriteUrl(guest.spriteFolder, "south");
        schedule(() => {
          if (!state.guests.has(guest.id) || guest.phase !== "waiting-order") return;
          guest.phase = "order-ready";
          if (guest.dishIndex >= state.unlockedMenuCount) {
            showLockedDishRequest(guest);
            return;
          }
          guest.quotedPrice = guestSalePrice(guest);
          guest.dom.orderIcon.src = guest.dish.sprite;
          guest.dom.orderAction.setAttribute("aria-label", `Khách gọi ${guest.dish.name}. Nhấn để nhân viên nhận order.`);
          guest.dom.orderAction.hidden = false;
          setOrderButtons();
        }, 650);
    };
    if (guest.fromQueue) {
      const doorway = { x: 50, y: 13 };
      moveCharacter(guest.dom.customer, guest.dom.sprite, start, doorway, "south", () => {
        walkGuestToSeat(guest, doorway, finishSeating);
      }, "enter");
    } else {
      walkGuestToSeat(guest, start, finishSeating);
    }
    chime();
    render();
  }

  function dispatchWaitingGuests() {
    let tableIndex = findFreeTable();
    while (tableIndex !== -1 && state.waitingQueue.length) {
      const guest = state.waitingQueue.shift();
      const marker = state.queueMarkers.get(guest.id);
      guest.queuePosition = marker
        ? { x: parseFloat(marker.style.left), y: parseFloat(marker.style.top) }
        : { x: state.layoutName === "portrait" ? 67 : state.layoutName === "mobile" ? 61 : 68, y: state.layoutName === "portrait" ? 10 : state.layoutName === "mobile" ? 14 : 16 };
      guest.fromQueue = true;
      seatGuest(guest, tableIndex);
      tableIndex = findFreeTable();
    }
    renderWaitingQueue();
    render();
  }

  function spawnGuest(request = null) {
    if (state.waitingQueue.length && findFreeTable() !== -1) dispatchWaitingGuests();
    const guest = createGuest(request);
    const tableIndex = findFreeTable();
    if (tableIndex !== -1 && state.waitingQueue.length === 0) {
      seatGuest(guest, tableIndex);
      return true;
    }
    if (state.waitingQueue.length >= waitingQueueLimit()) return false;
    state.waitingQueue.push(guest);
    renderWaitingQueue();
    render();
    chime();
    return true;
  }

  function deliverOrder(guest) {
    if (!state.guests.has(guest.id) || guest.phase !== "order-ready") return;
    guest.phase = "queued-waiter";
    chime("order");
    guest.dom.orderAction.hidden = true;
    state.staffTaskQueue.push({ kind: "take-order", guest });
    processNextStaffTask();
  }

  function setStaffCarry(item) {
    const image = el.staffCarry.querySelector("img");
    let coin = el.staffCarry.querySelector(".coin-icon");
    if (!coin) {
      coin = document.createElement("span");
      coin.className = "coin-icon staff-carry-coin";
      coin.setAttribute("aria-hidden", "true");
      el.staffCarry.append(coin);
    }
    const carryingMoney = item === "money";
    image.hidden = carryingMoney;
    coin.hidden = !carryingMoney;
    image.style.display = carryingMoney ? "none" : "block";
    coin.style.display = carryingMoney ? "grid" : "none";
    if (!carryingMoney) image.src = item;
    el.staffCarry.classList.toggle("is-carrying-money", carryingMoney);
    el.staffCarry.hidden = false;
  }

  function processNextStaffTask() {
    if (foodDragState || state.servingGuest || state.moneyPickupInProgress) return;
    while (state.staffTaskQueue.length) {
      const task = state.staffTaskQueue.shift();
      if (task.kind === "take-order") {
        if (!state.guests.has(task.guest.id) || task.guest.phase !== "queued-waiter") continue;
        beginTakingOrder(task.guest);
        return;
      }
      if (task.kind === "deliver-food") {
        if (!state.guests.has(task.guest.id) || task.guest.phase !== "queued-waiter-delivery") continue;
        beginFoodDelivery(task.guest);
        return;
      }
      if (task.kind === "money") {
        const payment = state.pendingPayments.get(task.tableIndex);
        if (payment && payment.amount > 0) {
          beginMoneyPickup(task.tableIndex);
          return;
        }
        if (payment) payment.requested = false;
      }
    }
    renderMoneyBubbles();
  }

  function beginTakingOrder(guest) {
    guest.phase = "taking-order";
    state.servingGuest = guest;
    const servingSide = guest.seat.seatX < 50 ? 1 : -1;
    const staffTarget = {
      x: guest.seat.left + (servingSide > 0 ? guest.seat.width + 3.5 : -3.5),
      y: guest.seat.top + guest.seat.height * 0.58,
    };
    moveStaffTo(staffTarget, "taking-order", () => {
      if (!state.guests.has(guest.id) || guest.phase !== "taking-order") {
        state.servingGuest = null;
        processNextStaffTask();
        return;
      }
      state.servingGuest = null;
      guest.phase = "queued-kitchen";
      state.chefTaskQueue.push(guest);
      chime("order");
      processNextKitchenTask();
      processNextStaffTask();
    });
  }

  function beginFoodDelivery(guest) {
    guest.phase = "waiter-picking-up";
    renderFoodCounters();
    state.servingGuest = guest;
    const pass = state.layoutName === "portrait" ? { x: 50, y: 72 } : state.layoutName === "mobile" ? { x: 30, y: 90 } : { x: 82, y: 90 };
    const servingSide = guest.seat.seatX < 50 ? 1 : -1;
    const table = {
      x: guest.seat.left + (servingSide > 0 ? guest.seat.width + 3.5 : -3.5),
      y: guest.seat.top + guest.seat.height * 0.58,
    };
    moveStaffTo(pass, "food-pickup", () => {
      if (!state.guests.has(guest.id) || guest.phase !== "waiter-picking-up") {
        state.servingGuest = null;
        processNextStaffTask();
        return;
      }
      removeFromDiningCounter(guest);
      setStaffCarry(guest.dish.sprite);
      guest.phase = "waiter-delivering";
      moveStaffTo(table, "delivering-food", () => {
        el.staffCarry.hidden = true;
        el.staffCarry.classList.remove("is-carrying-money");
        state.servingGuest = null;
        if (state.guests.has(guest.id) && guest.phase === "waiter-delivering") {
          showDishAtTable(guest);
        }
        processNextStaffTask();
      });
    });
    chime("pickup");
  }

  function setChefCarry(sprite) {
    el.chefCarry.querySelector("img").src = sprite;
    el.chefCarry.hidden = false;
  }

  function setChefPosition(x, y) {
    chefMotion.x = x;
    chefMotion.y = y;
    el.chef.style.left = `${x}%`;
    el.chef.style.top = `${y}%`;
  }

  function chefMoveTo(target, onArrive) {
    const from = {
      x: Number.parseFloat(el.chef.style.left) || chefMotion.x,
      y: Number.parseFloat(el.chef.style.top) || chefMotion.y,
    };
    const path = findStaffPath(from, target);
    if (!path.length) path.push(target);
    else if (Math.hypot(path[path.length - 1].x - target.x, path[path.length - 1].y - target.y) > 0.1
      && staffPointIsClear(target.x, target.y)) path.push(target);
    const walkSegment = (index, start) => {
      const destination = path[index];
      const facing = directionBetween(start, destination);
      chefMotion.facing = facing;
      moveCharacter(el.chef, el.chef.querySelector("img"), start, destination, facing, () => {
        setChefPosition(destination.x, destination.y);
        if (index + 1 < path.length) walkSegment(index + 1, destination);
        else if (onArrive) onArrive();
      }, "none", CHEF_SPEED_MULTIPLIER * (1 + state.kitchenChefSpeedLevel * 0.12));
    };
    walkSegment(0, from);
  }

  function processNextKitchenTask() {
    if (state.chefWorking) return;
    while (state.chefTaskQueue.length) {
      const guest = state.chefTaskQueue.shift();
      if (!state.guests.has(guest.id) || guest.phase !== "queued-kitchen") continue;
      beginCookingOrder(guest);
      return;
    }
  }

  function beginCookingOrder(guest) {
    state.chefWorking = true;
    guest.phase = "chef-receiving";
    setChefCarry(guest.dish.sprite);
    chefMoveTo({ x: 82, y: 57 }, () => {
      if (!state.guests.has(guest.id) || guest.phase !== "chef-receiving") {
        el.chefCarry.hidden = true;
        state.chefWorking = false;
        processNextKitchenTask();
        return;
      }
      schedule(() => {
        el.chefCarry.hidden = true;
        const stoveSeat = state.tableSeats[guest.tableIndex % kitchenStoveCount()] || state.tableSeats[0];
        const stove = {
          x: stoveSeat.left + stoveSeat.width * 0.5,
          y: stoveSeat.top + stoveSeat.height * 0.48,
        };
        guest.phase = "chef-to-stove";
        chefMoveTo(stove, () => {
          if (!state.guests.has(guest.id) || guest.phase !== "chef-to-stove") {
            state.chefWorking = false;
            processNextKitchenTask();
            return;
          }
          guest.phase = "cooking";
          chime("cook");
          el.chef.classList.add("is-cooking");
          const indicator = document.createElement("div");
          indicator.className = "cooking-indicator";
          indicator.setAttribute("aria-label", `Đang nấu ${guest.dish.name}`);
          const dishImage = document.createElement("img");
          dishImage.src = guest.dish.sprite;
          dishImage.alt = "";
          indicator.append(dishImage);
          indicator.style.left = `${stove.x}%`;
          indicator.style.top = `${stove.y}%`;
          el.cookingLayer.append(indicator);
          schedule(() => {
            indicator.remove();
            el.chef.classList.remove("is-cooking");
            if (!state.guests.has(guest.id) || guest.phase !== "cooking") {
              state.chefWorking = false;
              processNextKitchenTask();
              return;
            }
            setChefCarry(guest.dish.sprite);
            guest.phase = "chef-to-pass";
            const kitchenPass = state.layoutName === "portrait" ? { x: 50, y: 72 } : state.layoutName === "mobile" ? { x: 30, y: 90 } : { x: 19, y: 90 };
            chefMoveTo(kitchenPass, () => {
              if (!state.guests.has(guest.id) || guest.phase !== "chef-to-pass") {
                el.chef.classList.remove("is-placing-food");
                el.chefCarry.hidden = true;
                state.chefWorking = false;
                processNextKitchenTask();
                return;
              }
              el.chef.classList.add("is-placing-food");
              schedule(() => placeDishOnKitchenCounter(guest), 250);
            });
          }, kitchenCookDuration());
        });
      }, 300);
    });
  }

  function beginMoneyPickup(tableIndex) {
    const payment = state.pendingPayments.get(tableIndex);
    if (!payment || payment.amount <= 0) {
      if (payment) payment.requested = false;
      renderMoneyBubbles();
      processNextStaffTask();
      return;
    }
    state.moneyPickupInProgress = true;
    setStaffCarry("money");
    moveStaffTo({ ...payment.anchor }, "collecting-money", () => {
      el.staffCarry.hidden = true;
      el.staffCarry.classList.remove("is-carrying-money");
      const collectedPayment = state.pendingPayments.get(tableIndex);
      if (collectedPayment) {
        state.money += collectedPayment.amount;
        state.pendingCoins = Math.max(0, state.pendingCoins - collectedPayment.amount);
        state.pendingPayments.delete(tableIndex);
      }
      state.moneyPickupInProgress = false;
      render();
      saveProgress();
      chime("coin");
      processNextStaffTask();
    });
  }

  function finishMeal(guest) {
    if (!state.guests.has(guest.id) || guest.phase !== "eating") return;
    guest.phase = "collecting";
    guest.revenue = guest.quotedPrice;
    guest.paid = true;
    if (Math.random() < positiveMoodChance) {
      const emotion = randomItem(positiveMoods);
      state.reputationPoints += guest.revenue * 0.2;
      el.reputation.textContent = reputationLabel();
      showGuestEmotion(guest, emotion);
      saveProgress();
    }
    const anchor = {
      x: Math.min(90, guest.seat.left + guest.seat.width + 3),
      y: guest.seat.top + guest.seat.height * 0.48,
    };
    const payment = state.pendingPayments.get(guest.tableIndex) || {
      amount: 0,
      anchor,
      requested: false,
    };
    payment.amount += guest.revenue;
    state.pendingPayments.set(guest.tableIndex, payment);
    state.pendingCoins += guest.revenue;
    guest.dom.dish.classList.remove("is-visible");
    renderMoneyBubbles();
    startGuestExit(guest);
    chime("coin");
  }

  function startGuestExit(guest) {
    guest.phase = "leaving";
    const door = { x: 50, y: -5 };
    const seat = { x: guest.seat.seatX, y: guest.seat.seatY };
    guest.dom.customer.style.transform = "translate(-50%, -55%)";
    guest.dom.customer.className = "customer is-visible is-leaving is-walking";
    const exitApproaches = seatApproachPoints(guest.seat);
    const doorApproach = { x: 50, y: 25 };
    const approach = exitApproaches
      .map((point) => ({ point, path: pathToStaffPoint(point, doorApproach) }))
      .sort((a, b) => a.path.length - b.path.length)[0].point;
    const route = [approach, ...pathToStaffPoint(approach, doorApproach), door];
    moveCharacterAlong(guest.dom.customer, guest.dom.sprite, seat, route, () => {
      if (!state.guests.has(guest.id)) return;
      guest.exited = true;
      guest.dom.customer.remove();
      guest.dom.dish.remove();
      guest.dom.orderAction.remove();
      state.occupiedTables.delete(guest.tableIndex);
      state.guests.delete(guest.id);
      dispatchWaitingGuests();
    }, route.length - 1, "exit");
  }

  function requestMoneyPickup(tableIndex) {
    const payment = state.pendingPayments.get(tableIndex);
    if (!payment || payment.amount <= 0 || payment.requested) return;
    chime("pickup");
    payment.requested = true;
    state.staffTaskQueue.push({ kind: "money", tableIndex });
    renderMoneyBubbles();
    processNextStaffTask();
  }

  function purchaseChanceUpgrade() {
    const cost = chanceCost();
    if (state.chanceLevel >= maxChanceLevel || state.money < cost) return;
    state.money -= cost;
    state.chanceLevel += 1;
    chime("upgrade");
    render();
    saveProgress();
  }

  function purchaseReputationUpgrade() {
    const cost = reputationCost();
    if (state.reputationLevel >= maxReputationLevel || state.money < cost) return;
    state.money -= cost;
    state.reputationLevel += 1;
    chime("upgrade");
    arrangeTables();
    dispatchWaitingGuests();
    render();
    saveProgress();
    const bonus = Math.round((priceMultiplier() - 1) * 100);
  }

  function purchaseQueueUpgrade() {
    const cost = queueCost();
    if (state.money < cost) return;
    state.money -= cost;
    state.queueLevel += 1;
    chime("upgrade");
    render();
    saveProgress();
  }

  function purchaseKitchenUpgrade(key) {
    const levels = {
      stoves: { field: "kitchenStoveLevel", cost: kitchenStoveCost, max: 5 },
      cooking: { field: "kitchenCookLevel", cost: kitchenCookCost, max: 10 },
      chef: { field: "kitchenChefSpeedLevel", cost: kitchenChefCost, max: 10 },
    };
    const upgrade = levels[key];
    const cost = upgrade.cost();
    if (state[upgrade.field] >= upgrade.max || state.money < cost) return;
    state.money -= cost;
    state[upgrade.field] += 1;
    chime("upgrade");
    if (key === "stoves") arrangeTables();
    render();
    saveProgress();
  }

  function purchaseInteriorUpgrade(area) {
    const field = area === "kitchen" ? "kitchenInteriorLevel" : "hallInteriorLevel";
    const catalog = area === "kitchen" ? kitchenFurnitureNames : hallFurnitureNames;
    const level = state[field];
    const cost = interiorCost(level);
    if (level >= catalog.length || state.money < cost) return;
    state.money -= cost;
    state[field] += 1;
    chime("upgrade");
    renderSceneProps();
    rebuildStaffGrid();
    render();
    saveProgress();
  }

  el.invite.addEventListener("click", inviteGuest);
  el.upgradeOpen.addEventListener("click", () => {
    chime("click");
    if (el.upgradePanel.open) el.upgradePanel.close();
    else el.upgradePanel.show();
    syncPanelLayout();
  });
  el.upgradeClose.addEventListener("click", () => { chime("click"); el.upgradePanel.close(); });
  el.upgradePanel.addEventListener("close", syncPanelLayout);
  el.menuOpen.addEventListener("click", () => {
    chime("click");
    if (el.menuPanel.open) el.menuPanel.close();
    else el.menuPanel.show();
    syncPanelLayout();
  });
  el.menuClose.addEventListener("click", () => { chime("click"); el.menuPanel.close(); });
  el.menuPanel.addEventListener("close", syncPanelLayout);
  el.mapToggle.addEventListener("click", () => {
    chime("click");
    const currentMapIndex = MAP_ORDER.indexOf(state.mapMode);
    state.mapMode = MAP_ORDER[(currentMapIndex + 1) % MAP_ORDER.length];
    renderMapMode();
    render();
  });
  el.chanceUpgrade.addEventListener("click", purchaseChanceUpgrade);
  el.reputationUpgrade.addEventListener("click", purchaseReputationUpgrade);
  el.queueUpgrade.addEventListener("click", purchaseQueueUpgrade);
  el.kitchenStoveUpgrade.addEventListener("click", () => purchaseKitchenUpgrade("stoves"));
  el.kitchenCookUpgrade.addEventListener("click", () => purchaseKitchenUpgrade("cooking"));
  el.kitchenChefUpgrade.addEventListener("click", () => purchaseKitchenUpgrade("chef"));
  el.hallInteriorUpgrade.addEventListener("click", () => purchaseInteriorUpgrade("hall"));
  el.kitchenInteriorUpgrade.addEventListener("click", () => purchaseInteriorUpgrade("kitchen"));
  el.gardenUpgrade.addEventListener("click", () => {
    if (mapControllers.garden.upgrade()) chime("upgrade");
  });
  el.atticUpgrade.addEventListener("click", () => {
    if (mapControllers.attic.upgrade()) chime("upgrade");
  });
  el.testAddMoney.addEventListener("click", () => {
    const amount = Math.floor(Number(el.testMoneyAmount.value));
    if (!Number.isFinite(amount) || amount < 1 || amount > 1_000_000_000) return;
    state.money += amount;
    chime("upgrade");
    render();
    saveProgress();
  });
  el.testResetGame.addEventListener("click", () => {
    if (!window.confirm("Tạo mới màn chơi và xóa tiến độ đã lưu?")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      window.location.reload();
    }
  });
  el.sound.addEventListener("click", () => {
    state.muted = !state.muted;
    el.sound.setAttribute("aria-pressed", String(!state.muted));
    el.sound.setAttribute("aria-label", state.muted ? "Bật âm thanh" : "Tắt âm thanh");
    if (!state.muted) chime("success");
  });

  loadProgress();
  initializeMapControllers();
  arrangeTables();
  renderFoodCounters();
  renderMapMode();
  startStaffWander();
  startChefWander();
  window.addEventListener("resize", arrangeTables, { passive: true });
  render();
})();
