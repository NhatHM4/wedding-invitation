"use client";

import Image from "next/image";

interface TmdvCoupleSectionProps {
  wedding: any;
}

export default function TmdvCoupleSection({ wedding }: TmdvCoupleSectionProps) {
  const groomName = wedding?.groom_name || "Trần Minh Hoàng";
  const brideName = wedding?.bride_name || "Phạm Mai Hương";

  const locationInfo = wedding?.location_info || {};
  const groomFamily = locationInfo.groom_family || {};
  const brideFamily = locationInfo.bride_family || {};

  const groomFather = groomFamily.father_name || "TRẦN QUỐC TUẤN";
  const groomMother = groomFamily.mother_name || "LÊ THỊ MỸ DUYÊN";
  const brideFather = brideFamily.father_name || "PHẠM GIA LONG";
  const brideMother = brideFamily.mother_name || "NGUYỄN THỊ NGỌC HẠNH";

  return (
    <section 
      className="relative w-full py-16 px-6 overflow-hidden select-none bg-cover bg-no-repeat border-b border-red-800/10 flex flex-col items-center"
      style={{
        backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
      }}
    >
      {/* Background Ornament Lights/Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#b91c1c]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="text-center mb-12 z-10 is-animation anim-fade-down">
        <div className="relative w-14 h-14 mx-auto mb-3">
          <Image
            src="/thiepmaudovang/images/happiness-header.png"
            alt="Double Happiness"
            fill
            sizes="56px"
            className="object-contain"
          />
        </div>
        <h3 className="font-mightiest text-[26px] text-[#8e0101] tracking-wider">Cô Dâu & Chú Rể</h3>
        <div className="h-[2px] w-20 bg-[#c5a880] mx-auto mt-2" />
      </div>

      {/* Couple Profiles */}
      <div className="w-full flex flex-col gap-10 z-10 max-w-[360px]">
        {/* Chú rể */}
        <div className="flex flex-col gap-4 bg-[#b91c1c]/5 border border-[#c5a880]/40 rounded-2xl p-5 shadow-[0_10px_25px_-5px_rgba(185,28,28,0.08)] backdrop-blur-sm is-animation anim-fade-left">
          <div className="flex gap-4 items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#b91c1c] flex-shrink-0 shadow-md">
              <Image
                src="/thiepmaudovang/images/gallery-2.jpg"
                alt="Chú rể"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-[#b91c1c] uppercase tracking-wider block font-sans">Chú rể</span>
              <h4 className="font-mightiest text-xl text-stone-800 mt-0.5 leading-snug">{groomName}</h4>
              <div className="text-[11px] text-stone-600 font-sans mt-1.5 leading-normal">
                <p><span className="text-stone-400">Con ông:</span> {groomFather}</p>
                <p><span className="text-stone-400">Con bà:</span> {groomMother}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#c5a880]/20 pt-3">
            <p className="text-[12px] text-stone-600 font-sans leading-relaxed italic text-center px-2">
              &ldquo;Là một chàng trai điềm đạm, ấm áp và luôn tràn đầy hoài bão. Đối với anh, tình yêu không chỉ là những lời ngọt ngào mà còn là sự thấu hiểu, cùng nhau vượt qua mọi hành trình cuộc sống.&rdquo;
            </p>
          </div>
        </div>

        {/* Cô dâu */}
        <div className="flex flex-col gap-4 bg-[#b91c1c]/5 border border-[#c5a880]/40 rounded-2xl p-5 shadow-[0_10px_25px_-5px_rgba(185,28,28,0.08)] backdrop-blur-sm is-animation anim-fade-right">
          <div className="flex gap-4 items-center flex-row-reverse text-right">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#b91c1c] flex-shrink-0 shadow-md">
              <Image
                src="/thiepmaudovang/images/gallery-1.jpg"
                alt="Cô dâu"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-[#b91c1c] uppercase tracking-wider block font-sans">Cô dâu</span>
              <h4 className="font-mightiest text-xl text-stone-800 mt-0.5 leading-snug">{brideName}</h4>
              <div className="text-[11px] text-stone-600 font-sans mt-1.5 leading-normal">
                <p><span className="text-stone-400">Con ông:</span> {brideFather}</p>
                <p><span className="text-stone-400">Con bà:</span> {brideMother}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#c5a880]/20 pt-3">
            <p className="text-[12px] text-stone-600 font-sans leading-relaxed italic text-center px-2">
              &ldquo;Một cô gái dịu dàng, tinh tế và luôn mang đến nguồn năng lượng tích cực cho mọi người xung quanh. Cô tin rằng hạnh phúc chân chính là khi hai trái tim luôn đập cùng một nhịp.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
