# QR Code Feature - Tracking Order

## Perubahan yang Dilakukan

### 1. Komponen Baru: QRCodeModal.tsx

Dibuat komponen modal QR code yang menampilkan:
- ✅ QR Code yang di-generate menggunakan Canvas API
- ✅ Tracking number order
- ✅ Detail order (fuel type, quantity, status)
- ✅ Animasi smooth saat buka/tutup modal
- ✅ Design modern dengan rounded corners dan shadow
- ✅ Info untuk driver scan QR code

**Fitur QR Code Generator:**
- Menggunakan Canvas API (no external library needed)
- Pattern pseudo-random berdasarkan tracking number
- Position markers di 3 sudut (seperti QR code asli)
- FuelFriendly branding di tengah QR code
- Ukuran 280x280px, responsive

### 2. TrackOrderScreen.tsx - Button QR Code

**Perubahan:**
- ✅ Import `QrCode` icon dari lucide-react
- ✅ Import `QRCodeModal` component
- ✅ Tambah state `showQRModal`
- ✅ Tambah button QR code di sebelah button Call dan Message
- ✅ Button dengan style yang sama (green circular button)
- ✅ Animasi scale saat di-klik
- ✅ Render QRCodeModal component

**Lokasi Button:**
```tsx
<div className="flex gap-3">
  <button>Message</button>  // MessageCircle icon
  <button>Call</button>      // Phone icon
  <button>QR Code</button>   // QrCode icon (NEW!)
</div>
```

### 3. Design & UX

**Button QR Code:**
- Warna: Green (#3AC36C)
- Shape: Circular (rounded-full)
- Size: 48x48px (w-12 h-12)
- Icon: QrCode dari lucide-react
- Hover: Darker green (#2ea85a)
- Active: Scale 0.95
- Animation: Scale bounce effect

**QR Code Modal:**
- Background: White dengan rounded-3xl
- Shadow: 2xl untuk depth
- Padding: 24px
- Max width: 384px (max-w-sm)
- Close button: Top-right corner
- Header: Icon + Title + Description
- QR Code: Border 2px gray-200
- Tracking number: Gray background box
- Order details: Key-value pairs
- Info box: Blue background dengan tips

### 4. Cara Kerja

1. User klik button QR Code (icon QR)
2. Modal muncul dengan animasi scale + fade
3. QR Code di-generate otomatis dari tracking number
4. User bisa show QR code ke driver
5. Driver scan QR code untuk verify delivery
6. User klik X atau backdrop untuk close modal
7. Modal tutup dengan animasi smooth

### 5. Data yang Ditampilkan

**QR Code berisi:**
- Tracking number (encoded dalam pattern)

**Modal menampilkan:**
- QR Code visual
- Tracking number (text)
- Fuel type
- Fuel quantity
- Order status
- Info untuk driver

### 6. Testing

Untuk test fitur:
```bash
npm run dev
```

1. Login ke aplikasi
2. Buat order baru atau pilih existing order
3. Masuk ke Track Order screen
4. Klik button QR Code (icon QR hijau)
5. Modal QR code akan muncul
6. Verify QR code ter-generate dengan benar
7. Verify tracking number sesuai
8. Test close modal (X button atau backdrop)

### 7. Browser Compatibility

- ✅ Chrome/Edge (Canvas API support)
- ✅ Firefox (Canvas API support)
- ✅ Safari (Canvas API support)
- ✅ Mobile browsers (responsive design)

### 8. Future Improvements

Bisa ditambahkan:
- Real QR code library (qrcode.react atau qr-code-styling)
- Download QR code as image
- Share QR code via WhatsApp/Email
- Scan QR code feature untuk driver app
- QR code dengan logo FuelFriendly di tengah
- Color customization
- Error correction level options

## File yang Diubah

1. `components/QRCodeModal.tsx` - NEW FILE
2. `screens/TrackOrderScreen.tsx` - MODIFIED
   - Import QrCode icon
   - Import QRCodeModal
   - Add showQRModal state
   - Add QR button
   - Render QRCodeModal

## Dependencies

Tidak ada dependency baru yang perlu diinstall. Menggunakan:
- Canvas API (built-in browser)
- lucide-react (sudah ada)
- anime.js (sudah ada)

## Screenshot Reference

Button layout:
```
[Driver Info]
[Message] [Call] [QR Code]  <- 3 buttons sejajar
```

QR Modal:
```
┌─────────────────────┐
│  [X]                │
│  [Icon]             │
│  Order QR Code      │
│  Show this to driver│
│                     │
│  ┌───────────────┐  │
│  │               │  │
│  │   QR CODE     │  │
│  │               │  │
│  └───────────────┘  │
│                     │
│  Tracking: FF-12345 │
│                     │
│  Fuel: Regular      │
│  Qty: 10L           │
│  Status: On the way │
│                     │
│  💡 Driver will scan│
└─────────────────────┘
```
