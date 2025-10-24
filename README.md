# The Awakening Grid — Personal Portfolio

A cinematic Next.js portfolio that elicits awe through GPU-driven backgrounds, tactile hover interactions, and mathematical precision. Built with React Three Fiber, GSAP, and golden-ratio typography.

## ✨ Features

- **Interactive Grid Background**: CSS-based animated grid with hover effects and smooth transitions
- **Cinematic Hero Intro**: Typewriter text animation with staggered reveals
- **Mathematical Design**: Golden ratio typography scale and Fibonacci-based animations
- **Smooth Scrolling**: Lenis integration for buttery-smooth inertial scrolling
- **Responsive Design**: Adaptive layouts and hover effects
- **Accessibility**: Full keyboard navigation, reduced motion support, proper contrast

## 🎨 Design System

### Color Palette
- **Beige**: `#F2E8CF` - Primary background
- **Burnt Orange**: `#E76F51` - Accent color
- **Charcoal**: `#1F2328` - Text and lines
- **Deep Teal**: `#153D3A` - Secondary text
- **Cream**: `#FAF7F2` - Light backgrounds
- **Gold**: `#C9A24A` - Accent highlights

### Typography Scale (Golden Ratio)
- Small: 13px
- Base: 21px
- H3: 34px
- H2: 55px
- H1: 89px

### Fonts
- **Display**: Clash Display (via Fontshare)
- **Sans**: Inter (via Google Fonts)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd awakening-grid

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🏗️ Architecture

### Project Structure
```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   ├── AnimatedGrid.tsx     # Interactive CSS grid background
│   ├── Hero.tsx             # Hero section with animations
│   ├── Header.tsx           # Navigation component
│   ├── ProjectCard.tsx      # Project display cards
│   └── FeaturedProjects.tsx # Projects section
├── lib/                 # Utilities and constants
│   ├── constants.ts         # Design tokens
│   └── noise.ts            # Seeded noise functions
└── data/               # Static data
    └── projects.json       # Project information
```

### Key Technologies
- **Next.js 15**: React framework with app router
- **GSAP**: Timeline-based animations
- **Lenis**: Smooth scrolling
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety

## 🎮 Interactive Features

### Grid Background
- **Interactive Cells**: CSS-based grid with hover animations and color transitions
- **Smooth Transforms**: Scale and rotation effects on hover
- **Randomized Colors**: Procedurally colored cells with accent highlights
- **Responsive Layout**: Adaptive grid sizing and positioning

### Animations
- **Hero Intro**: 2.8s cinematic reveal sequence
- **Text Reveals**: Staggered typography animations with phi-based timing
- **Project Cards**: Fibonacci-indexed entrance delays
- **Scroll Interactions**: Smooth inertial scrolling with Lenis

## 🔧 Performance Optimizations

- **Single Canvas**: All WebGL effects rendered on one canvas layer
- **Adaptive Quality**: Reduced shader complexity on lower-end devices
- **Debounced Mouse**: Throttled pointer events to save GPU cycles
- **Texture Atlasing**: Optimized draw calls for better performance
- **Lazy Loading**: Secondary scenes loaded after hero animation

## 📱 Responsive Design

- **Mobile-First**: Optimized for touch interactions
- **Adaptive Effects**: Reduced complexity on mobile devices
- **Touch Gestures**: Enhanced touch multiplier for smooth scrolling
- **Viewport Scaling**: Fluid typography using clamp() functions

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant contrast ratios

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

## 📊 Performance Targets

- **Lighthouse Performance**: 90+ (desktop), 60+ (mobile)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🚀 Deployment

Optimized for Vercel deployment with:
- Edge caching enabled
- Image optimization
- Incremental static regeneration
- Automatic performance monitoring

```bash
# Deploy to Vercel
vercel --prod
```

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

WebGL2 support required for full shader effects. Graceful degradation for older browsers.

## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio!

---

*"Make it feel inevitable. Make it feel mathematical. Make a recruiter think you didn't just design — you engineered light."*