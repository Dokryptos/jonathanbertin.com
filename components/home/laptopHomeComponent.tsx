"use client";

import Grid from "../ui/grid";
import HomeImgType from "@/types/homepage";
import { UIImageSanity } from "../ui/image/sanity";
import { useState, useMemo, useEffect } from "react";
import { urlForImage } from "@/sanity/lib/image";

interface HomeDataProps {
  homeData: HomeImgType[];
}

export const LaptopHomeComponent = ({ homeData }: HomeDataProps) => {
  const [indexImg, setIndexImg] = useState<number>(0);

  const preloadingKey = useMemo(() => {
    if (!homeData) return;

    return homeData
      .map((asset) => {
        if (asset.thumbnail) {
          return urlForImage(asset.thumbnail.asset._ref).url();
        }
        return null;
      })
      .join(".");
  }, [homeData]);

  useEffect(() => {
    if (!homeData) return;
    homeData.forEach((asset) => {
      if (asset.thumbnail?.asset?._ref) {
        const img = new Image();
        img.src = urlForImage(asset.thumbnail.asset._ref).url();
      }
    });
  }, [homeData, preloadingKey]);
  return (
    <>
      <Grid className="hidden laptop:grid pr-5 pl-5 h-dvh">
        <div className="desktop:col-start-5 laptop:col-start-4 col-span-4 flex items-center justify-center h-dvh">
          <UIImageSanity
            key={homeData[indexImg]._id}
            asset={homeData[indexImg].thumbnail.asset._ref}
            alt={homeData[indexImg].title}
            className="object-contain max-h-[70vh]"
          />
        </div>
      </Grid>
      <div className="grid grid-cols-32 z-20 h-dvh w-dvw fixed top-0 left-0">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            onMouseEnter={() => setIndexImg(i % homeData.length)} // 👈 ici la magie
            className="h-full cursor-pointer"
          />
        ))}
      </div>
    </>
  );
};
