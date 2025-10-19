"use client";

import Grid from "../ui/grid/index";
import HomeImgType from "@/types/homepage";
import { UIImageSanity } from "../ui/image/sanity";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface HomeDataProps {
  homeData: HomeImgType[];
}

export const MobileHomeComponent = ({ homeData }: HomeDataProps) => {
  const [indexImg, setIndexImg] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexImg((prevIndex) =>
        prevIndex === homeData.length - 1 ? 0 : prevIndex + 1
      );
    }, 1500);
    return () => clearInterval(interval);
  }, [homeData.length]);

  return (
    <Grid className="laptop:hidden h-dvh pr-5 pl-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={homeData[indexImg]._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0, ease: "easeInOut" }}
          className="w-auto h-auto flex items-center justify-center col-span-full tablet:col-span-6 tablet:col-start-3"
        >
          <UIImageSanity
            key={homeData[indexImg]._id}
            asset={homeData[indexImg].thumbnail.asset._ref}
            alt={homeData[indexImg].title}
            className="object-contain "
          />
        </motion.div>
      </AnimatePresence>
    </Grid>
  );
};
