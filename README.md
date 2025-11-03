# Awakening Grid — Aayush's Interactive Portfolio

A cinematic Next.js portfolio that creates immersive experiences through fluid ocean backgrounds, interactive fish animations, and mathematical precision. Built with React Three Fiber, Framer Motion, and golden-ratio design principles.

**Author**: Aayush  
**Live Demo**: [View Portfolio](https://portfolio-drab-three-87.vercel.app/)

## ✨ Features

### 🌊 Immersive Ocean Experience
- **Fluid Ocean Background**: Dynamic canvas-based ocean with animated waves that respond to scroll and mouse movement
- **Interactive Fish**: Cursor-following fish with realistic swimming animations and avoidance behavior
- **Scroll-Reactive Environment**: Ocean deepens from cream to navy blue as user scrolls through content
- **Cinematic Loading Screen**: Film strip animation with rotating logo for engaging first impression

### 🎭 Advanced Animations
- **Typewriter Hero Text**: Smooth character-by-character text reveal with customizable speed and looping
- **Enhanced Ripple Effects**: Interactive ripple animations on buttons and interactive elements
- **Tech Stack Genie**: Magical emergence animation for technology showcase with sparkle effects
- **Smooth Scroll Integration**: Lenis-powered buttery smooth scrolling with momentum

### 🎨 Mathematical Design System
- **Golden Ratio Typography**: Fibonacci-based type scale (13px → 89px)
- **Cohesive Color Palette**: Ocean-inspired colors with smooth transitions
- **Responsive Scaling**: Fluid typography using clamp() functions
- **Accessibility First**: WCAG AA compliant with reduced motion support

## 🎨 Design System

### Color Palette
```css
--beige: #F2E8CF        /* Primary background */
--burnt-orange: #E76F51  /* Accent color */
--charcoal: #1F2328     /* Text and UI elements */
--deep-teal: #153D3A    /* Secondary text */
--cream: #FAF7F2        /* Light backgrounds */
--gold: #C9A24A         /* Accent highlights */
```

### Typography Scale (Golden Ratio)
```typescript
small: 13px    // Small text
base: 21px     // Body text
h3: 34px       // Section headings
h2: 55px       // Major headings
h1: 89px       // Hero text
```

### Fonts
- **Display**: Clash Display (Fontshare) - For headings and hero text
- **Sans**: Inter (Google Fonts) - For body text and UI

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🏗️ Project Architecture

### Directory Structure
```
awakening-grid/
├── public/
│   ├── placeholders/        # Project placeholder images
│   └── resume.pdf          # Downloadable resume
├── src/
│   ├── app/
│   │   ├── globals.css     # Global styles and CSS variables
│   │   ├── layout.tsx      # Root layout with metadata
│   │   └── page.tsx        # Main page composition
│   ├── components/
│   │   ├── ClientWrapper.tsx       # Client-side wrapper with Lenis
│   │   ├── FluidOceanBackground.tsx # Canvas ocean animation
│   │   ├── CursorFish.tsx          # Interactive cursor fish
│   │   ├── Hero.tsx                # Hero section with typewriter
│   │   ├── Header.tsx              # Navigation header
│   │   ├── SectionFeatured.tsx     # Featured projects
│   │   ├── SectionAbout.tsx        # About section
│   │   ├── SectionTechStack.tsx    # Animated tech showcase
│   │   ├── SectionContact.tsx      # Contact information
│   │   ├── LoadingScreen.tsx       # Cinematic loading animation
│   │   ├── EnhancedRipple.tsx      # Interactive ripple effects
│   │   ├── ReturnToTop.tsx         # Scroll to top button
│   │   └── UIComponents.tsx        # Reusable UI components
│   ├── lib/
│   │   └── constants.ts            # Design tokens and configuration
│   └── data/                       # Static content data
├── tailwind.config.ts              # Tailwind CSS configuration
├── next.config.ts                  # Next.js configuration
└── package.json                    # Dependencies and scripts
```

### Key Technologies

#### Core Framework
- **Next.js 15**: React framework with App Router and Turbopack
- **React 19**: Latest React with concurrent features
- **TypeScript 5**: Full type safety and developer experience

#### Animation & Interaction
- **Framer Motion 12**: Declarative animations and gestures
- **GSAP 3**: High-performance timeline animations
- **Lenis**: Smooth scroll with momentum and easing

#### 3D & Graphics
- **React Three Fiber 9**: React renderer for Three.js
- **Three.js 0.180**: 3D graphics and WebGL
- **@react-three/drei**: Useful helpers for R3F

#### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Beautiful SVG icons
- **Custom CSS**: Canvas animations and advanced effects

#### State & Data
- **Zustand 5**: Lightweight state management
- **Custom Hooks**: Reusable logic for animations and interactions

## 🎮 Interactive Features

### Ocean Background System
```typescript
// Dynamic wave generation with mouse influence
const waves = [
  { amplitude: 50, frequency: 0.02, speed: 0.01 },
  { amplitude: 30, frequency: 0.03, speed: 0.015 },
  // ... more wave configurations
];

// Fish swimming with avoidance behavior
const fishCount = 12 + Math.floor(scrollProgress * 8);
// Fish run away from cursor with realistic physics
```

### Typewriter Animation
```typescript
// Character-by-character reveal with customizable timing
<TypewriterText
  text="I am just a Human"
  delay={0}
  speed={30}
  onComplete={handleComplete}
  loop={isInViewport}
  minCharsVisible={2}
/>
```

### Tech Stack Genie Animation
- **Batch System**: Technologies appear in groups of 5
- **Emergence Effect**: Items scale and emerge from a central point
- **Sparkle Effects**: Magical particles and shimmer animations
- **Scroll Synchronization**: Animation tied to scroll progress

### Enhanced Ripple Effects
```typescript
// Configurable ripple intensity and styling
<OceanRipple className="rounded-lg" intensity="high">
  <button>Interactive Button</button>
</OceanRipple>
```

## 🔧 Performance Optimizations

### Canvas Rendering
- **Single Canvas Layer**: All ocean effects on one optimized canvas
- **RequestAnimationFrame**: Smooth 60fps animations
- **Mouse Throttling**: Debounced pointer events for better performance
- **Viewport Culling**: Only render visible elements

### Code Splitting
- **Dynamic Imports**: Lazy loading of heavy components
- **Client-Side Hydration**: Proper SSR/CSR boundaries
- **Asset Optimization**: Optimized images and fonts

### Memory Management
- **Cleanup Functions**: Proper event listener and animation cleanup
- **Ref Management**: Efficient DOM and canvas references
- **State Optimization**: Minimal re-renders with optimized state

## 📱 Responsive Design

### Breakpoint Strategy
```css
/* Mobile-first approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
```

### Adaptive Features
- **Touch Optimization**: Enhanced touch interactions for mobile
- **Reduced Complexity**: Simplified animations on smaller screens
- **Fluid Typography**: Responsive text scaling with clamp()
- **Flexible Layouts**: CSS Grid and Flexbox for all screen sizes

## ♿ Accessibility Features

### Keyboard Navigation
- **Focus Management**: Visible focus indicators throughout
- **Tab Order**: Logical navigation flow
- **Skip Links**: Quick navigation to main content

### Motion & Animation
```css
/* Respects user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **ARIA Labels**: Descriptive labels for interactive elements
- **Alt Text**: Meaningful descriptions for visual content

## 🧪 Development & Testing

### Available Scripts
```bash
# Development with Turbopack (faster builds)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Code Quality
- **ESLint**: Code linting with Next.js config
- **TypeScript**: Strict type checking
- **Prettier**: Code formatting (recommended)

### Performance Monitoring
- **Core Web Vitals**: Optimized for Google's performance metrics
- **Lighthouse Scores**: Target 90+ performance on desktop
- **Bundle Analysis**: Monitor bundle size and optimization

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Environment Variables
```env
# Add any required environment variables
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Build Optimization
- **Static Generation**: Pre-rendered pages for better performance
- **Image Optimization**: Automatic WebP conversion and sizing
- **Font Optimization**: Preloaded fonts with display: swap

## 🎯 Browser Support

### Modern Browsers (Full Experience)
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

### Requirements
- **Canvas Support**: Required for ocean background
- **ES2020**: Modern JavaScript features
- **CSS Grid**: Layout system
- **WebGL**: Enhanced graphics (graceful degradation)

### Fallbacks
- **No Canvas**: Static background gradient
- **Reduced Motion**: Simplified animations
- **Older Browsers**: Basic functionality maintained

## 📊 Performance Metrics

### Target Scores
- **Lighthouse Performance**: 90+ (desktop), 70+ (mobile)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

### Optimization Techniques
- **Code Splitting**: Dynamic imports for non-critical code
- **Image Optimization**: Next.js automatic optimization
- **Font Loading**: Preload critical fonts
- **Caching Strategy**: Aggressive caching for static assets

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with descriptive messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### Code Style
- Follow existing TypeScript patterns
- Use meaningful component and variable names
- Add comments for complex animations or calculations
- Ensure accessibility compliance

## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio!

## 🙏 Acknowledgments

- **Design Inspiration**: Ocean themes and mathematical precision
- **Animation Libraries**: Framer Motion and GSAP communities
- **Typography**: Golden ratio principles in web design
- **Performance**: Next.js and Vercel optimization best practices

---

*"Engineering light through code. Creating experiences that blur the line between digital and physical reality."* — Aayush

**Contact**: aayushkr646@gmail.com  
