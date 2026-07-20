export interface PersonInfo {
  name: string;
  shortName: string;
}

export interface VenueInfo {
  name: string;
  address: string;
  mapUrl: string;
  dressCode?: string;
}

export interface GiftInfo {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  qrImage: string;
}

export interface LoveStoryMilestone {
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface WeddingImages {
  cover: string;
  hero: string;
  bride: string;
  groom: string;
  couple?: string;
  gallery: string[];
}

export interface WeddingData {
  bride: PersonInfo;
  groom: PersonInfo;
  weddingDate: string;
  lunarDate: string;
  venue: VenueInfo;
  music: string;
  giftInfo: GiftInfo;
  loveStory: LoveStoryMilestone[];
  images: WeddingImages;
}

export interface RSVPFormData {
  fullName: string;
  attending: "yes" | "no";
  guestCount?: number;
  side: "groom" | "bride";
  message?: string;
}
