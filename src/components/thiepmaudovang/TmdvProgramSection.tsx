"use client";

import Image from "next/image";

interface TmdvProgramSectionProps {
  wedding: any;
}

export default function TmdvProgramSection({ wedding }: TmdvProgramSectionProps) {
  // Helper to generate calendar days for a given date (Monday-first)
  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    const totalDays = new Date(year, month + 1, 0).getDate();

    const weeks: (number | null)[][] = [];
    let currentWeek: (number | null)[] = Array(7).fill(null);

    for (let i = 0; i < startOffset; i++) {
      currentWeek[i] = null;
    }

    let colIndex = startOffset;
    for (let day = 1; day <= totalDays; day++) {
      currentWeek[colIndex] = day;
      colIndex++;
      if (colIndex === 7) {
        weeks.push(currentWeek);
        currentWeek = Array(7).fill(null);
        colIndex = 0;
      }
    }

    if (currentWeek.some(val => val !== null)) {
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const locationInfo = wedding?.location_info || {};
  const groomFamily = locationInfo.groom_family || {};
  const brideFamily = locationInfo.bride_family || {};

  const groomTime = groomFamily.time || "14:00";
  const groomDateStr = groomFamily.date || "14.12.2025";
  const groomAddress = groomFamily.address || "Tại Tư Gia Nhà Trai";
  const groomMapUrl = groomFamily.map_url || "https://maps.app.goo.gl/rEY4BMbVBai5KmwEA";
  const groomLunarDate = groomFamily.lunar_date || "(Tức Ngày 25 Tháng 10 Năm Ất Tỵ)";

  const brideTime = brideFamily.time || "18:00";
  const brideDateStr = brideFamily.date || "14.12.2025";
  const brideAddress = brideFamily.address || "Tại Adora Center – Phú Nhuận";
  const brideMapUrl = brideFamily.map_url || "https://maps.app.goo.gl/rEY4BMbVBai5KmwEA";
  const brideLunarDate = brideFamily.lunar_date || "(Tức Ngày 25 Tháng 10 Năm Ất Tỵ)";

  // Split date components for visual effect (default Dec 14)
  let dayNum = "14";
  let monthStr = "Tháng 12";
  let yearStr = "Năm 2025";
  let weekdayStr = "Chủ Nhật";

  if (wedding?.event_date) {
    const d = new Date(wedding.event_date);
    dayNum = d.getDate().toString();
    monthStr = `Tháng ${d.getMonth() + 1}`;
    yearStr = `Năm ${d.getFullYear()}`;
    weekdayStr = d.toLocaleDateString("vi-VN", { weekday: "long" });
  }

  const handleOpenMapGroom = () => {
    window.open(groomMapUrl, "_blank");
  };

  const handleOpenMapBride = () => {
    window.open(brideMapUrl, "_blank");
  };

  // Determine if we should show standard Dec 2025 PNG or customized date UI
  const isDefaultDec2025 = !wedding?.event_date || new Date(wedding.event_date).getFullYear() === 2025;

  return (
    <div className="w-full flex flex-col">
      {/* 1. Intro Section (#w-0k5qs9kr) */}
      <section 
        id="w-0k5qs9kr" 
        className="relative w-full h-[298px] overflow-hidden select-none bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
        }}
      >
        {/* Ribbon Divider */}
        <div id="w-20spjy25" className="absolute top-[0px] left-[127.5px] w-[165px] h-[35px] z-10 overflow-hidden is-animation anim-fade-down">
          <div className="relative w-full h-[166px] top-[-63px]">
            <Image
              src="/thiepmaudovang/images/ribbon-divider.png"
              alt="Ribbon Divider"
              fill
              sizes="165px"
              className="object-contain"
            />
          </div>
        </div>

        {/* Text "Trân Trọng Kính Mời" */}
        <div id="w-6rllui0l" className="absolute top-[41.5px] left-[58px] w-[304px] h-[37.5px] z-10 flex items-center justify-center font-ephesis text-[25px] text-black text-center is-animation anim-fade-up">
          Trân Trọng Kính Mời
        </div>

        {/* Small photo 1 */}
        <div id="w-dyyqc44u" className="absolute top-[117.5px] left-[24.6px] w-[116px] h-[165px] z-10 overflow-hidden shadow-sm is-animation anim-fade-left">
          <Image
            src="/thiepmaudovang/images/couple-small-1.jpg"
            alt="Small Portrait 1"
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>

        {/* Small photo 2 */}
        <div id="w-p5zt0rep" className="absolute top-[85.5px] left-[152px] w-[116px] h-[165px] z-10 overflow-hidden shadow-sm is-animation anim-fade-up">
          <Image
            src="/thiepmaudovang/images/couple-small-2.jpg"
            alt="Small Portrait 2"
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>

        {/* Small photo 3 */}
        <div id="w-to8ewwrh" className="absolute top-[117.5px] left-[279.3px] w-[116px] h-[165px] z-10 overflow-hidden shadow-sm is-animation anim-fade-right">
          <Image
            src="/thiepmaudovang/images/couple-small-3.jpg"
            alt="Small Portrait 3"
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>
      </section>

      {/* 2. Ceremony Section (#w-va5uf73i) */}
      <section 
        id="w-va5uf73i" 
        className="relative w-full h-[274px] overflow-hidden select-none bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
        }}
      >
        <div id="w-wi89g5us" className="absolute top-[25.5px] left-[18.5px] w-[383px] h-[24px] z-10 flex items-center justify-center font-sans font-bold text-[16px] text-[#8e0101] tracking-wider uppercase text-center is-animation anim-fade-down">
          LỄ THÀNH HÔN
        </div>

        <div id="w-usue530j" className="absolute top-[52.5px] left-[-3.5px] w-[427px] h-[21px] z-10 flex items-center justify-center font-sans text-[14px] text-gray-700 text-center is-animation anim-fade">
          Vào Lúc
        </div>

        {/* Day of Week */}
        <div id="w-tzt5ncnt" className="absolute top-[88px] left-[114.5px] w-[185px] h-[21px] z-10 flex items-center justify-center font-sans text-[14px] text-gray-800 text-center font-medium is-animation anim-fade-left">
          {weekdayStr}
        </div>

        {/* Date "14" */}
        <div id="w-2eldzvuo" className="absolute top-[102px] left-[114.5px] w-[185px] h-[52.5px] z-10 flex items-center justify-center font-sans font-bold text-[35px] text-[#8e0101] text-center is-animation anim-zoom">
          {dayNum}
        </div>

        {/* Month */}
        <div id="w-y3b9j696" className="absolute top-[153px] left-[114.5px] w-[185px] h-[21px] z-10 flex items-center justify-center font-sans text-[14px] text-gray-800 text-center font-medium is-animation anim-fade-right">
          {monthStr}
        </div>

        {/* Time info on Left */}
        <div id="w-jkm0ioqy" className="absolute top-[120.5px] left-[-10px] w-[185px] h-[21px] z-10 flex items-center justify-center font-sans text-[14px] text-gray-700 text-center">
          {groomTime}
        </div>

        {/* Left vertical line divider */}
        <div id="w-4m8ka0ru" className="absolute top-[120.5px] left-[95px] w-[65px] z-10 origin-center rotate-90 border-t border-gray-400"></div>

        {/* Year info on Right */}
        <div id="w-ajw71iaq" className="absolute top-[120.5px] left-[244.5px] w-[185px] h-[21px] z-10 flex items-center justify-center font-sans text-[14px] text-gray-700 text-center">
          {yearStr}
        </div>

        {/* Right vertical line divider */}
        <div id="w-xjfe5zv5" className="absolute top-[250.5px] left-[250.5px] w-[65px] z-10 origin-center rotate-90 border-t border-gray-400"></div>

        {/* Lunar Date */}
        <div id="w-sijholsn" className="absolute top-[185.5px] left-[-1px] w-[422px] h-[19.5px] z-10 flex items-center justify-center font-sans italic text-[13px] text-gray-600 text-center is-animation anim-fade-up">
          {groomLunarDate}
        </div>

        {/* Location */}
        <div id="w-vg6knxma" className="absolute top-[221px] left-[31.5px] w-[359px] h-[24px] z-10 flex items-center justify-center font-sans text-[16px] text-black text-center font-semibold is-animation anim-fade-up">
          {groomAddress}
        </div>
      </section>

      {/* 3. Reception Time Section (#w-fgty94ix) */}
      <section 
        id="w-fgty94ix" 
        className="relative w-full h-[234px] overflow-hidden select-none bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
        }}
      >
        {/* Border Box wrapper */}
        <div id="w-q0mxhzzi" className="absolute top-[16.5px] left-[31.5px] w-[357px] h-[198px] z-10 border border-[#7d1f2a] rounded-[16px] bg-black/4 is-animation anim-zoom"></div>

        <div id="w-akmf0jjg" className="absolute top-[37px] left-[37.5px] w-[345px] h-[24px] z-20 flex items-center justify-center font-sans font-bold text-[16px] text-[#8e0101] tracking-wider uppercase text-center is-animation anim-fade-down">
          TIỆC MỪNG LỄ THÀNH HÔN
        </div>

        <div id="w-xk7m9u1p" className="absolute top-[77px] left-[88px] w-[254px] h-[24px] z-20 flex items-center justify-center font-sans text-[16px] text-black text-center is-animation anim-fade-up">
          {brideTime} - {weekdayStr}
        </div>

        <div id="w-2bfvf872" className="absolute top-[103.5px] left-[88px] w-[254px] h-[24px] z-20 flex items-center justify-center font-sans font-bold text-[16px] text-black text-center tracking-wide is-animation anim-fade-up">
          {brideDateStr}
        </div>

        <div id="w-33oq140d" className="absolute top-[139px] left-[35.5px] w-[349px] h-[19.5px] z-20 flex items-center justify-center font-sans italic text-[13px] text-gray-600 text-center is-animation anim-fade">
          {brideLunarDate}
        </div>

        <div id="w-n49s9ljy" className="absolute top-[170px] left-[38.5px] w-[343px] h-[24px] z-20 flex items-center justify-center font-sans text-[16px] text-black text-center font-semibold is-animation anim-fade-up">
          {brideAddress}
        </div>
      </section>

      {/* 4. Reception Location/Map Section (#w-rs50dgw2) */}
      <section 
        id="w-rs50dgw2" 
        className="relative w-full h-[301px] overflow-hidden select-none bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
        }}
      >
        {/* Red border container */}
        <div id="w-zajrqtwu" className="absolute top-[40px] left-[55.5px] w-[309px] h-[232px] z-10 border-2 border-[#8e0101] rounded-[16px] bg-transparent is-animation anim-zoom"></div>

        <div id="w-avv4pubr" className="absolute top-[54.5px] left-[-3.5px] w-[427px] h-[22.5px] z-20 flex items-center justify-center font-sans font-bold text-[15px] text-[#8e0101] text-center is-animation anim-fade-down">
          BUỔI TIỆC ĐƯỢC TỔ CHỨC TẠI
        </div>

        <div id="w-m1u3o3mx" className="absolute top-[102.3px] left-[61.5px] w-[297px] h-[24px] z-20 flex items-center justify-center font-sans font-extrabold italic text-[16px] text-black tracking-wider uppercase text-center is-animation anim-fade-up">
          {brideAddress.replace("Tại ", "")}
        </div>

        <div id="w-oq2hoi54" className="absolute top-[150.3px] left-[88px] w-[244px] h-[42px] z-20 flex items-center justify-center font-sans italic text-[14px] text-gray-700 text-center leading-tight is-animation anim-fade-up">
          {brideFamily.address_detail || "431 Hoàng Văn Thụ, Phường 4, TP. Hồ Chí Minh"}
        </div>

        <button 
          id="w-prbr1wdj" 
          onClick={handleOpenMapBride}
          className="absolute top-[217px] left-[140px] w-[140px] h-[32px] z-20 flex items-center justify-center bg-[#7d1f2a] hover:bg-[#8e0101] text-white font-sans text-[15px] font-semibold rounded-[42px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] transition-all cursor-pointer is-animation anim-fade-up"
        >
          Xem Chỉ Đường
        </button>
      </section>

      {/* 5. Calendar Section (#w-5acpyn07) */}
      <section 
        id="w-5acpyn07" 
        className="relative w-full h-[385px] overflow-hidden select-none bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/thiepmaudovang/images/bg-pattern-clouds.png')"
        }}
      >
        {isDefaultDec2025 ? (
          <>
            {/* Calendar grid background */}
            <div id="w-b9roq0g4" className="absolute top-[10px] left-[22.5px] w-[375px] h-[360px] z-10 is-animation anim-zoom">
              <Image
                src="/thiepmaudovang/images/calendar-bg.png"
                alt="December 2025 Calendar"
                fill
                sizes="375px"
                className="object-contain"
              />
            </div>

            {/* Red heart icon overlay on Dec 14 */}
            <div id="w-frsowl8y" className="absolute top-[147px] left-[331px] w-[38px] h-[38px] z-20 animate-pulse is-animation anim-zoom">
              <Image
                src="/thiepmaudovang/images/red-heart.png"
                alt="Wedding Date Highlight"
                fill
                sizes="38px"
                className="object-contain"
              />
            </div>
          </>
        ) : (
          /* Render full dynamic visual calendar grid matching the theme if other year/month is configured */
          <div 
            id="w-b9roq0g4" 
            className="absolute top-[10px] left-[22.5px] w-[375px] h-[360px] z-10 is-animation anim-zoom bg-[#fffcf8]/90 border border-[#c5a880] p-4 flex flex-col justify-between shadow-md rounded-[16px]"
            style={{
              backgroundImage: "url('/thiepmaudovang/images/bg-card-texture.png')",
              backgroundSize: "cover"
            }}
          >
            {/* Header */}
            <div className="text-center">
              <h4 className="font-cormorant font-bold text-[18px] text-[#8e0101] tracking-[3px] uppercase">
                {monthStr} – {yearStr.replace("Năm ", "")}
              </h4>
              <div className="w-[80px] h-[1px] bg-[#c5a880] mx-auto mt-1" />
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 text-center text-[12px] font-semibold text-[#8e0101] border-b border-[#c5a880]/30 pb-2">
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-rows-5 gap-y-1 my-auto">
              {getCalendarDays(new Date(wedding.event_date)).map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 text-center items-center">
                  {week.map((day, di) => (
                    <div key={di} className="relative h-8 flex items-center justify-center">
                      {day !== null ? (
                        day === parseInt(dayNum) ? (
                          <div className="relative w-8 h-8 flex items-center justify-center">
                            {/* Heart overlay */}
                            <div className="absolute inset-0 w-8 h-8 z-0 animate-pulse">
                              <Image
                                src="/thiepmaudovang/images/red-heart.png"
                                alt="Wedding Date Highlight"
                                fill
                                sizes="32px"
                                className="object-contain"
                              />
                            </div>
                            <span className="relative z-10 font-sans font-bold text-[#8e0101] text-[14px] top-[-1px]">
                              {day}
                            </span>
                          </div>
                        ) : (
                          <span className={`font-sans text-[13px] ${di === 6 ? "font-bold text-[#8e0101]" : "text-gray-700"}`}>
                            {day}
                          </span>
                        )
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
