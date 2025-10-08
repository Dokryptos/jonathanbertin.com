import List from "@/components/ui/list";
import { motion } from "framer-motion";
import { UIImageSanity } from "../../ui/image/sanity";
import ProjectType from "@/types/project";
import Link from "next/link";
import {
  useState,
  useEffect,
  RefObject,
  useCallback,
  MouseEvent as ReactMouseEvent,
} from "react";
import { useRouter } from "next/navigation";

interface ListMobileProps {
  projectArray: ProjectType[];
  scrollRef: RefObject<HTMLDivElement | null>;
}

export default function ListMobile({
  projectArray,
  scrollRef,
}: ListMobileProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const projectHeight = 300;
  const totalHeight = (projectArray.length + 1) * projectHeight;
  const [firstAnimationDone, setFirstAnimationDone] = useState(false);

  const updateSelectedIndex = () => {
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    const totalScrollHeight =
      scrollRef.current.scrollHeight -
      scrollRef.current.getBoundingClientRect().height;

    let newIndex = Math.floor(scrollTop / projectHeight);

    if (scrollTop >= totalScrollHeight) {
      newIndex = projectArray.length - 1;
    }
    if (
      newIndex !== selectedIndex &&
      newIndex >= 0 &&
      newIndex < projectArray.length
    ) {
      setSelectedIndex(newIndex);
    }
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.addEventListener("scroll", updateSelectedIndex);

    return () => {
      if (!scrollRef.current) return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scrollRef.current.removeEventListener("scroll", updateSelectedIndex);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const [hoveringClickableElement, setHoveringClickableElement] =
    useState<boolean>(false);

  const router = useRouter();
  const findHoveredElement = (event: MouseEvent) => {
    const elementsHref = document.querySelectorAll("[data-href]");
    return [...elementsHref].find((element) => {
      const rect = element.getBoundingClientRect();
      if (
        event.pageX >= rect.left &&
        event.pageX <= rect.right &&
        event.pageY >= rect.top &&
        event.pageY <= rect.bottom
      )
        return true;
    });
  };
  const onClickList = (event: ReactMouseEvent) => {
    const hoveredElement = findHoveredElement(event as unknown as MouseEvent);
    if (hoveredElement) {
      const href = hoveredElement.getAttribute("data-href");
      if (href) router.push(href);
    }
  };
  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const hoveredElement = findHoveredElement(event);

      if (hoveredElement && !hoveringClickableElement)
        setHoveringClickableElement(true);
      else if (!hoveredElement && hoveringClickableElement)
        setHoveringClickableElement(false);
    },
    [hoveringClickableElement]
  );
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [hoveringClickableElement, onMouseMove]);

  const listAnimationVariant = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstAnimationDone(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="laptop:hidden flex overflow-y-auto"
      style={{
        height: totalHeight,
        cursor: hoveringClickableElement ? "pointer" : "default",
      }}
      onClick={onClickList}
    >
      <List className="fixed bg-white pointer-events-none flex flex-col">
        {projectArray.map((project: ProjectType, i: number) => (
          <motion.div
            key={project._id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={listAnimationVariant}
          >
            <h2
              data-href={`/${project?.slug?.current}`}
              className={`z-20 mix-blend-difference relative flex text-[14px]/[14px] pt-1 pb-1 ${!firstAnimationDone && projectArray[selectedIndex]?._id === project._id ? "text-black" : projectArray[selectedIndex]?._id === project._id ? "text-white z-20" : "text-[#B8B8B8]"}`}
            >
              {project?.title}
              {i < projectArray.length - 1 && (
                <p className="text-[#B8B8B8]"></p>
              )}
            </h2>
          </motion.div>
        ))}

        <UIImageSanity
          key={projectArray[selectedIndex]._id}
          asset={projectArray[selectedIndex].thumbnail.asset}
          alt={`Thumbnail hovered ${projectArray[selectedIndex]._id}`}
          className="bottom-[42px] fixed right-5 z-10 max-h-[275px] max-w-[250px] tablet:max-w-[600px] tablet:max-h-[600px] w-auto pointer-events-none"
          data-href={`/${projectArray[selectedIndex]?.slug.current}`}
        />
      </List>
    </div>
  );
}
