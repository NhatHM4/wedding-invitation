'use client';

import React, { useState, useEffect } from 'react';
import { Wedding, Wish } from '@/types';

interface InviteClientProps {
  wedding: Wedding;
  secretKey: string;
  initialWishes: Wish[];
}

export default function InviteClient({ wedding, secretKey, initialWishes }: InviteClientProps) {
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [originUrl, setOriginUrl] = useState('');

  // Lấy origin URL trên client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const protocol = window.location.protocol; // http: hoặc https:
      const port = window.location.port; // 3000 ở local hoặc trống ở prod
      const portSuffix = port ? `:${port}` : '';
      const hostname = window.location.hostname.toLowerCase();

      if (wedding.custom_domain) {
        // Nếu cặp đôi có tên miền riêng độc lập (ví dụ: huy-linh.com)
        setOriginUrl(`${protocol}//${wedding.custom_domain}${portSuffix}`);
      } else {
        // Nếu dùng subdomain của nền tảng (ví dụ: minhhoang-maihuong.wedding-nhathm.com)
        // Tìm ra domain gốc của hệ thống dựa trên URL hiện tại
        let mainDomain = 'localhost';
        if (hostname.endsWith('wedding-nhathm.com')) {
          mainDomain = 'wedding-nhathm.com';
        } else if (hostname.endsWith('wedding.com')) {
          mainDomain = 'wedding.com';
        } else if (hostname.endsWith('savethedate.io.vn')) {
          mainDomain = 'savethedate.io.vn';
        }

        setOriginUrl(`${protocol}//${wedding.slug}.${mainDomain}${portSuffix}`);
      }
    }
  }, [wedding.custom_domain, wedding.slug]);

  const handleGenerateLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    // Chuẩn hóa tên khách mời sang dạng URL query parameter
    // ví dụ: "Anh Tuấn" -> "Anh+Tuan" hoặc giữ nguyên tiếng Việt có dấu vì trình duyệt tự encode
    const encodedName = encodeURIComponent(guestName.trim());
    
    // Tạo link: https://slug.wedding.com?to=Anh+Tuan
    const link = `${originUrl}?to=${encodedName}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        alert('Không thể tự động copy. Vui lòng copy thủ công từ ô text.');
      }
    } catch (err) {
      console.error('Fallback copy error:', err);
      alert('Không thể tự động copy. Vui lòng copy thủ công từ ô text.');
    }
    document.body.removeChild(textArea);
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(generatedLink)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(err => {
          console.error('Clipboard write error:', err);
          fallbackCopyText(generatedLink);
        });
    } else {
      fallbackCopyText(generatedLink);
    }
  };

  const handleDeleteWish = async (wishId: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa lời chúc này?')) return;
    setIsDeleting(wishId);

    try {
      const res = await fetch(`/api/wishes?wish_id=${wishId}&secret_key=${secretKey}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setWishes(wishes.filter(w => w.id !== wishId));
      } else {
        alert('Có lỗi xảy ra khi xóa lời chúc. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Delete wish error:', error);
      alert('Không thể kết nối đến máy chủ.');
    } finally {
      setIsDeleting(null);
    }
  };

  const handleRefreshWishes = async () => {
    try {
      const res = await fetch(`/api/wishes?wedding_id=${wedding.id}`); // Giả sử trong tương lai có API lấy lời chúc, hoặc truy vấn trực tiếp từ client
      // Để đơn giản, ta truy vấn trực tiếp Supabase từ Client để tải lại lời chúc
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .eq('wedding_id', wedding.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setWishes(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Trang Quản Lý Thiệp</span>
          <h1 className="text-2xl font-bold mt-3 text-gray-900">
            Chào mừng Cô dâu & Chú rể ({wedding.groom_name} & {wedding.bride_name})
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Sử dụng trang này để tạo thiệp gửi khách và xem những lời chúc tốt đẹp nhất.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Cột 1: Tạo Link Mời Khách */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">1. Tạo Link Thiệp Cho Khách</h2>
              
              <form onSubmit={handleGenerateLink} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên khách mời</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={e => setGuestName(e.target.value)}
                    placeholder="Ví dụ: Anh Tuấn, Chị Hoa, Bạn Nam..."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-900"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded text-sm transition duration-150"
                >
                  Tạo Link Gửi Khách
                </button>
              </form>

              {generatedLink && (
                <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded space-y-3">
                  <p className="text-xs font-medium text-indigo-800 uppercase tracking-wider">Link thiệp của {guestName}:</p>
                  <textarea
                    readOnly
                    value={generatedLink}
                    rows={2}
                    className="w-full text-xs p-2 bg-white border border-indigo-200 rounded text-gray-700 focus:outline-none"
                  ></textarea>
                  <button
                    onClick={handleCopyLink}
                    className={`w-full py-2 px-4 rounded text-xs font-bold text-white transition duration-150 ${
                      copied ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                  >
                    {copied ? 'Đã copy thành công! ✓' : 'Copy Link Gửi Khách'}
                  </button>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <p>💡 <strong>Hướng dẫn:</strong> Nhập tên khách mời, bấm "Tạo Link", sau đó copy link vừa sinh để gửi qua Zalo, Messenger, SMS... Khách mời mở link sẽ thấy thiệp hiển thị lời mời đích danh họ.</p>
            </div>
          </div>

          {/* Cột 2: Hòm Lời Chúc */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col h-[500px]">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg font-bold text-gray-800">2. Lời Chúc Nhận Được ({wishes.length})</h2>
              <button
                onClick={handleRefreshWishes}
                className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3-3m0 0l3 3m-3-3v12" />
                </svg>
                Tải lại
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {wishes.length === 0 ? (
                <div className="text-center py-12 text-gray-400 italic text-sm">
                  Chưa có lời chúc nào được gửi về.
                </div>
              ) : (
                wishes.map((wish) => (
                  <div key={wish.id} className="p-3 bg-gray-50 rounded border border-gray-200 relative group">
                    <p className="font-bold text-sm text-gray-900">{wish.guest_name}</p>
                    <p className="text-xs text-gray-600 mt-1 whitespace-pre-wrap leading-relaxed">{wish.content}</p>
                    <div className="flex justify-between items-center mt-2.5">
                      <span className="text-[10px] text-gray-400">
                        {new Date(wish.created_at).toLocaleDateString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <button
                        onClick={() => handleDeleteWish(wish.id)}
                        disabled={isDeleting === wish.id}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold"
                      >
                        {isDeleting === wish.id ? 'Đang xóa...' : 'Xóa'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
