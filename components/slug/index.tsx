"use client";
import type ProjectType from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import { useState } from "react";
import PopUp from "../ui/popUp";

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
          <h2 className="font-bagossTrial text-[14px]/[130%] pb-6">
            {slugProject.title}
          </h2>
          <p className="font-junicode whitespace-pre-wrap">
            {slugProject.description}
          </p>
        </div>

        <button
          className="fixed bottom-3 right-4 p-1 text-[14px]/[18px] "
          onClick={() => {
            setInfoOpen(!infoOpen);
          }}
        >
          Informations
        </button>
      </PopUp>
    </>
  );
}
