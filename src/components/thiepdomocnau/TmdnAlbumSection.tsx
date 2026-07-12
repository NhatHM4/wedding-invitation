"use client";

import Image from "next/image";

// Gallery uses existing thiepmaudovang images - 2-column masonry layout
const galleryImages = [
  { src: "/thiepmaudovang/images/gallery-1.jpg", alt: "Gallery 1", tall: true },
  { src: "/thiepmaudovang/images/gallery-2.jpg", alt: "Gallery 2", tall: true },
  { src: "/thiepmaudovang/images/gallery-3.jpg", alt: "Gallery 3", tall: true },
  { src: "/thiepmaudovang/images/gallery-4.jpg", alt: "Gallery 4", tall: false },
  { src: "/thiepmaudovang/images/gallery-5.jpg", alt: "Gallery 5", tall: false },
  { src: "/thiepmaudovang/images/gallery-6.jpg", alt: "Gallery 6", tall: true },
  { src: "/thiepmaudovang/images/gallery-7.jpg", alt: "Gallery 7", tall: true },
  { src: "/thiepmaudovang/images/gallery-8.jpg", alt: "Gallery 8", tall: true },
  { src: "/thiepmaudovang/images/gallery-9.jpg", alt: "Gallery 9", tall: true },
  { src: "/thiepmaudovang/images/gallery-10.jpg", alt: "Gallery 10", tall: false },
];

export default function TmdnAlbumSection() {
  // Split into two columns
  const left = galleryImages.filter((_, i) => i % 2 === 0);
  const right = galleryImages.filter((_, i) => i % 2 === 1);

  return (
    <section className="w-full bg-white select-none px-2 py-2">
      <div className="flex gap-2">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-2">
          {left.map((img) => (
            <div
              key={img.src}
              className={`w-full relative overflow-hidden is-animation anim-zoom ${img.tall ? "h-[220px]" : "h-[150px]"}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {/* Right column */}
        <div className="flex-1 flex flex-col gap-2">
          {right.map((img) => (
            <div
              key={img.src}
              className={`w-full relative overflow-hidden is-animation anim-zoom ${img.tall ? "h-[220px]" : "h-[150px]"}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
