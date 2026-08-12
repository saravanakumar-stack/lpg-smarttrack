# LPG SmartTrack — Design Direction

## Three Directions Considered

### Theme Name: Atlas Signal
Very Brief Intro: A premium logistics command center with deep navy surfaces, crisp cartographic lines, and electric route accents. It makes live delivery feel calm, precise, and dependable rather than noisy or industrial.
Probability: 0.07

### Theme Name: Field Ledger
Very Brief Intro: A warm editorial operations tool built around paper-like neutrals, ink typography, and measured orange markers. It would make the product feel human and service-oriented, with less emphasis on live telemetry.
Probability: 0.04

### Theme Name: Transit Mineral
Very Brief Intro: A pale mineral interface with cobalt navigation cues and soft, almost architectural map overlays. It would feel refined and spacious, prioritizing transparency and institutional trust over urgency.
Probability: 0.09

## Chosen Direction: Atlas Signal

### Design Movement
Contemporary wayfinding systems blended with premium B2B SaaS and mobility-app interaction design. The interface should feel like a dispatch room distilled into a clear, reassuring consumer product.

### Core Principles
1. **Route before decoration:** Map lines, movement, status, and ETA carry the strongest visual weight.
2. **Calm urgency:** Use a dark operational canvas and warm delivery orange only when a decision or live state needs attention.
3. **Precision with warmth:** Pair crisp utility typography with generous space, rounded surfaces, and human microcopy.
4. **One source of truth:** Customer and agent views should visibly respond to the same demo delivery state.

### Color Philosophy
Deep navy is the operational ground: confident, legible, and associated with night-time dispatch and trusted infrastructure. Electric blue maps motion and system intelligence. Cyan marks the live signal and makes the interface feel connected without drifting into neon. Delivery orange is reserved for the physical handoff, while green confirms verified completion. The background uses a cool mist neutral so the dark command surfaces feel intentional rather than heavy.

### Layout Paradigm
Use a **split command canvas**: a persistent route-aware sidebar on large screens, a wide map or map-inspired visual field in the center, and a right-side information rail for ETA, booking identity, and action. Marketing pages use offset editorial blocks and route lines rather than symmetrical centered sections. On mobile, the layout collapses into a full-width operational surface with floating ETA cards and a fixed bottom navigation bar.

### Signature Elements
- A route-line motif with small waypoint nodes used as separators, progress indicators, and section decoration.
- Live status pills with a restrained pulsing cyan dot and compact uppercase labeling.
- Rounded slate panels that feel like physical dispatch instruments, with subtle inner highlights and map-grid texture.

### Interaction Philosophy
Every interaction should answer the question, “What changed in the delivery?” Buttons provide immediate state feedback. Live updates are visible but not disruptive. The agent flow progresses linearly from start to arrived to verification, while the customer view prioritizes reassurance, clarity, and a single obvious tracking action.

### Animation
Use 180–260ms ease-out transitions for navigation, buttons, cards, and drawers. The route line should reveal progressively. The vehicle marker should interpolate along waypoints instead of teleporting, with a soft shadow and a small live ring. ETA numbers can cross-fade when recalculated. Toasts should slide in from the bottom-right on desktop and from above the bottom navigation on mobile. Keep the live dot pulsing at a low amplitude. Respect `prefers-reduced-motion` by disabling non-essential transitions and replacing marker motion with discrete updates.

### Typography System
Use **Manrope** for headings and large metrics, with a confident weight range from 600–800. Use **DM Sans** for body copy, labels, and navigation to keep dense operational UI legible. Headings should use tight tracking and short line lengths; labels use 10–12px uppercase tracking with strong contrast; body copy stays at 14–16px with relaxed leading. Never use a wall of all-caps text—reserve it for live states, IDs, and section eyebrows.

### Brand Essence
LPG SmartTrack is a demo-first delivery intelligence system for households and agents who need a trustworthy answer between booking and doorstep; it makes the last mile visible. **Precise, reassuring, connected.**

### Brand Voice
Headlines are direct and outcome-led. CTAs name the next action rather than promising vague progress. Microcopy is observant, calm, and human: it tells people what the system knows and what will happen next.

Example lines:
- “Know exactly when the cylinder will arrive.”
- “Your delivery is 1.2 km away. We’ll keep watching the route.”

### Wordmark & Logo
Use a compact monogram-like mark that fuses a location pin with the silhouette of a cylinder and a small forward-facing delivery van notch. The wordmark should be set in a custom-feeling, slightly tracked Manrope treatment with “SmartTrack” carrying the accent weight; the mark should work independently as a favicon and mobile app badge.

### Signature Brand Color
**Signal Cyan — `#37D4E5`**. It is bright enough to read as a live system signal against navy, but cool enough to feel precise rather than aggressive. Use it sparingly for route activity, live status, and the most important visual feedback.

### Implementation Reminder
All page and component files should reinforce Atlas Signal: dark operational surfaces, bright route signal, asymmetrical command layouts, clear live-state communication, and generous functional whitespace. If a choice feels decorative but does not improve route comprehension or trust, remove it.

## Style Decisions

- Product routes preserve a split command-canvas feel: branded map field as the visual anchor, dark slate panels for live state, and white cards only as secondary support surfaces.
- Every map view carries Atlas Signal overlays: Signal Cyan route emphasis, waypoint nodes, controlled dark framing, branded legends, and clear live-state chips.
- Signal Cyan `#37D4E5` is the primary live-system color. Generic blue remains a secondary action and navigation color; delivery orange stays reserved for the vehicle and handoff moment.
- Verification is treated as a secure handoff instrument, not a detached centered form: it should visually conclude the route journey with progress, state, and trust cues.
- SmartTrack’s wordmark gets a stronger accent distinction so the brand feels like a delivery intelligence system rather than a generic tracking app.
