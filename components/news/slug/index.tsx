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
    <div className="grid grid-cols-1 tablet:grid-cols-2 pt-[80px] desktop  :pt-[96px] pl-5 pr-5">
      <div className="font-bagossTrial text-[20px]/[18px] flex items-center pb-4 tablet:hidden">
        {selectedNewsData.title}
        <span className="text-[9px] tarblet:text-[12px] pl-2">{`(0${selectedNewsData.gallery.length})`}</span>
      </div>
      <CarousselMobile
        carousselGallery={selectedNewsData.gallery}
        title={selectedNewsData.title}
      />
      <div className="hidden tablet:flex flex-col h-full tablet:max-h-[calc(100vh-80px)] desktop:max-h-[calc(100vh-96px)] overflow-y-auto scrollbar-hide pr-[6px] laptop:pr-6 desktop:pr-[65px] gap-3">
        {selectedNewsData.gallery.map((image, i) => (
          <div key={i} className="w-full hidden tablet:block">
            <UIImageSanity
              asset={image}
              alt={selectedNewsData?._id}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
      <div className="whitespace-pre-wrap text-[14px]/[20px] pt-3 tablet:pt-0 pl-[6px] laptop:pl-6 desktop:pl-[65px] laptop:pr-[51px] desktop:pr-[133px] overflow-y-auto scrollbar-hide tablet:max-h-[calc(100vh-80px)] desktop:max-h-[calc(100vh-96px)]">
        <div className="font-bagossTrial text-[20px]/[18px] desktop:text-[25px] items-center pb-4 hidden tablet:flex ">
          {selectedNewsData.title}
          <span className="text-[9px] tablet:text-[12px] pl-2">{`(0${selectedNewsData.gallery.length})`}</span>
        </div>
        {selectedNewsData.description}
      </div>
    </div>
  );
}
