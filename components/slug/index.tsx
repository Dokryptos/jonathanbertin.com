"use client";
import type ProjectType from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import { useRef, useState } from "react";
import PopUp from "../ui/popUp";

interface SlugProps {
  allProjectData: ProjectType[];
}

export default function SlugComponent({ allProjectData }: SlugProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [infoOpen, setInfoOpen] = useState(false);
  const slugProject = allProjectData[0];

  const handleWheel = (e: React.WheelEvent) => {
    const slider = scrollRef.current;
    if (!slider) return;
    e.preventDefault();
    slider.scrollLeft += e.deltaY * 10;
  };

  return (
    <>
      <div
        ref={scrollRef}
        onWheel={handleWheel}
        className="pt-[80px] desktop:pt-[96px] pb-[80px] desktop:pb-[96px] pl-5 pr-2 flex flex-col h-dvh tablet:flex-row tablet:overflow-x-auto tablet:scroll-smooth tablet:overflow-y-hidden select-none"
      >
        {slugProject?.gallery?.map((image, i) => (
          <div
            key={`${i}`}
            className="pb-3 tablet:pb-0 tablet:flex-shrink-0 tablet:pr-3 tablet:flex tablet:items-center tablet:justify-center tablet:h-full "
          >
            <UIImageSanity
              asset={image}
              alt={slugProject?._id}
              className="w-full h-auto tablet:w-auto tablet:h-1/2 laptop:h-4/5"
            />
          </div>
        ))}
      </div>
      <div className={`fixed bottom-0 w-dvw bg-white pr-5 pl-5 font-junicode`}>
        <div className="flex justify-between pt-4 pb-4 text-[16px]/[18px] desktop:text-[20px]">
          <div className="flex">
            <p className="pr-2">{slugProject?.title}</p>
            <p className="text-[9px]">{`(${slugProject?.gallery?.length <= 9 ? `0${slugProject?.gallery?.length}` : `${slugProject?.gallery?.length}`})`}</p>
          </div>
          <button
            onClick={() => {
              setInfoOpen(!infoOpen);
            }}
            className="cursor-pointer"
          >
            Informations
          </button>
        </div>
      </div>
      <PopUp isOpen={infoOpen} onClose={() => setInfoOpen(false)}>
        <div className="pt-[46px]">
          <h2 className="font-bagossTrial text-[16px]/[130%] pb-6">
            {slugProject?.title}
          </h2>
          <p className="font-junicode whitespace-pre-wrap pb-[48px]">
            {slugProject?.description}
          </p>
        </div>
      </PopUp>
    </>
  );
}
