# 📱 Cara Install APK ke HP Android

## Lokasi APK
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Metode 1: Via USB (ADB) - Tercepat ⚡

### Persiapan
1. Enable Developer Options di HP:
   - Settings → About Phone
   - Tap "Build Number" 7x
   
2. Enable USB Debugging:
   - Settings → Developer Options
   - Aktifkan "USB Debugging"

3. Hubungkan HP ke PC via USB

### Install
```bash
# Cek HP terdeteksi
adb devices

# Install APK
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### Jika sudah ada versi lama
```bash
# Uninstall dulu
adb uninstall com.fuelfriendly.app

# Install ulang
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Metode 2: Via File Transfer - Mudah 📂

### Langkah-langkah
1. **Copy APK ke HP**
   - Hubungkan HP ke PC via USB
   - Copy file `app-debug.apk` ke folder Download di HP
   - Atau kirim via WhatsApp/Email ke diri sendiri

2. **Buka File Manager di HP**
   - Cari file `app-debug.apk` di folder Download

3. **Install APK**
   - Tap file APK
   - Jika muncul warning "Install from Unknown Sources"
   - Klik "Settings" → Aktifkan "Allow from this source"
   - Kembali dan tap Install

4. **Buka App**
   - Setelah install selesai, tap "Open"
   - Atau cari icon "FuelFriendly" di app drawer

---

## Metode 3: Via Google Drive/Cloud ☁️

1. Upload `app-debug.apk` ke Google Drive
2. Buka Google Drive di HP
3. Download APK
4. Install seperti Metode 2

---

## ⚠️ Troubleshooting

### "App not installed"
**Penyebab:** Versi lama masih terinstall

**Solusi:**
```bash
adb uninstall com.fuelfriendly.app
```
Atau uninstall manual dari HP, lalu install ulang.

---

### "Install blocked"
**Penyebab:** Unknown sources tidak diizinkan

**Solusi:**
1. Settings → Security
2. Aktifkan "Unknown Sources" atau "Install Unknown Apps"
3. Pilih app yang akan digunakan untuk install (File Manager/Chrome)

---

### "Parse error"
**Penyebab:** APK corrupt atau tidak kompatibel

**Solusi:**
1. Download/copy ulang APK
2. Pastikan HP Android 7.0+ (API 24+)
3. Rebuild APK:
   ```bash
   npm run android:clean
   npm run apk:debug
   ```

---

### White screen setelah install
**Penyebab:** Assets tidak tersync

**Solusi:**
```bash
npx cap sync android
npm run apk:debug
```

---

## 🧪 Test Setelah Install

Checklist fitur yang harus dicek:

- [ ] App bisa dibuka
- [ ] Splash screen muncul
- [ ] Bisa register/login
- [ ] Google Login berfungsi
- [ ] WhatsApp OTP berfungsi
- [ ] Map tracking berfungsi
- [ ] QR code modal berfungsi
- [ ] Animasi smooth
- [ ] Checkout & payment berfungsi
- [ ] Notifikasi berfungsi

---

## 📊 Check Logs (Jika Ada Error)

```bash
# Real-time logs
adb logcat | grep -i "fuelfriendly"

# Save logs to file
adb logcat > app-logs.txt
```

---

## 🔄 Update APK

Jika ada update:

```bash
# Build ulang
npm run build
npx cap sync android
cd android
./gradlew assembleDebug

# Uninstall versi lama
adb uninstall com.fuelfriendly.app

# Install versi baru
adb install app/build/outputs/apk/debug/app-debug.apk
```

Atau gunakan shortcut:
```bash
npm run apk:debug
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

Flag `-r` akan replace versi lama otomatis.

---

## 🎯 Quick Commands

```bash
# Install
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Reinstall (replace)
adb install -r android/app/build/outputs/apk/debug/app-debug.apk

# Uninstall
adb uninstall com.fuelfriendly.app

# Check if installed
adb shell pm list packages | grep fuelfriendly

# Launch app
adb shell am start -n com.fuelfriendly.app/.MainActivity

# Clear app data
adb shell pm clear com.fuelfriendly.app
```

---

## 📱 Tested On

✅ Android 7.0+ (API 24+)
✅ Android 10, 11, 12, 13, 14
✅ Various devices (Samsung, Xiaomi, Oppo, etc.)

---

**APK Size:** 22.7 MB
**Min Android:** 7.0 (API 24)
**Target Android:** 14 (API 34)
**Package:** com.fuelfriendly.app

Selamat mencoba! 🚀
