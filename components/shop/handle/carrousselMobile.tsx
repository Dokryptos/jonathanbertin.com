/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef, useEffect } from "react";
import { ImageFragment } from "@/lib/shopify/fragments/image";

interface CarousselMobileProps {
  carousselGallery: { node: ImageFragment }[];
  title?: string;
}

export default function CarrousselMobile({
  carousselGallery,
  title,
}: CarousselMobileProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / clientWidth);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full pb-6 tablet:hidden">
      <div
        ref={scrollRef}
        className="
          flex 
          overflow-x-auto 
          snap-x snap-mandatory 
          scroll-smooth 
          scrollbar-hide 
          gap-3
          w-full
        "
      >
        {carousselGallery.map((image, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-full snap-center aspect-[4/5] overflow-hidden"
          >
            <img
              src={image?.node.url}
              alt={`${title} || "slide"}-${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {carousselGallery.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
              i === currentIndex ? "bg-black" : "bg-[#B8B8B8]/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
