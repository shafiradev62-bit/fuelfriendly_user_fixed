# Google Sign-In untuk PWA

## Env yang dipakai frontend

```env
VITE_GOOGLE_CLIENT_ID_WEB=YOUR_WEB_CLIENT_ID.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID=YOUR_WEB_CLIENT_ID.apps.googleusercontent.com
VITE_GOOGLE_CLIENT_ID_ANDROID=YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com
```

## Konfigurasi di Google Cloud Console

1. Buka OAuth 2.0 Client ID tipe **Web application**
2. Isi **Authorized JavaScript origins**:
   - `http://localhost:5173`
   - origin domain production PWA (contoh: `https://app.domainkamu.com`)
3. Untuk Android/native, tetap daftarkan SHA-1 certificate fingerprint sesuai keystore.

## Catatan penting

- SHA-1 fingerprint dipakai untuk Android client, bukan untuk web-only PWA login.
- Untuk PWA, yang wajib benar adalah Web Client ID + Authorized JavaScript origins.
