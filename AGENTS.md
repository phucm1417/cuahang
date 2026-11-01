# Project guidance for Tiệm Nhỏ

Read this file and `GAME_OVERHAUL_PLAN.md` before substantial game changes. Keep the dated baseline in `game-package/archives/pre-upgrade-2026-11-01` intact.

## Engineering

- Preserve existing gameplay and saved data unless the user explicitly asks to change them. Inspect the current implementation and call sites before editing a mechanic.
- Keep map controllers and game systems focused, small, and loosely coupled. Extend the existing vanilla JavaScript patterns; do not add a framework or dependency without a concrete need.
- Validate user input and state transitions, guard missing DOM nodes, and clean up timers/listeners when an area or activity ends.
- Prefer targeted edits over duplicate implementations. Keep naming descriptive and data contracts clear.
- For larger changes, outline the affected systems and tradeoffs briefly, then implement in reviewable increments. Do not expose private chain-of-thought; communicate conclusions and rationale only.
- Do not add explanatory titles, labels, or tutorial captions to the play map. Use existing icons, visual states, and accessible names instead.
- Do not run a test suite unless requested. Run appropriate syntax/static checks and report exactly what was checked.

## Art and animation

- Follow the art direction in `GAME_OVERHAUL_PLAN.md`. Keep characters, food, props, maps, and UI in one coherent palette, outline weight, scale, and camera perspective.
- Use transparent backgrounds for isolated sprites, consistent frame dimensions and padding, and stable bottom-center pivots for grounded characters.
- Design a clear silhouette first. Keep contours readable at gameplay size; prefer rounded stepped silhouettes to rigid square forms.
- Use anticipation, arcs, easing, follow-through, and subtle squash/stretch where they improve readability. Idle loops should feel alive without drifting from their pivot; walk loops must tile cleanly.
- Check sprite bounds, transparency, palette, pixel sharpness, and neighboring frames before integrating an asset. Do not stretch a sprite to fit; adjust its layout or render size intentionally.
