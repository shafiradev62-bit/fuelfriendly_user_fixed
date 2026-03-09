# 🎨 Super Smooth Animations & Beragam Snack Guide

## 📦 Import Components

```tsx
// Animations
import AnimatedPage, { 
  AnimatedChild, 
  AnimatedCard, 
  AnimatedButton,
  pageVariants,
  childVariants,
  easings 
} from './components/AnimatedPage';

// Snacks
import { SnackProvider, useSnack } from './components/SnackProvider';
```

---

## 🎬 Super Smooth Page Transitions

### 7 Variant Animasi Halaman

```tsx
// 1. Slide Right (iOS style) - Default
<AnimatedPage variant="slideRight">
  <YourContent />
</AnimatedPage>

// 2. Slide Up (Modal style)
<AnimatedPage variant="slideUp">
  <YourContent />
</AnimatedPage>

// 3. Fade Scale (Elegant)
<AnimatedPage variant="fadeScale">
  <YourContent />
</AnimatedPage>

// 4. 3D Flip (Dramatic)
<AnimatedPage variant="flip">
  <YourContent />
</AnimatedPage>

// 5. Slide Left (Back navigation)
<AnimatedPage variant="slideLeft">
  <YourContent />
</AnimatedPage>

// 6. Zoom (Pop effect)
<AnimatedPage variant="zoom">
  <YourContent />
</AnimatedPage>

// 7. Bouncy (Playful)
<AnimatedPage variant="bouncy">
  <YourContent />
</AnimatedPage>
```

### Staggered Children

```tsx
<AnimatedPage variant="slideRight" enableStagger={true}>
  <motion.div variants={childVariants}>Item 1</motion.div>
  <motion.div variants={childVariants}>Item 2</motion.div>
  <motion.div variants={childVariants}>Item 3</motion.div>
</AnimatedPage>
```

### Animated Cards & Buttons

```tsx
// Card dengan hover lift effect
<AnimatedCard 
  className="bg-white p-4 rounded-xl shadow-lg"
  onClick={() => console.log('Clicked!')}
>
  <h3>Card Title</h3>
  <p>Card content here</p>
</AnimatedCard>

// Button dengan bounce effect
<AnimatedButton 
  className="bg-green-500 text-white px-6 py-3 rounded-lg"
  onClick={handleClick}
>
  Click Me!
</AnimatedButton>
```

---

## 🍿 Snack Notifications - Beragam & Menarik!

### Setup Provider

```tsx
// Di App.tsx atau root file
import { SnackProvider } from './components/SnackProvider';

function App() {
  return (
    <SnackProvider>
      <YourApp />
    </SnackProvider>
  );
}
```

### Quick Helpers (Paling Mudah!)

```tsx
function MyComponent() {
  const { success, error, info, warning, achievement, reward, celebration, premium, energy } = useSnack();

  return (
    <div>
      {/* Beragam snack types */}
      <button onClick={() => success('Data tersimpan!', 'Sukses')}>
        Show Success
      </button>
      
      <button onClick={() => error('Gagal menyimpan data', 'Error')}>
        Show Error
      </button>
      
      <button onClick={() => info('Info penting untukmu', 'Info')}>
        Show Info
      </button>
      
      <button onClick={() => warning('Perhatian!', 'Warning')}>
        Show Warning
      </button>
      
      {/* Snack spesial yang seru! */}
      <button onClick={() => achievement('Level 10 reached!', 'Achievement')}>
        🏆 Achievement
      </button>
      
      <button onClick={() => reward('Kamu mendapat 100 poin!', 'Reward')}>
        🎁 Reward
      </button>
      
      <button onClick={() => celebration('Selamat! Kamu menang!', 'Celebration')}>
        🎉 Celebration
      </button>
      
      <button onClick={() => premium('Fitur premium aktif!', 'Premium')}>
        👑 Premium
      </button>
      
      <button onClick={() => energy('Full energy restored!', 'Energy')}>
        ⚡ Energy Boost
      </button>
    </div>
  );
}
```

### Custom Snack dengan Semua Variants

```tsx
const { showSnack } = useSnack();

// 8 Variant styles yang berbeda!
const variants = [
  { variant: 'default', label: 'Default' },
  { variant: 'gradient', label: 'Gradient' },
  { variant: 'glass', label: 'Glass Morphism' },
  { variant: 'neon', label: 'Neon Glow' },
  { variant: 'minimal', label: 'Minimal' },
  { variant: 'floating', label: 'Floating' },
  { variant: 'pill', label: 'Pill' },
  { variant: 'banner', label: 'Banner' },
];

// 9 Position options
const positions = [
  'top', 'top-right', 'top-left',
  'bottom', 'bottom-right', 'bottom-left',
  'center'
];

// Custom snack dengan action button
showSnack({
  message: 'Pesanan berhasil dibuat!',
  title: '🎉 Yeay!',
  type: 'success',
  variant: 'gradient',
  position: 'top',
  duration: 5000,
  progress: true,
  action: {
    label: 'Lihat Pesanan',
    onClick: () => navigate('/orders'),
  },
});

// Snack dengan icon custom
showSnack({
  message: 'Jangan lupa isi bensin!',
  type: 'warning',
  variant: 'glass',
  position: 'bottom',
  icon: Fuel, // dari lucide-react
});
```

### 10 Snack Types dengan Ikon Unik

| Type | Icon | Description |
|------|------|-------------|
| `success` | ✅ CheckCircle | Sukses/berhasil |
| `error` | ❌ XCircle | Error/gagal |
| `info` | ℹ️ Info | Informasi |
| `warning` | ⚠️ AlertTriangle | Peringatan |
| `achievement` | 🏆 Trophy | Pencapaian |
| `reward` | 🎁 Gift | Hadiah/reward |
| `love` | ❤️ Heart | Favorit/suka |
| `celebration` | 🎉 PartyPopper | Perayaan (dengan animasi confetti!) |
| `premium` | 👑 Crown | Fitur premium |
| `energy` | ⚡ Zap | Energy boost |

---

## 🎨 CSS Utility Classes

### Easing Functions
```html
<div class="ease-smooth">Smooth easing</div>
<div class="ease-bounce">Bouncy easing</div>
<div class="ease-expo">Expo easing (super smooth)</div>
<div class="ease-snappy">Snappy for interactions</div>
<div class="ease-luxurious">Luxurious smooth</div>
```

### Animations
```html
<!-- Slide animations -->
<div class="animate-slide-in-right">Slide from right</div>
<div class="animate-slide-in-left">Slide from left</div>
<div class="animate-slide-in-up">Slide from bottom</div>
<div class="animate-slide-in-down">Slide from top</div>

<!-- Scale animations -->
<div class="animate-scale-in">Scale in smoothly</div>
<div class="animate-scale-bounce">Scale with bounce</div>

<!-- Other animations -->
<div class="animate-fade-in">Fade in</div>
<div class="animate-fade-in-blur">Fade with blur</div>
<div class="animate-float">Floating animation</div>
<div class="animate-shake">Shake (for errors)</div>
<div class="animate-spin-slow">Slow spin</div>
<div class="pulse-glow">Pulsing glow effect</div>
```

### Hover Effects
```html
<!-- Hover lift with shadow -->
<div class="hover-lift">Hover me - I'll lift!</div>

<!-- Press/tap effect -->
<button class="press-effect">Press me</button>

<!-- Glass morphism -->
<div class="glass">Glass effect</div>
<div class="glass-dark">Dark glass effect</div>

<!-- Gradient text -->
<h1 class="gradient-text">Gradient Text</h1>

<!-- Neon glows -->
<div class="neon-green">Green glow</div>
<div class="neon-blue">Blue glow</div>

<!-- Premium card -->
<div class="premium-card">Premium look</div>
```

### Stagger Delays
```html
<div class="animate-slide-in-right stagger-1">First item</div>
<div class="animate-slide-in-right stagger-2">Second item</div>
<div class="animate-slide-in-right stagger-3">Third item</div>
<!-- ... up to stagger-8 -->
```

---

## 🎯 Complete Example

```tsx
import { motion } from 'framer-motion';
import AnimatedPage, { childVariants } from './components/AnimatedPage';
import { useSnack } from './components/SnackProvider';
import { Trophy, Zap } from 'lucide-react';

function HomeScreen() {
  const { success, achievement, celebration, showSnack } = useSnack();

  const handleOrder = () => {
    // Success notification
    success('Pesanan berhasil dibuat!', 'Sukses');
    
    // Achievement after 2 seconds
    setTimeout(() => {
      achievement('Pembeli pertama! +50 poin', 'Achievement Unlocked!');
    }, 2000);
  };

  return (
    <AnimatedPage variant="slideRight" enableStagger={true}>
      <motion.div variants={childVariants} className="p-4">
        <h1 className="text-2xl font-bold gradient-text">
          Selamat Datang!
        </h1>
      </motion.div>
      
      <motion.div variants={childVariants}>
        <AnimatedCard 
          className="bg-white p-4 rounded-xl shadow-lg m-4 hover-lift"
          onClick={handleOrder}
        >
          <h3 className="font-semibold">Pesan Sekarang</h3>
          <p className="text-gray-600">Tap untuk memesan</p>
        </AnimatedCard>
      </motion.div>
      
      <motion.div variants={childVariants}>
        <AnimatedButton 
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-lg mx-4"
          onClick={() => celebration('Selamat bergabung! 🎉')}
        >
          <span className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Claim Reward
          </span>
        </AnimatedButton>
      </motion.div>
    </AnimatedPage>
  );
}
```

---

## 🚀 Tips untuk Animasi Super Smooth

1. **Gunakan `will-change`** untuk elemen yang sering dianimasi
2. **Pilih easing yang tepat**:
   - `expo` untuk page transitions
   - `bounce` untuk playful interactions
   - `snappy` untuk buttons/taps
3. **Stagger animations** untuk list items
4. **Reduced motion support** sudah built-in untuk accessibility
5. **Glass morphism** untuk modern look
6. **Variety of snacks** biar user gak bosen!

---

## 🎊 Summary

✅ **7 Page Transition Variants** - Slide, Fade, Flip, Zoom, Bouncy  
✅ **10 Snack Types** - Success, Error, Achievement, Reward, Celebration, dll  
✅ **8 Snack Variants** - Default, Gradient, Glass, Neon, Minimal, dll  
✅ **7 Position Options** - Top, Bottom, Center, Corners  
✅ **40+ CSS Utilities** - Easing, animations, hover effects  

**Gak bakal bosen lagi!** 🎉
