export interface Wedding {
  id: string;
  slug: string;
  secret_key: string;
  groom_name: string;
  bride_name: string;
  event_date: string | null;
  location_info: {
    groom_family?: {
      father_name?: string;
      mother_name?: string;
      address?: string;
      map_url?: string;
      time?: string;
      date?: string;
    };
    bride_family?: {
      father_name?: string;
      mother_name?: string;
      address?: string;
      map_url?: string;
      time?: string;
      date?: string;
    };
  };
  music_url?: string;
  images?: string[];
  template_id: string;
  custom_domain?: string | null;
}

export interface Wish {
  id: number;
  wedding_id: string;
  guest_name: string;
  content: string;
  created_at: string;
}
