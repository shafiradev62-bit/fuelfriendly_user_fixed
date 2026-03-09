# 🔧 Google Login Setup untuk APK Android - Panduan Lengkap

## ⚠️ Masalah Umum & Solusi

### Error 10 - DEVELOPER_ERROR
**Penyebab:** SHA-1 fingerprint atau OAuth Client ID belum dikonfigurasi dengan benar

**Solusi:**
1. Dapatkan SHA-1 debug fingerprint (lihat langkah 3 di bawah)
2. Tambahkan ke Firebase Console > Project Settings > Your Apps > SHA-1
3. Download ulang `google-services.json`
4. Replace file di `android/app/google-services.json`
5. Clean & rebuild project

### Error 12500 - OAuth configuration invalid
**Penyebab:** Client ID salah atau belum terdaftar

**Solusi:**
1. Pastikan `VITE_GOOGLE_CLIENT_ID_ANDROID` sudah diisi di `.env.local`
2. Periksa client ID di Google Cloud Console > APIs & Services > Credentials
3. Pastikan package name sesuai: `com.fuelfriendly.app`

---

## 📝 Langkah-langkah Setup (WAJIB!)

### 1. Setup Firebase Console

#### A. Tambah Android App di Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project **fuelflow-asi**
3. Klik ⚙️ Settings > Project settings
4. Scroll ke "Your apps", klik "Add app" > Android
5. Isi:
   - **Package name**: `com.fuelfriendly.app`
   - **App nickname**: FuelFriendly
   - **Debug signing certificate SHA-1**: (lihat langkah 3)

#### B. Download google-services.json
1. Setelah register, download `google-services.json`
2. Copy ke: `android/app/google-services.json`

### 2. Setup Google Cloud Console

#### A. Verifikasi OAuth Consent Screen
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Pilih project **fuelflow-asi**
3. APIs & Services > OAuth consent screen
4. Pastikan status: **Testing** atau **In production**
5. Tambahkan test users jika masih Testing

#### B. Verifikasi Android OAuth Client
1. APIs & Services > Credentials
2. Cari "Android client for com.fuelfriendly.app"
3. Pastikan package name: `com.fuelfriendly.app`
4. Pastikan SHA-1 sudah terdaftar

### 3. Dapatkan SHA-1 Fingerprint (PENTING!)

#### Untuk Debug (Development):

**Windows PowerShell:**
```powershell
cd android
.\gradlew signingReport
```

**Atau pakai keytool:**
```powershell
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

**Mac/Linux:**
```bash
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

**Output yang dicari:**
```
SHA1: XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX:XX
```

#### Untuk Release (Production APK):
```powershell
keytool -list -v -keystore path\to\your\release.keystore -alias your_alias -storepass your_store_password
```

### 4. Update Environment Variables

Buat/edit file `.env.local` di root project:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# API Configuration  
VITE_API_BASE_URL=https://apidecor.kelolahrd.life

# Google OAuth - PENTING!
VITE_GOOGLE_CLIENT_ID=your_web_client_id.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID_WEB=your_web_client_id.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID_ANDROID=your_android_client_id.apps.googleusercontent.com
```

**Cara mendapatkan Client IDs:**
1. Buka Google Cloud Console > APIs & Services > Credentials
2. Web client ID: Ambil dari "Web client (auto created by Google Service)"
3. Android client ID: Ambil dari "Android client for com.fuelfriendly.app"

### 5. Sync Capacitor & Rebuild

```bash
# 1. Sync Capacitor
npx cap sync android

# 2. Clean project (PENTING!)
cd android
.\gradlew clean

# 3. Build APK
.\gradlew assembleDebug

# Atau untuk release
.\gradlew assembleRelease
```

---

## 🔧 Perubahan Kode yang Sudah Dilakukan

### ✅ 1. MainActivity.java
File: `android/app/src/main/java/com/fuelfriendly/app/MainActivity.java`

Sudah ditambahkan:
- Import Google Auth plugin
- Register plugin di onCreate()

### ✅ 2. AndroidManifest.xml
File: `android/app/src/main/AndroidManifest.xml`

Sudah ditambahkan:
- Intent filter untuk Google Auth redirect
- Scheme: `com.fuelfriendly.app`

### ✅ 3. App.tsx
File: `App.tsx`

Sudah diperbarui:
- Import Capacitor dan GoogleAuth
- Fungsi `initializeGoogleAuth()`
- Fungsi `apiLoginWithGoogleCredential()` dengan error handling
- Early initialization di useEffect

### ✅ 4. Capacitor Config
File: `capacitor.config.ts`

Sudah ada:
- GoogleAuth plugin configuration
- scopes: ['profile', 'email']
- serverClientId

---

## 🧪 Testing Google Login

### 1. Debug Build (Untuk Development)
```bash
npx cap sync android
cd android
.\gradlew assembleDebug
```

APK output: `android/app/build/outputs/apk/debug/app-debug.apk`

### 2. Install & Test
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### 3. Check Logs
```bash
adb logcat | grep -E "Google|Auth|Capacitor|FuelFriendly"
```

---

## 🚨 Troubleshooting Checklist

Jika masih gagal, cek berikut:

- [ ] `google-services.json` sudah di folder `android/app/`
- [ ] SHA-1 debug sudah ditambahkan di Firebase Console
- [ ] `VITE_GOOGLE_CLIENT_ID_ANDROID` sudah diisi di `.env.local`
- [ ] Package name di Firebase = `com.fuelfriendly.app`
- [ ] Package name di `capacitor.config.ts` = `com.fuelfriendly.app`
- [ ] Sudah jalankan `npx cap sync android`
- [ ] Sudah jalankan `cd android && .\gradlew clean`
- [ ] Google Play Services terinstall di device/emulator
- [ ] Device/emulator punya koneksi internet

---

## 📱 Error Codes & Artinya

| Error Code | Arti | Solusi |
|-----------|------|--------|
| 10 | SHA-1 atau Client ID salah | Cek langkah 3 & 4 |
| 16 | User cancel atau login gagal | Coba lagi, cek koneksi |
| 12500 | OAuth config invalid | Cek Client ID di .env |
| 12502 | Google Play Services error | Update Google Play Services |

---

## 📝 Catatan Penting

1. **Debug vs Release SHA-1**: Setiap komputer punya SHA-1 debug berbeda. Semua SHA-1 harus didaftarkan di Firebase.

2. **Proguard**: Untuk release build, pastikan proguard-rules.pro sudah benar.

3. **Clean Build**: SELALU jalankan `gradlew clean` setelah update google-services.json.

4. **Testing**: Untuk testing internal, tambahkan email tester di OAuth consent screen.

---

## ✅ Summary

Yang sudah difix:
1. ✅ MainActivity.java - Register Google Auth plugin
2. ✅ AndroidManifest.xml - Redirect handler
3. ✅ App.tsx - Proper initialization & error handling
4. ✅ Capacitor config - GoogleAuth plugin config

Yang perlu dilakukan user:
1. Dapatkan SHA-1 fingerprint (langkah 3)
2. Tambahkan ke Firebase Console
3. Download & replace google-services.json
4. Isi VITE_GOOGLE_CLIENT_ID_ANDROID di .env.local
5. Sync & rebuild

**Setelah ini, Google Login harusnya jalan!** 🚀
