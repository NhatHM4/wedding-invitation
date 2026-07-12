"use client";

interface Wish {
  id: string | number;
  guest_name: string;
  content: string;
  created_at: string;
}

interface TmdnWishesSectionProps {
  wishes: Wish[];
}

export default function TmdnWishesSection({ wishes }: TmdnWishesSectionProps) {
  if (wishes.length === 0) return null;

  return (
    <section className="w-full bg-white select-none px-5 py-6 border-t border-gray-100">
      <h3 className="font-cormorant italic text-[22px] text-gray-700 text-center mb-4 is-animation anim-fade-down">
        Lời Chúc
      </h3>

      <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1 is-animation anim-zoom">
        {wishes.map((wish) => {
          const match = wish.guest_name.match(/^(.*?)\s*\((.*?)\)$/);
          const displayName = match ? match[1] : wish.guest_name;
          const relation = match ? match[2] : "";

          return (
            <div
              key={wish.id}
              className="bg-gray-50 border border-gray-100 rounded-sm p-3"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-sans font-semibold text-[12px] text-gray-700">{displayName}</span>
                {relation && (
                  <span className="font-sans text-[10px] text-gray-400 italic">{relation}</span>
                )}
              </div>
              <p className="font-sans text-[12px] text-gray-600 leading-relaxed">{wish.content}</p>
              <p className="font-sans text-[10px] text-gray-300 mt-1 text-right">
                {new Date(wish.created_at).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" })}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
