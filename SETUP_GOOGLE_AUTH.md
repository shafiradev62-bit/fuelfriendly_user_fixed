# Setup Google Authentication untuk Android - Panduan Lengkap

## 1. Setup Firebase Project

### A. Buat Firebase Project
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau pilih project yang sudah ada
3. Ikuti wizard setup

### B. Tambahkan Android App ke Firebase
1. Di Firebase Console, klik ⚙️ (Settings) > Project settings
2. Scroll ke bawah, klik "Add app" > pilih Android icon
3. Isi form:
   - **Android package name**: `com.fuelfriendly.app`
   - **App nickname**: FuelFriendly (opsional)
   - **Debug signing certificate SHA-1**: WAJIB untuk Google Sign-In!

### C. Cara Mendapatkan SHA-1 Certificate

#### Untuk Debug (Development):
```bash
# Windows (PowerShell/CMD)
cd android
./gradlew signingReport

# Atau menggunakan keytool
keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android
```

#### Untuk Release (Production):
```bash
keytool -list -v -keystore path/to/your/release.keystore -alias your_alias
```

**Copy SHA-1 fingerprint** dan paste ke Firebase Console.

### D. Download google-services.json
1. Setelah register app, download file `google-services.json`
2. Letakkan file di: `android/app/google-services.json`

## 2. Setup Google Cloud Console (OAuth Client)

### A. Buka Google Cloud Console
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Pilih project yang sama dengan Firebase
3. Buka "APIs & Services" > "Credentials"
