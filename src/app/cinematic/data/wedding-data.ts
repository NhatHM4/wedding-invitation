import { WeddingData } from "./types";

export const weddingData: WeddingData = {
  bride: {
    name: "Thanh Thúy",
    shortName: "Thúy",
  },
  groom: {
    name: "Minh Tùng",
    shortName: "Tùng",
  },
  weddingDate: "2026-10-25T16:00:00+07:00",
  lunarDate: "Ngày 05 tháng 09 năm Bính Ngọ",
  venue: {
    name: "Tư gia nhà gái",
    address: "124 Đường Chiến Thắng, Lê Chân, Hải Phòng",
    mapUrl: "https://maps.google.com/",
    dressCode: "Trang phục lịch sự, tone màu pastel hoặc trắng kem",
  },
  music: "/cinematic/audio/wedding-song.mp3",
  giftInfo: {
    bankName: "Vietcombank",
    accountHolder: "NGUYEN MINH TUNG",
    accountNumber: "1234567890",
    qrImage: "/cinematic/images/qr-placeholder.png",
  },
  loveStory: [
    {
      date: "2020-03-15",
      title: "Lần đầu gặp gỡ",
      description:
        "Một buổi chiều mùa xuân, trong quán cà phê nhỏ ở phố cổ. Ánh nắng chiếu qua ô cửa kính, và em ngồi đó — đẹp như một bài thơ mà anh chưa kịp viết.",
      image: "/cinematic/images/story-1.jpg",
    },
    {
      date: "2020-06-20",
      title: "Buổi hẹn hò đầu tiên",
      description:
        "Chúng tôi đi dạo bên bờ sông vào lúc hoàng hôn. Không cần nói nhiều, chỉ cần bước chân song hành và những nụ cười len lỏi giữa câu chuyện.",
      image: "/cinematic/images/story-2.jpg",
    },
    {
      date: "2025-12-24",
      title: "Lời cầu hôn",
      description:
        "Đêm Giáng Sinh, dưới ánh đèn lấp lánh và tuyết nhẹ rơi. Anh quỳ xuống, nắm tay em và hỏi: 'Em có muốn cùng anh viết tiếp câu chuyện này không?'",
      image: "/cinematic/images/story-3.jpg",
    },
    {
      date: "2026-10-25",
      title: "Ngày trọng đại",
      description:
        "Hôm nay, chúng tôi bước vào chương mới. Không chỉ là đám cưới — mà là lời hứa yêu thương trọn đời.",
      image: "/cinematic/images/story-4.jpg",
    },
  ],
  images: {
    cover: "/cinematic/images/cover.jpg",
    hero: "/cinematic/images/hero.jpg",
    bride: "/cinematic/images/bride.jpg",
    groom: "/cinematic/images/groom.jpg",
    couple: "/cinematic/images/couple.jpg",
    gallery: [
      "/cinematic/images/gallery-1.jpg",
      "/cinematic/images/gallery-2.jpg",
      "/cinematic/images/gallery-3.jpg",
      "/cinematic/images/gallery-4.jpg",
      "/cinematic/images/gallery-5.jpg",
      "/cinematic/images/gallery-6.jpg",
    ],
  },
};
