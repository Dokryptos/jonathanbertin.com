"use client";
import type ProjectType from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import { useRef, useState } from "react";
import PopUp from "../ui/popUp";
import { motion } from "framer-motion";

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
        className="pt-[80px] desktop:pt-[96px] pb-[80px] desktop:pb-[96px] ml-5 mr-5 flex flex-col h-dvh tablet:flex-row tablet:overflow-x-auto tablet:scroll-smooth tablet:overflow-y-hidden scrollbar-hide select-none"
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
      <div className={`fixed bottom-0 w-dvw bg-white pr-5 pl-5`}>
        <div className="flex justify-between pt-4 pb-4 text-[16px]/[18px]">
          <div className="flex">
            <p className="pr-2">{slugProject?.title}</p>
            <p>{`(${slugProject?.gallery?.length})`}</p>
          </div>
          <button
            onClick={() => {
              setInfoOpen(!infoOpen);
            }}
          >
            Informations
          </button>
        </div>
      </div>
      <PopUp isOpen={infoOpen} onClose={() => setInfoOpen(false)}>
        <div className="pt-[56px]">
          <h2 className="font-bagossTrial text-[16px]/[130%] pb-6">
            {slugProject?.title}
          </h2>
          <p className="font-junicode whitespace-pre-wrap pb-[48px]">
            {slugProject?.description}
          </p>
        </div>

        <motion.div
          className="fixed bottom-0 right-0 w-4/5 tablet:w-1/2 laptop:w-2/5  desktop:w-1/3  bg-white z-50 pt-3 pb-3 pr-5 pl-5 flex justify-end"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <button
            className="p-1 text-[16px]/[18px] z-50"
            onClick={() => {
              setInfoOpen(!infoOpen);
            }}
          >
            Informations
          </button>
        </motion.div>
      </PopUp>
    </>
  );
}
