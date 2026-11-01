# Tiệm Nhỏ — gameplay, art, and effects overhaul

## Goal

Grow the current restaurant prototype into a readable, lively, mobile-friendly cozy management game. The player should be able to understand what each guest is doing at a glance, move between the hall, garden, kitchen, and attic without losing control, and feel steady progress without waiting through long idle periods.

Keep the current game runnable throughout the work. The baseline before this overhaul is preserved in `game-package/archives/pre-upgrade-2026-11-01`.

## Current baseline

- The game is a dependency-free HTML/CSS/JavaScript project. `game.js` owns most orchestration, rendering, staff tasks, service, guest seating, and save data.
- `maps/` contains the registry and separate restaurant, kitchen, garden, and attic controllers. `systems/` already has early character, journey, movement, area, navigation, economy, upgrade, trade, and mini-game modules.
- The player selects any area on the mini map and has a direct hall/kitchen switch. Guests are invited at the hall and can receive a random 1–3 area itinerary.
- The garden already supports planting, watering, harvesting, wandering guests, and a buyer queue. The attic has entertainment visitors and a reflex mini-game. These flows still need a shared lifecycle and careful transition/capacity handling.
- Art currently mixes SVG scene art, PNG food sprites, and directional character sprites. The overhaul should establish shared scale and rendering rules before replacing assets.

## Product and gameplay design

### World layout and navigation

- Keep one public entrance at the main hall. The hall is the hub; the garden is to its left, the kitchen to its right, and the attic below it.
- The mini map is the universal area selector. The separate arrow button only switches between hall and kitchen.
- Treat garden and attic connections as doors/stairs branching from the hall. Show the customer entering from the hall and walking to a branch when that view is available; show a consistent connector arrival in the destination map.
- Keep staff routing local to their work area unless a task explicitly transfers food or an order between kitchen and hall.

### Guest lifecycle

Use one persistent customer identity and sprite across an itinerary. Model the lifecycle explicitly:

`invited → entering hub → travelling → performing activity → waiting/served → travelling → next activity → leaving`

- Generate 1–3 distinct activities from restaurant, garden, and attic, then shuffle their order. Do not include kitchen as a customer activity.
- Use one journey owner to advance the itinerary. Area controllers report outcomes; they do not create replacement customer identities or advance the itinerary independently.
- Restaurant guests sit at an available table. When all tables are occupied, they walk to the hall queue; queued dining guests take priority when a table opens.
- Garden guests choose between buying a crop and exploring the garden. Buyers join one ordered market queue; only the first buyer can complete a purchase. Visitors who only explore wander among safe garden waypoints before leaving.
- Attic guests explore and choose an entertainment activity, then pay on completion. The player’s mini-game remains an independent interaction and must not interrupt guest timers or rewards.
- Bound total active itineraries and each area’s visitors. If a destination is full, keep the guest’s identity and itinerary and retry safely instead of duplicating or dropping the customer.
- Give every transition/activity a cancellation token or lifecycle handle so stale timers cannot move, reward, or remove a guest twice.

### Pacing and feedback

- Keep the invitation rhythm responsive. Shorten waiting caused by inactive staff or kitchen tasks before increasing raw game speed globally.
- Separate prep time, walk time, service time, and guest dwell time so each can be balanced and upgraded independently.
- Give each useful action immediate feedback: order accepted, cooking started, dish ready, sale completed, reward collected, and upgrade purchased.
- Make currencies and reputation legible through compact counters and localized effects. Keep reward values in data/configuration rather than scattering formulas through render code.
- Avoid long blocking dialogs. All panels remain floating and non-blocking; game-map controls stay interactive behind them.

## Art direction

### Style: warm storybook pixel illustration

- Use a consistent 64×64 logical grid for standard props/food icons; use 64×96 or 64×128 character frames where the silhouette needs height. Export at integer scale for crisp browser rendering.
- Use a limited warm palette: cream and honey highlights, walnut outlines, muted leaf greens, tomato/coral accents, and cool blue-gray shadows. Reserve saturated colors for actionable states and rewards.
- Keep a consistent 1–2 logical-pixel dark warm outline. Build rounded forms with stepped pixel contours; avoid noisy single pixels, double outlines, overly square corners, and blurred resampling.
- Match the existing slightly elevated three-quarter room view. Grounded characters and furniture share a stable floor plane and bottom-center pivot. Wall props remain orthographic to the wall plane.
- Isolate reusable actors, food, and props on transparent backgrounds. Use uniform frame boxes and padding to prevent clipping in sprite sheets and CSS transforms.
- Favor readable silhouettes and warm material details over extra texture. At final on-screen size, each dish and prop must be recognizable without a label.

### Character animation set

- Idle: 4–8 loopable frames for breathing and small weight shifts; preserve the foot pivot and use restrained squash/stretch.
- Walk: 6–8 loopable frames with contact, passing, rise, and settle poses. Use 4- or 8-direction sets consistently with current sprite lookup.
- Actions: 4–8 frames for carrying, serving, buying, watering, harvesting, cooking, and paying. Include anticipation before contact and follow-through after it.
- Keep each animation’s frame timing and pivot consistent. Direction changes should follow the route tangent instead of snapping to a fixed direction.

### Effects and sound

- Door: open only as the character reaches the threshold, close after the body clears it. Keep the character visible above the floor but below door/foreground trim where appropriate.
- Movement: ease along waypoints, use short arcs for turns, and apply footstep bob without altering the world-space pivot. Idle breathing should continue for every actor.
- Food: steam while cooking, a brief plating sparkle when ready, and a clear but small transfer effect between counters. Avoid covering order bubbles or food slots.
- Money: one bubble per table; increase bubble size gently as value stacks, then use a quick pickup arc and a small coin burst. Avoid repeated coin clones.
- Guest emotion: brief emote bubbles with consistent art and timing; positive/negative reputation changes must be visible and attributable to the guest.
- Reuse a small sound set for clicks, invites, orders, cooking, sales, rewards, and upgrades. Keep volume modest and respect the mute control.
- Support reduced motion and ensure all touch targets remain usable on portrait screens.

## Target code structure

Keep the current entry point and migrate behavior incrementally rather than rewriting the game in one pass.

```text
game.js                     bootstrap and top-level orchestration only
systems/
  characters.js             identity and actor setup
  journeys.js               itinerary state machine and lifecycle tokens
  movement.js               path following, facing, arrival, cancellation
  areas.js                  area ids, graph, connectors, layout metadata
  map-navigation.js         mini-map selection and direct hall/kitchen switch
  economy.js                wallet, reputation, rewards, transactions
  upgrades.js               upgrade catalog, costs, effects
  trade.js                  crops, stock, buyer queue, sale transaction
  games.js                  mini-game lifecycle and reward contract
  effects.js                reusable visual/audio feedback
maps/
  <area>.js                 area rendering, local interactions, visitor waypoints
ui/                         shared modal, HUD, counter, and responsive controls
assets/                     sprites, scene backgrounds, effects, and audio
```

Contracts: area controllers receive a customer and cancellation-aware callbacks; only the journey system advances itinerary state. Economy owns all money/reputation changes. Rendering reads state and does not silently mutate it. Keep persistence versioned and migrate old saves without deleting player progress.

## Delivery phases

1. **Stabilize the baseline:** map current functions to the systems above; define journey/area contracts; identify timers and shared currency writes. Preserve old saves and current mechanics.
2. **Unify guest lifecycle:** move itinerary ownership, activity results, retries, queue limits, and cancellation into `journeys.js`. Keep existing restaurant/garden/attic visuals while verifying each activity transition.
3. **Refine movement and staging:** standardize connectors, waypoints, z-order, pivots, facing, door triggers, idle loops, and collision-safe garden/attic wandering.
4. **Apply the art bible:** produce a style sheet and reusable sprite templates first, then refresh one character set, food set, and area prop set at a time. Integrate only after size, alpha, padding, palette, and in-game scale checks.
5. **Add effects and pacing:** implement shared effects/audio, shorten bottlenecks by subsystem, rebalance reward curves, and make all feedback clear without adding explanatory captions to the map.
6. **Polish mobile and performance:** verify portrait/landscape layouts, touch interaction, reduced motion, timer cleanup, save migration, and asset loading. Keep a runnable package and publish only complete, reviewable increments.

## Acceptance criteria

- Every invited guest enters through the hall, keeps one identity/sprite, performs 1–3 distinct activities in order, and exits cleanly. No guest is duplicated, lost, or rewarded twice when an area is full or the player changes maps.
- Hall seating/queue priority, garden buyer priority, free garden/attic wandering, sales, and mini-game rewards work independently and during other activities.
- Area selection matches the specified world layout; direct switching only connects hall and kitchen.
- Characters have readable idle and walk loops, face travel direction, pass through doors at the correct time, and layer correctly against furniture.
- Food/prop sprites share the art bible and remain sharp, rounded, padded, transparent, and recognizable at actual gameplay size.
- Effects clarify actions without obscuring map interaction; panels remain non-blocking; no new explanatory map captions are introduced.
- Existing saves load safely and all core systems can be located and edited without tracing the entire game through one monolithic function.
