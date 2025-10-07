"use client";

import Grid from "../ui/grid";
import HomeImgType from "@/types/homepage";
import { UIImageSanity } from "../ui/image/sanity";
import { useEffect, useState } from "react";

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
    }, 1000);
    return () => clearInterval(interval);
  }, [homeData.length]);

  return (
    <Grid className="laptop:hidden h-dvh flex items-center justify-center pr-5 pl-5">
      <UIImageSanity
        key={homeData[indexImg]._id}
        asset={homeData[indexImg].thumbnail.asset._ref}
        alt={homeData[indexImg].title}
        className="object-contain col-span-full tablet:col-span-6 tablet:col-start-3 "
      />
    </Grid>
  );
};
