# ==========================================
# SYSTEM OVERVIEW PROMPT (NHẬP TRƯỚC TIÊN)
# ==========================================

**System Prompt for AI Coding Assistant**

You are an expert Front-end engineer specializing in high-performance, complex mobile web animations (Motion UX).

**Core Tech Stack:**
- Framework: React (with Next.js or Vite)
- Stylings: Tailwind CSS
- Core Animation Library: Framer Motion (Preferred) OR GSAP
- Interactive 3D: React Three Fiber (R3F) & Drei

**Target Platform:** Mobile devices only (optimize for touch events, performance, and small screens).
**Aesthetic:** Modern, sleek, "anti-gravity" theme, luxurious yet innovative.

---

# ==========================================
# PROMPT 1: MÀN HÌNH MỞ ĐẦU (THE HOOK - 3D ENVELOPE)
# ==========================================

**Task:** Create an opening screen for a mobile wedding invitation.

**Description:**
Start with a realistic 3D envelope (using React Three Fiber and Drei). The envelope must look "closed" with a custom initial wax seal (e.g., 'A & L'). Place it centered against a dynamic, softly glowing purple/blue nebula background (use Three.js particles or a simple shader).

**Interactions:**
1. **The Gesture:** The user must perform a vertical "swipe up" gesture starting from the wax seal.
2. **The Tear:** As the user swipes up, animate the wax seal breaking and the top flap of the envelope tearing open in a 3D animation (or a realistic mask transition).
3. **The Reveal:** Upon completion of the tear, the inner invitation card (a React component/div) must automatically "fly out" towards the viewer, scaling up smoothly to fill the entire mobile screen, transitioning from a 3D object to a 2D full-screen layout.

**Requirements:**
- Use `@react-three/fiber`, `@react-three/drei`, and `framer-motion` for the transition to 2D.
- Include subtle lighting on the 3D envelope for realism.
- Render the text "VUỐT ĐỂ XÉ PHONG BÌ" floating near the seal.

---

# ==========================================
# PROMPT 2: ALBUM KỂ CHUYỆN (TINDER STACK)
# ==========================================

**Task:** Build a mobile-optimized Storytelling Photo Stack.

**Component Data Structure (JSON):**
```json
[
  { "image": "", "story": "Lần đầu gặp gỡ..." }, // Dùng ảnh ở folder public
  { "image": "", "story": "Chuyến đi đầu tiên cùng nhau..." }, // Dùng ảnh ở folder public
  { "image": "", "story": "Và rồi, lời cầu hôn..." }// Dùng ảnh ở folder public
  /// thêm càng nhiều càng tốt
]

Description:
Render these photos as a stacked "deck of playing cards" (Card Stack). Only the top card is fully visible. The cards below should be slightly scaled down and rotated to suggest a physical stack.

Interactions:

Swipe Action: The user can use a touch gesture to swipe the top card either Left or Right (Tinder style).

Animation:

During Swipe: The card must follow the finger with realistic rotation based on swipe velocity.

Release (Toss): If swiped far enough, animate the card flying off-screen completely. If not, animate it snapping back to the center.

Next Card: When a card is tossed, the card immediately underneath must smoothly animate/scale up to become the new active top card.

Content Reveal: When a card is flying away, subtly reveal the story text fragment underneath the whole stack before the next card fully settles.

Requirements:

Use framer-motion's usePanGesture or a gesture library like @use-gesture/react.

Cards should have a subtle drop shadow for depth.

Must be smooth on mobile (use layoutId if needed).

==========================================
PROMPT 3: TRẢI NGHIỆM ÂM THANH (AUDIO-REACTIVE)
==========================================
Task: Create an audio-reactive visualizer background for a mobile wedding card.

Description:
Develop a full-screen background visualization. This visualizer should consist of either dynamic particle waves or interconnected abstract glowing lines. The overall look should feel magical and "anti-gravity."

Interactions:

Trigger: The visualization activates only when the background music (e.g., an MP3 file) starts playing.

Reactivity: Integrate with the Web Audio API (AudioContext). The visualization must analyze the frequency data (e.g., Bass/Mid/Treble). When the "beat drops" (high amplitude), the particles should pulse, move faster, or increase in density rhythmically.

Requirements:

Use React with either react-three-fiber (for 3D particles) or <canvas>/WebGL (for high performance).

Provide a simple Play/Pause button that controls both the audio and the visualization.

Ensure the animation remains smooth (>30fps) on mobile while playing audio.

==========================================
PROMPT 4: BẢN ĐỒ TƯƠNG TÁC CÁ NHÂN HÓA
==========================================
Task: Create an interactive, illustrative scroll-bound map component.

Component Assets:

An illustrative background image (map_base.png or map_base.svg): styled like a playful watercolor or cartoon map, not a Google Map.

Two marked locations on the map: 'LỄ CƯỚI' (Ceremony) and 'NHÀ HÀNG' (Reception).

An animated icon asset (e.g., a small vintage wedding car or a couple walking).

Interactions:

Scroll-Bound Animation: The map component should render in a full-screen or large section. As the user scrolls the entire wedding page (or this specific section), the car icon must smoothly travel along a pre-defined path on the map background, moving from 'LỄ CƯỚI' toward 'NHÀ HÀNG'.

Progress: The position of the car must be directly linked to the vertical scroll progress of the container. If the user scrolls up, the car moves back.

Detail Reveal: When the car reaches 'NHÀ HÀNG', the map should subtly highlight that location or reveal a details card.

Requirements:

Define the path using an SVG path (or coordinate array) and map the scroll percentage to the offset on the path.

Use framer-motion's useScroll and useTransform or GSAP's ScrollTrigger + MotionPathPlugin.

The map background must be optimized for mobile (crisp images/SVG).