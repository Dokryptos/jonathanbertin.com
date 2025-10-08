"use client";
import Grid from "../ui/grid/projectListGrid";
import type PersonnalType from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useViewMode } from "@/context/ViewModeContext";
import Link from "next/link";
import ListDesktop from "../ui/list/ListDesktop";
import ListMobile from "../ui/list/ListMobile";

interface PersonnalProps {
  personnalData: PersonnalType[];
}

export default function PersonnalComponent({ personnalData }: PersonnalProps) {
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const { viewMode } = useViewMode();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollableElement = document.querySelector(".scroll-div");
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [viewMode]);
  const gridAnimationVariant = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.2, duration: 1 },
    }),
  };

  return (
    <div
      className="scroll-div pt-[80px] desktop:pt-[96px] pl-5 pr-5 h-full overflow-y-scroll"
      ref={scrollRef}
    >
      <div>
        {viewMode === "grid" ? (
          <Grid className="gap-x-5">
            {personnalData.map((project: PersonnalType, i: number) => (
              <motion.div
                custom={i}
                initial="hidden"
                animate="visible"
                className="mb-10"
                variants={gridAnimationVariant}
                key={project._id}
              >
                <Link
                  href={`/${project?.slug?.current}`}
                  onMouseEnter={() => {
                    setHoveredImageId(project._id);
                  }}
                >
                  <UIImageSanity
                    key={project._id}
                    asset={project.thumbnail.asset}
                    className="pb-3"
                    alt={`Grid image ${project.title}`}
                  />
                  <h2
                    className={`opacity-100 ${hoveredImageId === project._id ? "laptop:opacity-100" : "laptop:opacity-0"}`}
                  >
                    {project?.title}, {project.gallery.length} Images
                  </h2>
                </Link>
              </motion.div>
            ))}
          </Grid>
        ) : (
          <>
            <ListDesktop projectArray={personnalData} />
            <ListMobile projectArray={personnalData} scrollRef={scrollRef} />
          </>
        )}
      </div>
    </div>
  );
}
