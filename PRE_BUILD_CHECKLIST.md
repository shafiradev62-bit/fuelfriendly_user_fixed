# Pre-Build Checklist ✅

## Before Building APK

### 1. Environment Setup
- [ ] Android Studio installed
- [ ] JDK 17 installed
- [ ] ANDROID_HOME set
- [ ] JAVA_HOME set
- [ ] ADB working (`adb --version`)
- [ ] Gradle working (`cd android && ./gradlew --version`)

### 2. Project Configuration
- [ ] `capacitor.config.ts` configured
- [ ] App ID: `com.fuelfriendly.app`
- [ ] App Name: `FuelFriendly`
- [ ] Version updated in `android/app/build.gradle`
- [ ] Permissions checked in `AndroidManifest.xml`

### 3. Environment Variables
- [ ] `.env.local` file exists
- [ ] API URLs set (production)
- [ ] Google Client IDs set
- [ ] Stripe keys set
- [ ] MapBox token set

### 4. Assets & Resources
- [ ] All images in `public/` folder
- [ ] App icon configured
- [ ] Splash screen configured
- [ ] `google-services.json` in `android/app/` (if using Firebase)

### 5. Code Quality
- [ ] No console errors
- [ ] All features tested
- [ ] No TypeScript errors
- [ ] Build succeeds: `npm run build`
- [ ] No broken imports

### 6. Testing
- [ ] Test on dev server: `npm run dev`
- [ ] Test all screens
- [ ] Test login/register
- [ ] Test Google login
- [ ] Test WhatsApp OTP
- [ ] Test order flow
- [ ] Test payment
- [ ] Test tracking

### 7. Android Specific
- [ ] Capacitor plugins installed
- [ ] `npx cap sync android` runs without errors
- [ ] Android Studio opens project
- [ ] No Gradle errors
- [ ] Permissions declared

### 8. Release Build (if applicable)
- [ ] Keystore generated
- [ ] Signing config in `build.gradle`
- [ ] ProGuard rules configured
- [ ] Version code incremented
- [ ] Version name updated

## Quick Verification Commands

```bash
# 1. Check environment
java -version
adb --version
echo $env:ANDROID_HOME

# 2. Build web app
npm run build

# 3. Sync to Android
npx cap sync android

# 4. Check for errors
cd android
./gradlew assembleDebug --stacktrace
```

## Common Issues to Check

### Before Build:
- [ ] No duplicate dependencies
- [ ] No missing assets
- [ ] No hardcoded localhost URLs
- [ ] API endpoints use production URLs
- [ ] No sensitive data in code

### After Build:
- [ ] APK file exists
- [ ] APK size reasonable (<50MB)
- [ ] Install on device works
- [ ] App launches without crash
- [ ] All features work on device

## Version Management

Current version in `android/app/build.gradle`:
```gradle
defaultConfig {
    versionCode 1        // Increment: 1, 2, 3, ...
    versionName "1.0.0"  // Format: MAJOR.MINOR.PATCH
}
```

### Version History:
- v1.0.0 (versionCode 1) - Initial release
- v1.0.1 (versionCode 2) - Bug fixes
- v1.1.0 (versionCode 3) - New features

## Build Commands

### Debug Build:
```bash
npm run apk:debug
```

### Release Build:
```bash
npm run apk:release
```

### Clean Build:
```bash
npm run android:clean
npm run apk:debug
```

## Post-Build Testing

After building APK:
- [ ] Install on real device
- [ ] Test cold start
- [ ] Test all features
- [ ] Test offline mode
- [ ] Test permissions
- [ ] Check app size
- [ ] Check performance
- [ ] Test on different Android versions

## Ready to Build?

If all checkboxes are checked:
```bash
npm run apk:debug
```

APK will be at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## Need Help?

- Read: `BUILD_APK_GUIDE.md`
- Quick ref: `QUICK_BUILD_APK.md`
- Troubleshooting: Check Logcat (`adb logcat`)

Good luck! 🚀
