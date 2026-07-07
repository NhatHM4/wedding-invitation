import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import TemplateA from '@/components/templates/TemplateA';

export const runtime = 'edge';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string }>;
}

// Hàm lấy dữ liệu đám cưới từ Supabase
async function getWeddingData(slug: string) {
  let query = supabase.from('weddings').select('*');

  if (slug.startsWith('domain-')) {
    const domain = slug.replace('domain-', '');
    const domainWithoutWww = domain.replace(/^www\./, '');
    // Truy vấn custom_domain bằng chính domain hoặc domain đã loại bỏ www
    query = query.or(`custom_domain.eq.${domain},custom_domain.eq.${domainWithoutWww}`);
  } else {
    query = query.eq('slug', slug);
  }

  const { data, error } = await query.single();

  if (error || !data) {
    return null;
  }
  return data;
}

// Hàm lấy danh sách lời chúc từ Supabase
async function getWishes(weddingId: string) {
  const { data, error } = await supabase
    .from('wishes')
    .select('*')
    .eq('wedding_id', weddingId)
    .order('created_at', { ascending: false });

  if (error || !data) {
    return [];
  }
  return data;
}

// 1. Tạo Metadata động phục vụ cho SEO và mạng xã hội (Facebook, Zalo share)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wedding = await getWeddingData(slug);

  if (!wedding) {
    return {
      title: 'Không Tìm Thấy Thiệp Cưới',
    };
  }

  return {
    title: `Trân Trọng Kính Mời - Lễ Cưới Của ${wedding.groom_name} & ${wedding.bride_name}`,
    description: `Thư mời đám cưới của ${wedding.groom_name} & ${wedding.bride_name}. Sự hiện diện của bạn là niềm vinh hạnh cho gia đình chúng tôi!`,
    openGraph: {
      title: `Lễ Cưới Của ${wedding.groom_name} & ${wedding.bride_name}`,
      description: `Trân trọng kính mời quý khách tới tham dự ngày chung đôi của chúng tôi!`,
      type: 'website',
      images: wedding.images && wedding.images.length > 0 ? [{ url: wedding.images[0] }] : [],
    },
  };
}

// 2. Component Page chính
export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  
  const wedding = await getWeddingData(slug);
  if (!wedding) {
    notFound();
  }

  const wishes = await getWishes(wedding.id);
  const to = resolvedSearchParams.to || '';

  // Trong tương lai nếu có thêm TemplateB, TemplateC... ta có thể check template_id ở đây để render component tương ứng.
  // Ví dụ: if (wedding.template_id === 'TemplateB') return <TemplateB ... />
  
  return (
    <TemplateA
      wedding={wedding}
      to={to}
      wishes={wishes}
    />
  );
}
