# 📱 Build APK - FuelFriendly

## 🚀 Quick Start

### Method 1: NPM Scripts (Recommended)
```bash
# Debug APK (untuk testing)
npm run apk:debug

# Release APK (untuk production)
npm run apk:release

# Android App Bundle (untuk Play Store)
npm run aab:release
```

### Method 2: Manual Steps
```bash
# 1. Build web app
npm run build

# 2. Sync to Android
npm run android:sync

# 3. Open Android Studio
npm run android:open

# 4. Build → Build APK(s)
```

## 📍 APK Location

### Debug APK:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### Release APK:
```
android/app/build/outputs/apk/release/app-release.apk
```

### AAB (Play Store):
```
android/app/build/outputs/bundle/release/app-release.aab
```

## 📲 Install ke HP

### Via ADB (USB):
```bash
# Connect HP via USB
# Enable USB Debugging di HP

adb devices
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Via File Transfer:
1. Copy file APK ke HP
2. Buka File Manager
3. Tap file APK
4. Allow "Install from Unknown Sources"
5. Install

### Via Email/WhatsApp:
1. Send APK file via email/WhatsApp
2. Download di HP
3. Tap file
4. Install

## 🛠️ Available Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build web app
npm run preview            # Preview build

# Android
npm run android:build      # Build web + sync Android
npm run android:sync       # Sync web assets to Android
npm run android:open       # Open Android Studio
npm run android:run        # Run on device/emulator
npm run android:clean      # Clean Android build

# APK/AAB
npm run apk:debug          # Build debug APK
npm run apk:release        # Build release APK
npm run aab:release        # Build AAB for Play Store
```

## ⚙️ Prerequisites

### 1. Install Android Studio
Download: https://developer.android.com/studio

### 2. Install JDK 17
Download: https://adoptium.net/

### 3. Set Environment Variables

**Windows:**
```powershell
# Add to System Environment Variables:
ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
JAVA_HOME = C:\Program Files\Java\jdk-17

# Add to PATH:
%ANDROID_HOME%\platform-tools
%JAVA_HOME%\bin
```

**Verify:**
```bash
java -version
adb --version
```

## 🔧 Troubleshooting

### Error: "ANDROID_HOME not set"
```bash
$env:ANDROID_HOME = "C:\Users\YourUsername\AppData\Local\Android\Sdk"
```

### Error: "Gradle build failed"
```bash
npm run android:clean
npm run apk:debug
```

### White screen on app launch
```bash
npm run android:sync
```

### App crashes
```bash
# Check logs
adb logcat | grep -i fuelfriendly
```

## 📝 Version Management

Edit `android/app/build.gradle`:
```gradle
defaultConfig {
    versionCode 1        // Increment for each release
    versionName "1.0.0"  // Semantic versioning
}
```

## 🔐 Release Build (Signed APK)

### First Time Setup:

1. Generate keystore:
```bash
cd android/app
keytool -genkey -v -keystore fuelfriendly-release.keystore -alias fuelfriendly -keyalg RSA -keysize 2048 -validity 10000
```

2. Edit `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file('fuelfriendly-release.keystore')
            storePassword 'your-password'
            keyAlias 'fuelfriendly'
            keyPassword 'your-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

3. Build:
```bash
npm run apk:release
```

## 📊 APK Size Optimization

Edit `android/app/build.gradle`:
```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt')
    }
}
```

## 🎯 Testing Checklist

Before building release APK:

- [ ] Test all features
- [ ] Test on different screen sizes
- [ ] Test on different Android versions
- [ ] Update version code/name
- [ ] Check permissions
- [ ] Test signed APK on real device
- [ ] Verify API endpoints (production)

## 📤 Upload to Play Store

1. Build AAB:
```bash
npm run aab:release
```

2. Go to: https://play.google.com/console

3. Upload AAB file

4. Fill app details

5. Submit for review

## 🆘 Need Help?

1. Check logs: `adb logcat`
2. Clean build: `npm run android:clean`
3. Read full guide: `BUILD_APK_GUIDE.md`
4. Check Capacitor docs: https://capacitorjs.com/docs

## 📚 Documentation

- `BUILD_APK_GUIDE.md` - Complete guide
- `QUICK_BUILD_APK.md` - Quick reference
- `BUILD_APK_README.md` - This file

Happy Building! 🚀
