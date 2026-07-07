import React from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import InviteClient from './InviteClient';

export const runtime = 'edge';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ key?: string }>;
}

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

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const key = resolvedSearchParams.key || '';

  const wedding = await getWeddingData(slug);
  if (!wedding) {
    notFound();
  }

  // 1. Kiểm tra quyền truy cập qua mã bí mật (secret_key)
  const isAuthorized = key === wedding.secret_key;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center max-w-md w-full">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Quyền Truy Cập Bị Từ Chối</h1>
          <p className="text-gray-500 text-sm mb-6">
            Mã khóa truy cập (key) không hợp lệ hoặc bị thiếu. Vui lòng kiểm tra lại đường dẫn được gửi từ ban quản trị.
          </p>
          <a 
            href="/"
            className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 px-6 rounded text-sm transition duration-150"
          >
            Quay Về Trang Chủ
          </a>
        </div>
      </div>
    );
  }

  // 2. Lấy danh sách lời chúc ban đầu cho trang quản lý
  const wishes = await getWishes(wedding.id);

  return (
    <InviteClient 
      wedding={wedding} 
      secretKey={wedding.secret_key} 
      initialWishes={wishes} 
    />
  );
}
