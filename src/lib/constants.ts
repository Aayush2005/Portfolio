// Design tokens based on golden ratio
export const GOLDEN_RATIO = 1.618;
export const BASE_UNIT = 8;

// Color palette
export const COLORS = {
  beige: '#F2E8CF',
  burntOrange: '#E76F51',
  charcoal: '#1F2328',
  deepTeal: '#153D3A',
  cream: '#FAF7F2',
  gold: '#C9A24A',
} as const;

// Typography scale (Fibonacci-based)
export const TYPE_SCALE = {
  small: 13,
  base: 21,
  h3: 34,
  h2: 55,
  h1: 89,
} as const;

// Animation durations
export const DURATIONS = {
  heroIntro: 2.8,
  heroMorph: 0.6,
  textReveal: 0.8,
  subtitleReveal: 0.6,
} as const;

// Grid configuration
export const GRID_CONFIG = {
  tiltAngle: { min: 8, max: 18 },
  cellColors: {
    beige: 0.7,
    burntOrange: 0.25,
    gold: 0.05,
  },
  noiseScale: 0.01,
  animationSpeed: 0.0005,
} as const;