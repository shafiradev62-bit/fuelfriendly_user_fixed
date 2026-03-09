# 📋 Quick Reference - UK/US TIN Validation

## ✅ Sudah Selesai!

### Format TIN yang Didukung:

#### 🇺🇸 UNITED STATES
```
SSN  → 123-45-6789  (9 digits)
EIN  → 12-3456789   (9 digits)
```

#### 🇬🇧 UNITED KINGDOM
```
UTR → 12345 67890   (10 digits)
NI  → AB 12 34 56 C (2 letters + 6 digits + 1 letter)
```

---

## 📱 APK Location

```
c:\Users\Lenovo\Downloads\fuel-user-update-master (1)\fuel-user-update-master\fuel-user-dev\frontend\android\app\build\outputs\apk\debug\app-debug.apk
```

**Copy file ini ke HP Android Anda dan install!**

---

## 🧪 Test Examples

### Valid Input:
```
✅ 123456789    → 123-45-6789     (US SSN)
✅ 1234567890   → 12345 67890     (UK UTR)
✅ AB123456C    → AB 12 34 56 C   (UK NI)
```

### Invalid Input:
```
❌ 000123456    → Invalid SSN (starts with 000)
❌ BG123456A    → Invalid NI (forbidden prefix)
❌ 12345678     → Too short
❌ 12345678901  → Too long
```

---

## 🔧 Build Commands

```bash
# Build web
npm run build

# Sync Android
npm run sync:android

# Build APK
cd android
.\gradlew assembleDebug

# Open Android Studio
npx cap open android
```

---

## 📝 Files Updated

1. `utils/tinValidator.ts` - UK/US validation logic
2. `screens/RegistrationScreen.tsx` - TIN field updated
3. Placeholder: `"TIN / SSN / UTR / NI Number"`

---

## ⚡ Features

- ✅ Auto-detect format (US vs UK)
- ✅ Real-time formatting
- ✅ Error messages
- ✅ Visual feedback (red border if invalid)
- ✅ Prevents submission if invalid

---

## 🎯 Bank Code

Untuk bank code `TD21-ZF65-YD11-AP92`, ini format berbeda. 
Jika perlu ditambahkan sebagai field terpisah atau integrasi dengan payment, let me know!

---

## 📞 Next Steps

1. **Install APK** di Android device/emulator
2. **Test registration** dengan berbagai format TIN
3. **Verify** validasi bekerja dengan benar
4. **Test submit** form ke backend

---

**Done! APK sudah siap di-test! 🎉**
