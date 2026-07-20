# 💒 Cinematic Wedding Invitation Template

Thiệp cưới online phong cách cinematic — editorial — giàu cảm xúc. Được xây dựng trên nền tảng Next.js với animation mượt mà và thiết kế mobile-first.

## ✨ Tính năng

- 🎬 Opening cover với animation mở thiệp cinematic
- 🎵 Music controller với animation sóng âm
- 📖 Hero editorial với typography lớn và parallax
- 💌 Lời mời cưới với stagger reveal animation
- 👫 Giới thiệu cô dâu & chú rể split-screen
- 💕 Love story cinematic với parallax background
- ⏰ Countdown timer với flip animation
- 📸 Photo gallery horizontal scroll + masonry + lightbox
- 📅 Calendar tự động đánh dấu ngày cưới
- 📍 Thông tin sự kiện với nút Google Maps
- 🎁 Gift box modal với QR code + sao chép tài khoản
- 📝 RSVP form validate bằng Zod
- 🌙 Dark cinematic theme

## 🚀 Cài đặt

```bash
npm install
npm run dev
```

Truy cập: `http://localhost:3000/cinematic`

## ⚙️ Tùy chỉnh

Toàn bộ nội dung được quản lý trong file:

```
src/app/cinematic/data/wedding-data.ts
```

### Đổi tên cô dâu & chú rể

```ts
bride: {
  name: "Tên đầy đủ cô dâu",
  shortName: "Tên ngắn",
},
groom: {
  name: "Tên đầy đủ chú rể",
  shortName: "Tên ngắn",
},
```

### Đổi ngày cưới

```ts
weddingDate: "2026-10-25T16:00:00+07:00", // ISO 8601 format
lunarDate: "Ngày 05 tháng 09 năm Bính Ngọ",
```

### Đổi địa điểm & bản đồ

```ts
venue: {
  name: "Tên địa điểm",
  address: "Địa chỉ đầy đủ",
  mapUrl: "https://maps.google.com/...", // Link Google Maps
  dressCode: "Mô tả trang phục",
},
```

### Thay ảnh

Đặt ảnh vào thư mục `public/cinematic/images/` và cập nhật đường dẫn:

```ts
images: {
  cover: "/cinematic/images/cover.jpg",      // Ảnh bìa (cover)
  hero: "/cinematic/images/hero.jpg",        // Ảnh hero section
  bride: "/cinematic/images/bride.jpg",      // Ảnh cô dâu
  groom: "/cinematic/images/groom.jpg",      // Ảnh chú rể
  gallery: [
    "/cinematic/images/gallery-1.jpg",       // Ảnh gallery
    // Thêm/bớt ảnh tại đây
  ],
},
```

**Khuyến nghị:**
- Dùng ảnh chất lượng cao (tối thiểu 1200px chiều rộng)
- Định dạng WebP hoặc JPEG để tối ưu dung lượng
- Tỉ lệ ảnh cover: 3:4 (portrait)
- Tỉ lệ ảnh hero: 2:3 hoặc 3:4

### Thay nhạc

Đặt file nhạc vào `public/cinematic/audio/` và cập nhật:

```ts
music: "/cinematic/audio/your-song.mp3",
```

**Lưu ý:** Dùng file MP3, dung lượng khuyến nghị dưới 3MB.

### Đổi thông tin ngân hàng (Gift Box)

```ts
giftInfo: {
  bankName: "Tên ngân hàng",
  accountHolder: "TEN CHU TAI KHOAN",
  accountNumber: "0123456789",
  qrImage: "/cinematic/images/qr-code.png", // Ảnh mã QR
},
```

### Tùy chỉnh Love Story

```ts
loveStory: [
  {
    date: "2020-03-15",           // Ngày (YYYY-MM-DD)
    title: "Tiêu đề",            // Tiêu đề sự kiện
    description: "Mô tả...",     // Nội dung
    image: "/cinematic/images/story-1.jpg", // Ảnh minh họa
  },
  // Thêm/bớt cột mốc tại đây
],
```

## 📝 Cấu hình RSVP

### Development mode

Khi chạy dev server không cần Supabase, form sẽ log dữ liệu ra console.

### Production mode (Supabase)

1. Tạo project trên [supabase.com](https://supabase.com)
2. Tạo bảng `rsvp_responses`:

```sql
CREATE TABLE rsvp_responses (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guest_count INTEGER DEFAULT 1,
  side TEXT DEFAULT 'bride',
  message TEXT,
  template TEXT DEFAULT 'cinematic',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

3. Thêm biến môi trường vào `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 🚀 Triển khai lên Vercel

1. Push code lên GitHub
2. Truy cập [vercel.com](https://vercel.com) → Import repository
3. Thêm Environment Variables (nếu dùng Supabase)
4. Deploy!

```bash
# Hoặc dùng Vercel CLI
npx vercel --prod
```

## 🎨 Tùy chỉnh màu sắc

Các màu chủ đạo được định nghĩa trong các component:

| Màu | Giá trị | Công dụng |
|-----|---------|-----------|
| Background | `#1a1a1a` | Nền tối cinematic |
| Text | `#F5F0E8` | Chữ cream ấm |
| Accent | `#D4AF72` | Champagne gold |
| Accent hover | `#C4A060` | Gold đậm hơn |

Để thay đổi, tìm và thay thế các mã màu trong thư mục `src/app/cinematic/`.

## 📱 Responsive

- Mobile-first design (375px–430px)
- Tablet (768px)
- Desktop (1024px+)
- Không bị tràn ngang ở mọi kích thước

## ♿ Accessibility

- Hỗ trợ `prefers-reduced-motion`
- Nút bấm tối thiểu 44px
- Label đầy đủ cho form inputs
- Aria labels cho interactive elements
- Semantic HTML

## 📂 Cấu trúc thư mục

```
src/app/cinematic/
├── layout.tsx              # Layout + SEO
├── page.tsx                # Main orchestrator
├── cinematic.css           # Custom animations
├── data/
│   ├── types.ts            # TypeScript interfaces
│   └── wedding-data.ts     # Nội dung thiệp
├── components/
│   ├── OpeningCover.tsx    # Màn hình mở thiệp
│   ├── MusicController.tsx # Nút nhạc
│   ├── HeroEditorial.tsx   # Hero section
│   ├── InvitationMessage.tsx # Lời mời
│   ├── CoupleIntroduction.tsx # Cô dâu chú rể
│   ├── LoveStory.tsx       # Câu chuyện tình yêu
│   ├── Countdown.tsx       # Đếm ngược
│   ├── PhotoExperience.tsx # Gallery ảnh
│   ├── WeddingCalendar.tsx # Lịch cưới
│   ├── EventInfo.tsx       # Thông tin sự kiện
│   ├── GiftBox.tsx         # Mừng cưới
│   ├── RSVPForm.tsx        # Form xác nhận
│   ├── Footer.tsx          # Footer
│   ├── ScrollReveal.tsx    # Animation wrapper
│   └── SectionDivider.tsx  # Divider trang trí
└── hooks/
    ├── useCountdown.ts     # Countdown hook
    └── useReducedMotion.ts # Reduced motion hook
```
