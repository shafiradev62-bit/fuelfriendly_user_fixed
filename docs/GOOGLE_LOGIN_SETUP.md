# Google Login Setup Guide for FuelFriendly APK

## ⚠️ IMPORTANT: google-services.json Required

File `google-services.json` wajib ada di folder `android/app/` agar Google Login work di APK.

## Langkah Setup:

### 1. Firebase Console Setup

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Buat project baru atau pilih project existing
3. Tambahkan Android app dengan package name: `com.fuelfriendly.app`
4. Download `google-services.json`
5. Copy ke folder: `android/app/google-services.json`

### 2. SHA-1 Fingerprint (WAJIB!)

Tambahkan SHA-1 debug ke Firebase:

```bash
cd android
.\gradlew signingReport
```

Copy SHA-1 dari `AndroidDebugConfig` dan tambahkan di:
- Firebase Console → Project Settings → Your Android App → SHA-1

### 3. OAuth Client ID Setup

1. Buka [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Pastikan ada OAuth 2.0 Client ID untuk Android dengan:
   - Package name: `com.fuelfriendly.app`
   - SHA-1 fingerprint (sama seperti di Firebase)

### 4. Environment Variables

Buat file `.env` di root frontend folder dengan isi:

```env
VITE_GOOGLE_CLIENT_ID=915622810812-41c4udago6s6he0nu6euplt91hupaoil.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID_WEB=915622810812-41c4udago6s6he0nu6euplt91hupaoil.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID_ANDROID=915622810812-41c4udago6s6he0nu6euplt91hupaoil.apps.googleusercontent.com
```

### 5. Rebuild APK

```bash
npm run build
npx cap sync android
cd android
.\gradlew assembleDebug
```

## Error Codes Reference:

| Error | Meaning | Fix |
|-------|---------|-----|
| Error 10 | SHA-1 tidak terdaftar | Tambahkan SHA-1 di Firebase Console |
| Error 12500 | OAuth config invalid | Cek Client ID dan package name |
| Error 16 | User cancelled / failed | Coba lagi atau cek network |

## Current Configuration:

- Package Name: `com.fuelfriendly.app`
- Client ID: `915622810812-41c4udago6s6he0nu6euplt91hupaoil.apps.googleusercontent.com`
- Plugin: `@codetrix-studio/capacitor-google-auth`

## Missing File Checklist:

- [ ] `android/app/google-services.json` ⬅️ **WAJIB ADA!**
- [ ] `.env` file di frontend root
- [ ] SHA-1 terdaftar di Firebase
- [ ] OAuth Client ID untuk Android di Google Cloud Console

## Testing:

Setelah setup selesai, test dengan:
1. Install APK debug
2. Buka app → Login
3. Click "Continue with Google"
4. Pilih akun Google
5. Harus berhasil login dan redirect ke Home

---
**Catatan:** Tanpa `google-services.json`, Google Login akan fail dengan error code 10 atau 12500.
