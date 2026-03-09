# Quick Build APK - Capacitor

## Prerequisites
- ✅ Node.js installed
- ✅ Android Studio installed
- ✅ JDK 17 installed
- ✅ ANDROID_HOME environment variable set

## Build APK - 3 Steps

### 1. Build Web App
```bash
npm run build
```

### 2. Sync to Android
```bash
npx cap sync android
```

### 3. Build APK
```bash
cd android
./gradlew assembleDebug
```

**APK Location:**
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Install to Phone

### Via USB:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Via File:
1. Copy APK to phone
2. Open file manager
3. Tap APK
4. Install

## One-Line Commands

### Debug APK:
```bash
npm run build && npx cap sync android && cd android && ./gradlew assembleDebug
```

### Release APK:
```bash
npm run build && npx cap sync android && cd android && ./gradlew assembleRelease
```

### Run on Device:
```bash
npm run build && npx cap sync android && npx cap run android
```

## Package.json Scripts

Add these to `package.json`:
```json
{
  "scripts": {
    "android:build": "npm run build && npx cap sync android",
    "android:open": "npx cap open android",
    "android:run": "npx cap run android",
    "apk:debug": "npm run android:build && cd android && ./gradlew assembleDebug",
    "apk:release": "npm run android:build && cd android && ./gradlew assembleRelease"
  }
}
```

Then use:
```bash
npm run apk:debug
npm run apk:release
```

## Troubleshooting

### ANDROID_HOME not set:
```bash
# Windows PowerShell
$env:ANDROID_HOME = "C:\Users\YourUsername\AppData\Local\Android\Sdk"
```

### Gradle build failed:
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

### White screen:
```bash
npx cap sync android
```

## Check APK

### APK Info:
```bash
aapt dump badging android/app/build/outputs/apk/debug/app-debug.apk
```

### APK Size:
```bash
ls -lh android/app/build/outputs/apk/debug/app-debug.apk
```

## Quick Test

```bash
# 1. Build
npm run build

# 2. Sync
npx cap sync android

# 3. Run on device
npx cap run android
```

Done! 🚀
