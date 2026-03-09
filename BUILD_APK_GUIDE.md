# Build APK dengan Capacitor - Panduan Lengkap

## Prerequisites

### 1. Install Java Development Kit (JDK)
```bash
# Download JDK 17 dari:
https://www.oracle.com/java/technologies/downloads/#java17

# Atau gunakan OpenJDK:
https://adoptium.net/

# Verify installation:
java -version
```

### 2. Install Android Studio
```bash
# Download dari:
https://developer.android.com/studio

# Install dengan semua default components
# Termasuk: Android SDK, Android SDK Platform, Android Virtual Device
```

### 3. Setup Environment Variables

**Windows (PowerShell):**
```powershell
# Tambahkan ke System Environment Variables:
ANDROID_HOME = C:\Users\YourUsername\AppData\Local\Android\Sdk
JAVA_HOME = C:\Program Files\Java\jdk-17

# Tambahkan ke PATH:
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
%JAVA_HOME%\bin
```

**Verify:**
```bash
echo $env:ANDROID_HOME
echo $env:JAVA_HOME
adb --version
```

## Step-by-Step Build Process

### Step 1: Install Dependencies
```bash
cd fuel-user-update-master/fuel-user-dev/frontend
npm install
```

### Step 2: Build Web App
```bash
npm run build
```

Output akan ada di folder `dist/`

### Step 3: Sync dengan Capacitor
```bash
npx cap sync android
```

Ini akan:
- Copy web assets ke android/app/src/main/assets
- Update native dependencies
- Sync capacitor.config.ts

### Step 4: Open Android Studio
```bash
npx cap open android
```

Atau manual:
- Buka Android Studio
- File → Open
- Pilih folder: `fuel-user-update-master/fuel-user-dev/frontend/android`

### Step 5: Build APK di Android Studio

#### Option A: Debug APK (untuk testing)
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Wait for build to complete
3. Click "locate" untuk buka folder APK
4. APK location: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Option B: Release APK (untuk production)

**1. Generate Keystore (first time only):**
```bash
cd android/app
keytool -genkey -v -keystore fuelfriendly-release.keystore -alias fuelfriendly -keyalg RSA -keysize 2048 -validity 10000

# Isi informasi:
# - Password: [your-password]
# - Name: FuelFriendly
# - Organization: Your Company
# - City, State, Country
```

**2. Configure Signing:**

Edit `android/app/build.gradle`:
```gradle
android {
    ...
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
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

**3. Build Release APK:**
```bash
cd android
./gradlew assembleRelease
```

APK location: `android/app/build/outputs/apk/release/app-release.apk`

### Step 6: Install APK ke HP

#### Via USB:
```bash
# Enable USB Debugging di HP
# Settings → About Phone → Tap "Build Number" 7x
# Settings → Developer Options → Enable USB Debugging

# Connect HP ke PC
adb devices

# Install APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

#### Via File Transfer:
1. Copy APK ke HP
2. Buka File Manager di HP
3. Tap APK file
4. Allow "Install from Unknown Sources"
5. Install

## Quick Commands

### Development Workflow
```bash
# 1. Build web app
npm run build

# 2. Sync to Android
npx cap sync android

# 3. Run on device/emulator
npx cap run android
```

### Build APK Only
```bash
# Debug APK
npm run build
npx cap sync android
cd android
./gradlew assembleDebug

# Release APK
npm run build
npx cap sync android
cd android
./gradlew assembleRelease
```

### Clean Build
```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

## Troubleshooting

### Error: "ANDROID_HOME not set"
```bash
# Set environment variable
$env:ANDROID_HOME = "C:\Users\YourUsername\AppData\Local\Android\Sdk"
```

### Error: "SDK location not found"
Create `android/local.properties`:
```properties
sdk.dir=C:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

### Error: "Gradle build failed"
```bash
cd android
./gradlew clean
./gradlew assembleDebug --stacktrace
```

### Error: "Duplicate class"
```bash
# Clear cache
cd android
./gradlew clean
rm -rf .gradle
./gradlew assembleDebug
```

### APK size too large
Edit `android/app/build.gradle`:
```gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

## APK Optimization

### 1. Enable ProGuard (minify code)
```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
    }
}
```

### 2. Split APKs by ABI
```gradle
android {
    splits {
        abi {
            enable true
            reset()
            include 'armeabi-v7a', 'arm64-v8a', 'x86', 'x86_64'
            universalApk false
        }
    }
}
```

### 3. Optimize Images
- Use WebP instead of PNG/JPG
- Compress images before adding to project
- Use vector drawables when possible

## Testing APK

### On Emulator:
```bash
# List emulators
emulator -list-avds

# Start emulator
emulator -avd Pixel_5_API_33

# Install APK
adb install app-debug.apk
```

### On Real Device:
```bash
# Enable Developer Options
# Enable USB Debugging
# Connect device

adb devices
adb install app-debug.apk
```

## Upload to Play Store

### 1. Build AAB (Android App Bundle)
```bash
cd android
./gradlew bundleRelease
```

Output: `android/app/build/outputs/bundle/release/app-release.aab`

### 2. Sign AAB
Already signed if you configured signingConfigs

### 3. Upload to Play Console
1. Go to https://play.google.com/console
2. Create app
3. Upload AAB
4. Fill app details
5. Submit for review

## Package Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "build:android": "npm run build && npx cap sync android",
    "open:android": "npx cap open android",
    "run:android": "npx cap run android",
    "apk:debug": "cd android && ./gradlew assembleDebug",
    "apk:release": "cd android && ./gradlew assembleRelease",
    "aab:release": "cd android && ./gradlew bundleRelease"
  }
}
```

Usage:
```bash
npm run build:android
npm run apk:debug
npm run apk:release
```

## Checklist Before Build

- [ ] Update version in `capacitor.config.ts`
- [ ] Update versionCode & versionName in `android/app/build.gradle`
- [ ] Test all features
- [ ] Check permissions in `AndroidManifest.xml`
- [ ] Verify API endpoints (production URLs)
- [ ] Test on different screen sizes
- [ ] Test on different Android versions
- [ ] Generate signed APK/AAB
- [ ] Test signed APK on real device

## Version Management

Edit `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        applicationId "com.fuelfriendly.app"
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1        // Increment for each release
        versionName "1.0.0"  // Semantic versioning
    }
}
```

## Common Issues

### 1. White screen on launch
- Check console logs: `adb logcat`
- Verify `dist/` folder has files
- Run `npx cap sync android` again

### 2. App crashes on startup
- Check `AndroidManifest.xml` permissions
- Verify all native plugins are installed
- Check Logcat for errors

### 3. Features not working
- Verify Capacitor plugins are synced
- Check plugin permissions
- Test on real device (not emulator)

## Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [Android Studio](https://developer.android.com/studio)
- [Gradle Docs](https://docs.gradle.org/)
- [Play Console](https://play.google.com/console)

## Support

If you encounter issues:
1. Check Logcat: `adb logcat`
2. Clean build: `./gradlew clean`
3. Invalidate cache in Android Studio
4. Check Capacitor docs
5. Search Stack Overflow

Happy Building! 🚀
