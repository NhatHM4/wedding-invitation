"use client";

interface Cl46CalendarSectionProps {
  wedding?: any;
}

export default function Cl46CalendarSection({ wedding }: Cl46CalendarSectionProps) {
  let dayGroom = 5;
  let dayBride = 6;
  let month = 12;
  let year = 2025;

  if (wedding?.event_date) {
    const d = new Date(wedding.event_date);
    dayBride = d.getDate();
    dayGroom = dayBride - 1;
    month = d.getMonth() + 1;
    year = d.getFullYear();
  }

  // Month data
  const monthNames = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];

  // Grid dates calculation
  const firstDay = new Date(year, month - 1, 1).getDay(); // Sun = 0
  const daysInMonth = new Date(year, month, 0).getDate();
  const weekdays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const startOffset = firstDay === 0 ? 6 : firstDay - 1; // Align to Mon start

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  return (
    <section className="is-animation anim-fade-up w-full px-5 py-6 bg-white flex flex-col items-center">
      {/* Month Header Banner */}
      <div className="w-full bg-[#5a1212] py-3.5 text-center rounded-t shadow-sm">
        <h3 className="font-cormorant text-[16px] tracking-[4px] text-white uppercase font-bold">
          {monthNames[month - 1]}
        </h3>
      </div>

      {/* Calendar Grid Box */}
      <div className="w-full border-x border-b border-[#e8e2d8] rounded-b px-4 py-5 bg-[#fcfaf7]">
        <div className="grid grid-cols-7 gap-y-3.5 gap-x-1 text-center">
          {/* Weekday headers */}
          {weekdays.map((w) => (
            <div key={w} className="font-barlow text-[9px] font-bold text-gray-500 uppercase py-1">
              {w}
            </div>
          ))}

          {/* Days */}
          {cells.map((cell, idx) => {
            if (cell === null) return <div key={`empty-${idx}`} />;
            
            const isGroomDay = cell === dayGroom;
            const isBrideDay = cell === dayBride;

            return (
              <div key={cell} className="relative flex items-center justify-center h-8">
                {isGroomDay ? (
                  // Day 5 with heart outline drawing
                  <div className="relative flex items-center justify-center w-8 h-8">
                    {/* SVG Heart stroke */}
                    <svg viewBox="0 0 24 24" className="absolute w-[30px] h-[30px] text-[#5a1212] fill-none stroke-current stroke-[1.5]">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="font-barlow text-[11px] font-bold text-[#5a1212] z-10">{cell}</span>
                  </div>
                ) : isBrideDay ? (
                  // Day 6 with fingerprint or heart background color
                  <div className="relative flex items-center justify-center w-8 h-8">
                    {/* Fingerprint red stain simulation */}
                    <span 
                      className="absolute inset-0.5 rounded-full opacity-80"
                      style={{
                        background: "radial-gradient(circle at center, #8B1A1A, #5a1212)",
                        borderRadius: "38% 62% 63% 37% / 41% 44% 56% 59%",
                        transform: "rotate(-15deg)"
                      }}
                    />
                    <span className="font-barlow text-[11px] font-bold text-white z-10">{cell}</span>
                  </div>
                ) : (
                  <span className="font-barlow text-[10px] text-gray-700">{cell}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
