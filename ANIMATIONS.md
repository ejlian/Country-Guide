# Landing Page Animations & Effects

## Overview
The redesigned landing page features a modern UI/UX with sophisticated animations and interactive effects that create an immersive user experience.

---

## 🎬 Hero Section - Dynamic Rotating Landmarks

### Features:
- **Rotating Background Carousel**: 5 global landmarks that automatically rotate every 5 seconds
  - Paris, France
  - London, UK
  - Swiss Alps
  - Santorini, Greece
  - Tokyo, Japan

### Animations:
- ✨ Smooth 2-second fade transitions between landmark images
- 🌟 Floating particle effects with random positioning and timing
- 💫 Animated gradient overlay with subtle pulse effect
- 📍 Location badge showing current landmark with sparkle icons
- 🎯 Fade-in and slide-up animations on page load

### Technical Details:
```typescript
// Auto-rotation every 5 seconds
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentLandmark((prev) => (prev + 1) % heroLandmarks.length);
  }, 5000);
  return () => clearInterval(interval);
}, []);
```

---

## 🔍 Enhanced Search Bar

### Features:
- **Predictive Text Search**: Real-time filtering of country suggestions
- **Smart Suggestions Dropdown**: Shows matching countries as you type
- **Visual Feedback**: Focus states and hover effects

### Animations:
- 🔵 **Focus Effect**: 
  - 4px blue ring glow
  - 5% scale increase
  - Shadow enhancement
- 🔍 **Hover State**: 
  - Subtle scale (1.02x)
  - Blue shadow tint
- 📋 **Dropdown Animation**: 
  - Slide-down entrance
  - Staggered item appearance (50ms delay per item)
- 🎯 **Button Hover**: 
  - 10% scale increase
  - Enhanced shadow

### Technical Details:
```typescript
// Dynamic suggestion filtering
useEffect(() => {
  if (searchQuery.trim()) {
    const filtered = searchSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0 && searchFocused);
  }
}, [searchQuery, searchFocused]);
```

---

## 🏔️ Featured Destinations - Parallax Effect

### Features:
- **Interactive Parallax Scrolling**: Cards move at different speeds based on scroll position
- **Alternating Motion**: Even/odd cards move in opposite directions
- **Rich Hover Interactions**: Multiple layered effects

### Animations:
- 🌊 **Parallax Effect**: 
  - Vertical translation based on scroll position
  - Smooth 0.1s ease-out transitions
  - Max 20px displacement
- 🎴 **Card Hover Effects**:
  - **Scale**: 5% increase (1.05x)
  - **Lift**: -8px vertical translation
  - **Shadow**: 2xl shadow enhancement
  - **Border**: Blue border fade-in
- 🖼️ **Image Effects**:
  - 25% zoom (1.25x scale)
  - 2-degree rotation
  - 700ms smooth transition
  - Shine sweep effect on hover
- 🎨 **Overlay**:
  - Gradient fade from bottom
  - Opacity transition on hover
- 📍 **Region Badge**:
  - 10% scale on card hover
- 🎯 **Animated Underline**:
  - Expands from 0 to full width
  - Gradient color (blue to purple)
- ⚡ **Shine Effect**:
  - Diagonal sweep across image
  - White gradient overlay
  - 1-second sweep duration

### Technical Details:
```typescript
const parallaxY = scrollY * 0.05 * (index % 2 === 0 ? 1 : -1);
transform: `translateY(${Math.min(Math.abs(parallaxY), 20)}px)`
```

---

## 🌍 Popular Countries - Advanced Hover Animations

### Features:
- **Multi-layer Hover Effects**: Complex animation composition
- **Gradient Backgrounds**: Dynamic color transitions
- **Interactive Elements**: Button reveals and glow effects

### Animations:
- 🎴 **Card Hover**:
  - **Lift**: -12px vertical translation
  - **Shadow**: 2xl shadow
  - **Border**: Blue border (2px)
  - **Background**: Gradient overlay fade-in (blue → purple → pink)
- 🚀 **Corner Accent**:
  - Animated blur circle in top-right
  - Moves closer on hover
  - Opacity increase
- 🏴 **Flag Animation**:
  - 25% scale increase (1.25x)
  - 12-degree rotation
  - Drop shadow enhancement
  - Glow halo effect
- 📝 **Text Effects**:
  - Name: Gradient text (blue to purple)
  - Description: Color intensification
- 🔘 **Explore Button**:
  - Hidden by default
  - Slides up (translateY: 16px → 0)
  - Fade in (opacity: 0 → 1)
  - Gradient background (blue to purple)
  - Arrow slides right on hover
- ⚡ **Pulse Border**:
  - Animated border with pulse effect
  - Scale variation (1.0 to 1.02)
  - Opacity pulsing

### Staggered Entry:
- Each card has a delayed fade-in
- 150ms delay between cards
- Creates wave effect on page load

---

## 🎨 Global CSS Animations

### Custom Keyframes:

#### `@keyframes float`
- Floating particle effect
- Vertical and horizontal movement
- Opacity variation (0.3 to 0.6)
- Smooth ease-in-out

#### `@keyframes slide-up`
- Entry animation
- 30px upward movement
- Fade-in effect

#### `@keyframes slide-down`
- Dropdown animation
- 10px downward entry
- Quick fade-in

#### `@keyframes fade-in`
- Simple opacity transition
- 0 to 1

#### `@keyframes pulse-slow`
- Slow pulsing effect
- 8-second duration
- Opacity variation (0.5 to 0.7)

#### `@keyframes pulse-border`
- Border pulsing
- Scale variation (1.0 to 1.02)
- Opacity pulsing (0.5 to 1.0)
- 2-second cycle

### Utility Classes:
- `.animate-float` - Floating effect
- `.animate-slide-up` - Slide up entry
- `.animate-slide-down` - Dropdown animation
- `.animate-fade-in` - Fade in effect
- `.animate-pulse-slow` - Slow pulse
- `.animate-pulse-border` - Border pulse
- `.animation-delay-200` - 200ms delay
- `.animation-delay-400` - 400ms delay
- `.animation-delay-600` - 600ms delay
- `.hover:scale-102` - Subtle hover scale

---

## 🎯 Performance Optimizations

1. **Passive Scroll Listener**: Prevents scroll blocking
   ```typescript
   window.addEventListener("scroll", handleScroll, { passive: true });
   ```

2. **CSS Transform Animations**: Using `transform` and `opacity` for GPU acceleration

3. **Image Optimization**: Proper rendering hints
   ```css
   img {
     image-rendering: -webkit-optimize-contrast;
     image-rendering: crisp-edges;
   }
   ```

4. **Smooth Scrolling**: Native browser support
   ```css
   html {
     scroll-behavior: smooth;
   }
   ```

---

## 🎭 Animation Timing

| Element | Duration | Easing | Delay |
|---------|----------|--------|-------|
| Hero fade-in | 1000ms | ease-out | 0ms |
| Hero slide-up | 800ms | ease-out | 0-400ms |
| Landmark rotation | 2000ms | ease | 5000ms interval |
| Search focus | 300ms | ease | 0ms |
| Suggestion dropdown | 300ms | ease-out | 0-50ms per item |
| Featured card hover | 500ms | ease | 0ms |
| Image zoom | 700ms | ease | 0ms |
| Parallax | 100ms | ease-out | 0ms |
| Country card hover | 500ms | ease | 0ms |
| Flag rotation | 500ms | ease | 0ms |
| Button reveal | 500ms | ease | 0ms |

---

## 🌟 User Experience Enhancements

1. **Progressive Disclosure**: Elements reveal as user scrolls
2. **Visual Feedback**: Every interaction has visual response
3. **Smooth Transitions**: No jarring movements
4. **Accessibility**: Maintains focus states and keyboard navigation
5. **Performance**: Optimized for 60fps animations
6. **Responsive**: All animations work on mobile devices

---

## 📱 Responsive Behavior

- Animations scale appropriately on smaller screens
- Parallax effect is subtle to prevent motion sickness
- Touch-friendly hover states on mobile
- Reduced motion for users with accessibility preferences

---

## 🔧 Technical Stack

- **React Hooks**: `useState`, `useEffect` for state management
- **Tailwind CSS**: Utility classes for styling
- **Custom CSS**: Keyframe animations
- **TypeScript**: Type-safe component logic
- **Next.js**: App Router for optimal performance
