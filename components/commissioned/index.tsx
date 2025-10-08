"use client";
import Grid from "../ui/grid/projectListGrid";
import type CommissionedType from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useViewMode } from "@/context/ViewModeContext";
import Link from "next/link";
import ListDesktop from "../ui/list/ListDesktop";
import ListMobile from "../ui/list/ListMobile";
import DisplayListMode from "../ui/display";

interface PersonnalProps {
  commissionedData: CommissionedType[];
}

export default function CommissionedComponent({
  commissionedData,
}: PersonnalProps) {
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
    <>
      <div
        className="scroll-div pt-[80px] desktop:pt-[96px] pl-5 pr-5 h-full overflow-y-scroll"
        ref={scrollRef}
      >
        <div>
          {viewMode === "grid" ? (
            <Grid className="gap-x-3">
              {commissionedData.map((project: CommissionedType, i: number) => (
                <motion.div
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={gridAnimationVariant}
                  key={project._id}
                  className="w-full overflow-hidden"
                >
                  <Link href={`/${project?.slug?.current}`}>
                    <UIImageSanity
                      key={project._id}
                      asset={project.thumbnail.asset}
                      className="w-full h-full object-cover min-h-[100px] tablet:min-h-[250px]"
                      alt={`Grid image ${project.title}`}
                    />
                  </Link>
                </motion.div>
              ))}
            </Grid>
          ) : (
            <>
              <ListDesktop projectArray={commissionedData} />
              <ListMobile
                projectArray={commissionedData}
                scrollRef={scrollRef}
              />
            </>
          )}
        </div>
      </div>
      <DisplayListMode />
    </>
  );
}
