import List from "@/components/ui/list";
import { motion } from "framer-motion";
import { UIImageSanity } from "../../ui/image/sanity";
import ProjectType, { SanityImage } from "@/types/project";
import Link from "next/link";
import { useState } from "react";

interface ListDesktopProps {
  projectArray: ProjectType[];
}

export default function ListDesktop({ projectArray }: ListDesktopProps) {
  const [hoveredImage, setHoveredImage] = useState<SanityImage | null>(
    projectArray[0].thumbnail
  );
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(
    projectArray[0]._id
  );
  const [hoveredLink, setHoveredLink] = useState<string | null>(
    projectArray[0].slug.current
  );

  const listAnimationVariant = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  return (
    <List className="laptop:flex hidden flex-col">
      {projectArray.map((project: ProjectType, i: number) => (
        <motion.div
          key={project._id}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={listAnimationVariant}
          onMouseEnter={() => {
            setHoveredImage(project.thumbnail);
            setHoveredImageId(project._id);
            setHoveredLink(project.slug.current);
          }}
        >
          <Link href={`/${project?.slug?.current}`}>
            <h2
              className={`z-10 mix-blend-difference relative flex desktop:text-[20px]/[20px] laptop:text-[14px]/[14px] pt-1 pb-1 w-auto ${hoveredImageId === project._id ? "text-white" : "text-[#B8B8B8]"}`}
            >
              {project?.title}
              {i < projectArray.length - 1 && (
                <p className="text-[#B8B8B8]"></p>
              )}
            </h2>
          </Link>
        </motion.div>
      ))}
      {hoveredImage && (
        <Link href={`/${hoveredLink}`}>
          <UIImageSanity
            key={hoveredImageId}
            asset={hoveredImage}
            alt={`Thumbnail hovered ${hoveredImageId}`}
            className="bottom-5 fixed right-5 z-0  desktop:max-h-[700px] desktop:max-w-[700px] laptop:max-h-[500px] laptop:max-w-[500px]"
          />
        </Link>
      )}
    </List>
  );
}
