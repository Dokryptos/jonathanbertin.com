"use client";
import type NewsType from "@/types/project";
import { UIImageSanity } from "@/components/ui/image/sanity";
import CarousselMobile from "./carousselMobile";

interface PersonnalProps {
  newsData: NewsType[];
}
export default function NewsComponent({ newsData }: PersonnalProps) {
  const selectedNewsData = newsData[0];

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 pt-[80px] laptop:pt-[96px] pl-5 pr-5">
      <div className="font-bagossTrial text-[16px]/[18px] flex items-center pb-4">
        {selectedNewsData.title}
        <span className="text-[9px] tarblet:text-[12px] pl-2">{`(0${selectedNewsData.gallery.length})`}</span>
      </div>
      <CarousselMobile
        carousselGallery={selectedNewsData.gallery}
        title={selectedNewsData.title}
      />
      <div className="whitespace-pre-wrap text-[14px]/[20px] pt-3">
        {selectedNewsData.description}
      </div>
    </div>
  );
}
