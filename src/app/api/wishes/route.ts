import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = 'edge';

// API Endpoint nhận POST request lưu lời chúc mới từ khách mời
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { wedding_id, guest_name, content } = body;

    // Validate dữ liệu đầu vào
    if (!wedding_id || !guest_name || !content) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc (wedding_id, guest_name, content)' },
        { status: 400 }
      );
    }

    // Nếu là ID xem trước (preview), trả về dữ liệu mock thành công luôn
    if (typeof wedding_id === 'string' && wedding_id.startsWith('preview-')) {
      const mockWish = {
        id: `mock-wish-${Date.now()}`,
        wedding_id,
        guest_name,
        content,
        created_at: new Date().toISOString(),
      };
      return NextResponse.json({ success: true, data: mockWish }, { status: 200 });
    }

    // Insert lời chúc vào bảng wishes trong Supabase
    const { data, error } = await supabase
      .from('wishes')
      .insert([
        {
          wedding_id,
          guest_name,
          content,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Lỗi khi insert vào Supabase:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// API Endpoint xóa lời chúc
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const wish_id = searchParams.get('wish_id');
    const secret_key = searchParams.get('secret_key');

    if (!wish_id || !secret_key) {
      return NextResponse.json(
        { error: 'Thiếu wish_id hoặc secret_key' },
        { status: 400 }
      );
    }

    // Lấy thông tin lời chúc để xem nó thuộc đám cưới nào
    const { data: wish, error: wishError } = await supabase
      .from('wishes')
      .select('*, weddings:wedding_id(*)')
      .eq('id', wish_id)
      .single();

    if (wishError || !wish) {
      return NextResponse.json({ error: 'Không tìm thấy lời chúc' }, { status: 404 });
    }

    // Ép kiểu weddings trả về
    const wedding = wish.weddings as any;

    // Kiểm tra secret_key có khớp không
    if (!wedding || wedding.secret_key !== secret_key) {
      return NextResponse.json({ error: 'Không có quyền xóa lời chúc này' }, { status: 403 });
    }

    // Thực hiện xóa
    const { error: deleteError } = await supabase
      .from('wishes')
      .delete()
      .eq('id', wish_id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Xóa lời chúc thành công' });
  } catch (error) {
    console.error('API DELETE Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

