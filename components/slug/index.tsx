"use client";
import type ProjectType from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import { motion } from "framer-motion";
import { useState } from "react";

interface SlugProps {
  allProjectData: ProjectType[];
}

export default function SlugComponent({ allProjectData }: SlugProps) {
  const [infoOpen, setInfoOpen] = useState(false);
  const slugProject = allProjectData[0];
  return (
    <>
      <div className="pt-[80px] desktop:pt-[96px] pl-5 pr-5 h-full">
        {slugProject.gallery.map((image, i) => (
          <div key={`${i}`} className="pb-3">
            <UIImageSanity
              asset={image}
              alt={slugProject._id}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
      <div className={`fixed bottom-0 w-dvw bg-white pr-5 pl-5`}>
        <div className="flex justify-between laptop:justify-end pt-4 pb-4 text-[14px]/[18px]">
          <div className="flex">
            <p className="pr-2">{slugProject.title}</p>
            <p>{`(${slugProject.gallery.length})`}</p>
          </div>
          <button onClick={() => !setInfoOpen}>Informations</button>
        </div>
      </div>
    </>
  );
}
