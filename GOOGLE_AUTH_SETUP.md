# Google Authentication Setup - Complete Guide

## Status Implementasi

✅ Google SDK loaded di index.html
✅ Google Auth untuk Web (Google Identity Services)
✅ Google Auth untuk Android (Capacitor Google Auth)
✅ Error handling yang lebih baik
✅ Logging untuk debugging
✅ Fallback mechanism

## Perubahan yang Dilakukan

### 1. App.tsx - Improved Google Auth

**apiLoginWithGoogleCredential:**
- ✅ Better logging untuk debugging
- ✅ Increased timeout: 20 → 30 retries (6 seconds)
- ✅ Better error messages dengan detail
- ✅ Fallback mechanism: One Tap → Button popup
- ✅ Auto-click button jika One Tap gagal
- ✅ Cancel on tap outside: false (prevent accidental cancel)

**Error Handling:**
- Client ID missing → Clear error message
- SDK timeout → Suggest refresh
- Popup blocked → Inform user
- User cancelled → Graceful handling

### 2. LoginScreen.tsx - Better UX

**Changes:**
- ✅ Added error state
- ✅ Display error message di UI (red box)
- ✅ Better error handling
- ✅ Loading state dengan "Connecting..."

## Setup Requirements

### A. Environment Variables (.env.local)

```env
# Google OAuth Client IDs
VITE_GOOGLE_CLIENT_ID_WEB=915622810812-41c4udago6s6he0nu6euplt91hupaoil.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID=915622810812-41c4udago6s6he0nu6euplt91hupaoil.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID_ANDROID=915622810812-41c4udago6s6he0nu6euplt91hupaoil.apps.googleusercontent.com
```

### B. Google Cloud Console Setup

#### 1. Create OAuth 2.0 Client ID

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create new)
3. Navigate to: APIs & Services > Credentials
4. Click "Create Credentials" > "OAuth 2.0 Client ID"

#### 2. Web Application Client

**Application type:** Web application

**Authorized JavaScript origins:**
```
http://localhost:5173
http://localhost:3000
https://yourdomain.com
```

**Authorized redirect URIs:**
```
http://localhost:5173
http://localhost:3000
https://yourdomain.com
```

**Important:** Jangan tambahkan path `/callback` atau `/auth` - Google Identity Services tidak memerlukan redirect URI spesifik.

#### 3. Android Application Client

**Application type:** Android

**Package name:** `com.fuelfriendly.app`

**SHA-1 certificate fingerprint:**

Get SHA-1 for debug:
```bash
cd android
./gradlew signingReport
```

Or using keytool:
```bash
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

Copy SHA-1 dan paste ke Google Cloud Console.

### C. Firebase Setup (for Android)

#### 1. Add Android App to Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click "Add app" > Android icon
4. Enter package name: `com.fuelfriendly.app`
5. Enter SHA-1 certificate (same as above)
6. Download `google-services.json`

#### 2. Place google-services.json

```
android/app/google-services.json
```

#### 3. Verify build.gradle

File: `android/app/build.gradle`

```gradle
dependencies {
    // ... other dependencies
    
    // Firebase
    implementation platform('com.google.firebase:firebase-bom:34.6.0')
    implementation 'com.google.firebase:firebase-auth'
}

// At the bottom
apply from: 'capacitor.build.gradle'

try {
    def servicesJSON = file('google-services.json')
    if (servicesJSON.text) {
        apply plugin: 'com.google.gms.google-services'
    }
} catch(Exception e) {
    logger.info("google-services.json not found")
}
```

File: `android/build.gradle`

```gradle
buildscript {
    dependencies {
        classpath 'com.android.tools.build:gradle:8.7.2'
        classpath 'com.google.gms:google-services:4.4.2'
    }
}
```

### D. Capacitor Configuration

File: `capacitor.config.ts`

```typescript
plugins: {
  GoogleAuth: {
    scopes: ['profile', 'email'],
    serverClientId: '915622810812-41c4udago6s6he0nu6euplt91hupaoil.apps.googleusercontent.com',
    forceCodeForRefreshToken: true
  }
}
```

## Testing

### Web Testing

1. Start dev server:
```bash
npm run dev
```

2. Open browser: `http://localhost:5173`
3. Click "Continue with Google"
4. Should see Google One Tap popup
5. Select account
6. Should redirect to home or register

**Troubleshooting Web:**
- Check browser console for errors
- Verify Client ID in .env.local
- Check Authorized JavaScript origins
- Disable ad blockers
- Allow popups for localhost

### Android Testing

1. Build and sync:
```bash
npm run build
npx cap sync android
```

2. Run on device/emulator:
```bash
npx cap run android
```

3. Click "Continue with Google"
4. Should see Google account picker
5. Select account
6. Should redirect to home or register

**Troubleshooting Android:**
- Check Logcat for errors
- Verify google-services.json exists
- Verify SHA-1 in Firebase Console
- Verify package name matches
- Check internet permission in AndroidManifest.xml

## Common Errors

### Error 10 (Android)
**Message:** "Developer error"
**Cause:** SHA-1 fingerprint tidak terdaftar atau salah
**Fix:** 
1. Get SHA-1: `./gradlew signingReport`
2. Add to Firebase Console
3. Download new google-services.json
4. Rebuild app

### Error 12500 (Android)
**Message:** "Sign in failed"
**Cause:** OAuth Client ID tidak valid
**Fix:**
1. Verify Client ID di capacitor.config.ts
2. Verify Client ID di Google Cloud Console
3. Ensure Android client type is created

### Error 16 (Android)
**Message:** "User cancelled"
**Cause:** User membatalkan login
**Fix:** Normal behavior, no action needed

### Web: "Google SDK belum siap"
**Cause:** Google SDK script belum load
**Fix:**
1. Check index.html has script tag
2. Check internet connection
3. Refresh page
4. Check browser console

### Web: "Popup blocked"
**Cause:** Browser memblokir popup
**Fix:**
1. Allow popups for localhost
2. Disable ad blockers
3. Try different browser

## Flow Diagram

### Web Flow
```
User clicks "Continue with Google"
  ↓
Check Google SDK loaded
  ↓
Initialize Google Identity Services
  ↓
Show One Tap popup
  ↓
User selects account
  ↓
Get ID token
  ↓
Send to backend (apiGoogleAuth)
  ↓
Get user data + auth token
  ↓
Save to localStorage
  ↓
Redirect to home/register
```

### Android Flow
```
User clicks "Continue with Google"
  ↓
Initialize Capacitor Google Auth
  ↓
Call GoogleAuth.signIn()
  ↓
Show Google account picker
  ↓
User selects account
  ↓
Get user data + tokens
  ↓
Send to backend (apiGoogleAuth)
  ↓
Get user data + auth token
  ↓
Save to localStorage
  ↓
Redirect to home/register
```

## Debug Checklist

### Before Testing:
- [ ] .env.local has correct Client IDs
- [ ] Google SDK script in index.html
- [ ] Authorized origins configured
- [ ] google-services.json in android/app/
- [ ] SHA-1 added to Firebase
- [ ] Build.gradle has google-services plugin

### During Testing:
- [ ] Check browser/Logcat console
- [ ] Verify network requests
- [ ] Check localStorage for token
- [ ] Test with different accounts
- [ ] Test cancel flow
- [ ] Test error scenarios

### After Success:
- [ ] User redirected correctly
- [ ] Token saved in localStorage
- [ ] User data saved
- [ ] Can access protected routes
- [ ] Logout works correctly

## Production Deployment

### Web:
1. Add production domain to Authorized origins
2. Update .env.production with production Client ID
3. Build: `npm run build`
4. Deploy dist/ folder

### Android:
1. Generate release keystore
2. Get release SHA-1
3. Add release SHA-1 to Firebase
4. Update google-services.json
5. Build release APK/AAB
6. Test on real device
7. Upload to Play Store

## Support

If Google Auth still not working:
1. Check all environment variables
2. Verify Google Cloud Console setup
3. Check Firebase Console setup
4. Review browser/Logcat logs
5. Test with different Google account
6. Clear browser cache/app data
7. Try incognito/private mode

## References

- [Google Identity Services](https://developers.google.com/identity/gsi/web)
- [Capacitor Google Auth](https://github.com/CodetrixStudio/CapacitorGoogleAuth)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Google Cloud Console](https://console.cloud.google.com/)
