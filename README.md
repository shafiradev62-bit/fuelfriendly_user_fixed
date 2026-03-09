# 🚗 FuelFriendly User App

Mobile-first fuel delivery application built with React, TypeScript, Vite, and Capacitor.

## ✨ Features

- 🎨 **Optimized Animations** - Smooth, subtle animations (100-300ms)
- 📱 **QR Code Modal** - Dynamic QR code generation for order verification
- 🔐 **Google Login** - Works on web and Android with proper fallback
- 💬 **WhatsApp OTP** - Auto-validation without external OTP provider
- 🗺️ **Real-time Tracking** - Order tracking with Mapbox/Jawg maps
- 💳 **Payment Integration** - Stripe payment support
- 👤 **Profile Management** - Complete user profile and settings
- 🔔 **Notifications** - Push notifications and in-app alerts
- 💬 **Chat Support** - Live chat with support team

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Android Studio (for Android builds)
- JDK 17
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/shafiradev62-bit/fuelfriendly_user_fixed.git
cd fuelfriendly_user_fixed

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and add your API keys
```

### Development

```bash
# Run development server
npm run dev

# Open in browser
# http://localhost:5173
```

### Build APK

```bash
# Build debug APK
npm run apk:debug

# Build release APK
npm run apk:release

# Build AAB for Play Store
npm run aab:release
```

APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

## 📱 Install APK

### Via USB (ADB)
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Via File Transfer
1. Copy `app-debug.apk` to your phone
2. Open file and tap Install
3. Enable "Install from Unknown Sources" if prompted

## 🔧 Environment Variables

Create `.env` file with:

```env
# API
VITE_API_BASE_URL=your_api_url

# Google Auth
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_ID_WEB=your_web_client_id
VITE_GOOGLE_CLIENT_ID_ANDROID=your_android_client_id

# Maps
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token
VITE_JAWG_ACCESS_TOKEN=your_jawg_token

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

# WhatsApp Service
VITE_WHATSAPP_SERVICE_URL=http://localhost:4000
```

## 📚 Documentation

- [Build APK Guide](BUILD_APK_GUIDE.md) - Complete APK build instructions
- [Install APK](INSTALL_APK.md) - How to install APK on Android
- [Google Auth Setup](GOOGLE_AUTH_SETUP.md) - Google login configuration
- [WhatsApp OTP Guide](WHATSAPP_OTP_GUIDE.md) - WhatsApp OTP implementation
- [Project Status](PROJECT_STATUS.md) - All completed features

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Mobile:** Capacitor 6
- **Styling:** Tailwind CSS, Framer Motion
- **Maps:** Mapbox GL, Jawg Maps
- **Payment:** Stripe
- **Auth:** Google OAuth, WhatsApp OTP
- **State:** React Context API
- **HTTP:** Axios

## 📦 NPM Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Android
npm run android:build    # Build and sync Android
npm run android:open     # Open Android Studio
npm run android:run      # Run on Android device
npm run android:sync     # Sync Capacitor
npm run android:clean    # Clean Android build

# APK/AAB
npm run apk:debug        # Build debug APK
npm run apk:release      # Build release APK
npm run aab:release      # Build AAB for Play Store
```

## 🎯 Key Features Implementation

### Optimized Animations
- Reduced animation durations (100-300ms)
- Subtle scale effects (0.97-1.00)
- Removed excessive effects (glow, particles, etc.)
- Single-layer ripples
- Minimal haptic feedback (10ms)

### QR Code Modal
- Canvas-based QR code generation
- Shows only when button clicked
- Displays tracking number and order details
- Instructions for driver verification

### Google Login
- Works on web and Android
- Proper error handling
- Fallback mechanism (One Tap → Button)
- Auto-click if One Tap fails
- Clear error messages

### WhatsApp OTP
- Local OTP generation (no provider)
- Auto-opens WhatsApp with message
- Auto-validates on return to app
- Auto-fills OTP input
- 5-minute expiry

## 🐛 Troubleshooting

### Build Failed
```bash
npm run android:clean
npm run apk:debug
```

### White Screen
```bash
npx cap sync android
npm run apk:debug
```

### Google Login Not Working
1. Check SHA-1 fingerprint in Firebase
2. Verify `google-services.json` is updated
3. Rebuild APK

### Check Logs
```bash
adb logcat | grep -i "fuelfriendly"
```

## 📄 License

Private - All rights reserved

## 👥 Contributors

- Development Team

## 🔗 Links

- [GitHub Repository](https://github.com/shafiradev62-bit/fuelfriendly_user_fixed)
- [Issue Tracker](https://github.com/shafiradev62-bit/fuelfriendly_user_fixed/issues)

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React + Capacitor**
