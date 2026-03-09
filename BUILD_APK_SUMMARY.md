# 🎯 Build APK - Quick Summary

## 3 Simple Steps

### 1️⃣ Build
```bash
npm run build
```

### 2️⃣ Sync
```bash
npx cap sync android
```

### 3️⃣ Build APK
```bash
cd android
./gradlew assembleDebug
```

## Or Use NPM Script

```bash
npm run apk:debug
```

## APK Location

```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Install to Phone

```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

## All Available Commands

```bash
npm run apk:debug          # Build debug APK
npm run apk:release        # Build release APK
npm run aab:release        # Build AAB (Play Store)
npm run android:run        # Run on device
npm run android:open       # Open Android Studio
npm run android:clean      # Clean build
```

## Prerequisites

✅ Android Studio
✅ JDK 17
✅ ANDROID_HOME set

## Documentation

📖 **Complete Guide:** `BUILD_APK_GUIDE.md`
⚡ **Quick Reference:** `QUICK_BUILD_APK.md`
📋 **Checklist:** `PRE_BUILD_CHECKLIST.md`
📱 **README:** `BUILD_APK_README.md`

## Troubleshooting

### Build Failed?
```bash
npm run android:clean
npm run apk:debug
```

### White Screen?
```bash
npx cap sync android
```

### Check Logs:
```bash
adb logcat
```

## That's It! 🚀

Build your APK and test on your phone!
