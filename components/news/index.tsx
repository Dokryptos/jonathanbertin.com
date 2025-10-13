"use client";
import type NewsType from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";
import { useRef, useState } from "react";

interface PersonnalProps {
  newsData: NewsType[];
}
export default function NewsComponent({ newsData }: PersonnalProps) {
  const [isHovered, setIsHovered] = useState<null | string>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent) => {
    const slider = scrollRef.current;
    if (!slider) return;
    e.preventDefault();
    slider.scrollLeft += e.deltaY * 10;
  };

  return (
    <>
      <div className="pt-[80px] laptop:pt-[0px] pl-5 pr-5 h-full flex laptop:hidden">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-7 tablet:gap-3 h-full laptop:hidden">
          {newsData.map((project: NewsType) => (
            <div key={project._id} className="w-full">
              <Link href={`/news/${project?.slug?.current}`}>
                <div className="w-full aspect-[4/5] overflow-hidden">
                  <UIImageSanity
                    asset={project.thumbnail.asset}
                    alt={project._id}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-bagossTrial text-[12px] pt-3 tablet:pb-4">
                  {project.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className="hidden laptop:flex flex-row ml-5 mr-5 h-dvh scroll-smooth overflow-x-auto overflow-y-hidden scrollbar-hide select-none"
        ref={scrollRef}
        onWheel={handleWheel}
      >
        {newsData?.map((project, i) => (
          <Link
            key={`${i}`}
            className="pb-3 flex-shrink-0 flex flex-col items-start justify-center h-full pr-3"
            href={`/news/${project.slug.current}`}
            onMouseEnter={() => setIsHovered(project._id)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <UIImageSanity
              asset={project.thumbnail.asset}
              alt={project?._id}
              className="w-full h-auto laptop:h-2/3 desktop:h-3/5"
            />
            <div className="pt-3 h-[10px]">
              {isHovered === project._id && (
                <div className="font-bagossTrial text-[12px]">
                  {project.title}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
