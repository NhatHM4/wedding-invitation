"use client";

import Image from "next/image";

interface Wish {
  id: any;
  guest_name: string;
  content: string;
  created_at: string;
}

interface TmdvWishesSectionProps {
  wishes: Wish[];
}

export default function TmdvWishesSection({ wishes }: TmdvWishesSectionProps) {
  return (
    <section 
      id="w-tmdv-wishes" 
      className="relative w-full h-[520px] overflow-hidden select-none bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
      }}
    >
      {/* Happiness seal mini decor */}
      <div id="w-wsh-decor" className="absolute top-[10px] left-[186px] w-[48px] h-[48px] z-10 is-animation anim-zoom">
        <Image
          src="/thiepmaudovang/images/double-happiness.png"
          alt="Happiness Mini"
          fill
          sizes="48px"
          className="object-contain animate-pulse"
        />
      </div>

      {/* Title */}
      <div id="w-wsh-title" className="absolute top-[65px] left-[50px] w-[320px] h-[40px] z-10 flex items-center justify-center font-ephesis text-[28px] text-[#7d1f2a] text-center font-bold is-animation anim-fade-down">
        Sổ Lưu Bút Lời Chúc
      </div>

      {/* Red Card Frame Container */}
      <div id="w-wsh-frame" className="absolute top-[120px] left-[35px] w-[350px] h-[340px] z-10 bg-[#7d1f2a] rounded-[16px] border border-[#c5a880] p-[15px] flex flex-col is-animation anim-zoom">
        {/* Scrollable list */}
        <div className="w-full h-full overflow-y-auto pr-1 flex flex-col gap-3 custom-scrollbar">
          {wishes.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-white/80 font-sans text-[13px] text-center px-4 italic leading-relaxed">
              Chưa có lời chúc nào.<br />Hãy gửi lời chúc đầu tiên ở form bên trên để chúc phúc cho Dâu Rể nhé!
            </div>
          ) : (
            wishes.map((wish) => {
              // Try to separate name and relationship if stored as "Name (Relationship)"
              const match = wish.guest_name.match(/^(.*?)\s*\((.*?)\)$/);
              const displayName = match ? match[1] : wish.guest_name;
              const relation = match ? match[2] : "";

              return (
                <div 
                  key={wish.id} 
                  className="w-full bg-[#fdfdfb] rounded-[10px] p-3 shadow-md border-l-4 border-[#c5a880] flex flex-col justify-between min-h-[75px]"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <span className="font-sans font-bold text-[13px] text-[#7d1f2a] truncate max-w-[180px]">
                        {displayName}
                      </span>
                      {relation && (
                        <span className="font-sans font-semibold text-[10px] bg-[#7d1f2a]/10 text-[#7d1f2a] px-2 py-0.5 rounded-[12px] max-w-[100px] truncate">
                          {relation}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-[12px] text-gray-800 mt-1.5 leading-normal whitespace-pre-wrap break-words">
                      {wish.content}
                    </p>
                  </div>
                  <div className="w-full text-right mt-2">
                    <span className="font-sans text-[9px] text-gray-400">
                      {new Date(wish.created_at).toLocaleDateString('vi-VN', { 
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
