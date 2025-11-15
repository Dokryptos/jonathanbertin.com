"use client";
import type ProjectType from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import { useEffect, useMemo, useRef, useState } from "react";
import PopUp from "../ui/popUp";
import { urlForImage } from "@/sanity/lib/image";

interface SlugProps {
  allPersonnalProjectData: ProjectType[];
}

export default function SlugPersonnalComponent({
  allPersonnalProjectData,
}: SlugProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const slugProject = allPersonnalProjectData[0];

  const preloadingKey = useMemo(() => {
    if (!allPersonnalProjectData?.length) return;

    return allPersonnalProjectData
      .map((data) => {
        const ref = data?.thumbnail?.asset?._ref;
        if (!ref) return null;
        try {
          return urlForImage(ref).url();
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .join(".");
  }, [allPersonnalProjectData]);

  useEffect(() => {
    if (!allPersonnalProjectData?.length) return;

    allPersonnalProjectData.forEach((asset) => {
      const ref = asset?.thumbnail?.asset?._ref;
      if (!ref) return;
      const img = new Image();
      img.src = urlForImage(ref).url();
    });
  }, [preloadingKey, allPersonnalProjectData]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const slider = scrollRef.current;
      if (!slider) return;
      slider.scrollLeft += e.deltaY;
    };
    window.addEventListener("wheel", (e: WheelEvent) => handleWheel(e), {
      passive: false,
    });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      <div
        ref={scrollRef}
        className="pt-[80px] desktop:pt-[96px] pb-[80px] desktop:pb-[96px] pl-5 pr-5 tablet:pr-2 flex flex-col h-full tablet:h-dvh tablet:flex-row tablet:overflow-x-auto tablet:overflow-y-hidden select-none laptop:touch-pan-x touch-auto"
      >
        {slugProject?.gallery?.map((image, i: number) => (
          <div
            key={`${i}`}
            className={`tablet:pb-0 tablet:flex-shrink-0 tablet:pr-3 tablet:flex tablet:items-center tablet:justify-center tablet:h-full ${i === slugProject.gallery.length - 1 ? "pb-[50px] " : "pb-3"}`}
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
            <p className="text-[9px] desktop:text-[12px]">{`(${slugProject?.gallery?.length <= 9 ? `0${slugProject?.gallery?.length}` : `${slugProject?.gallery?.length}`})`}</p>
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
      <PopUp
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        footerName="Informations"
      >
        <div>
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
