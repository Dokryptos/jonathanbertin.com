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
    if (!homeData?.length) return;

    return homeData
      .map((data) => {
        const ref = data?.thumbnail?.asset?._ref;
        if (!ref) return null;
        try {
          return urlForImage(ref).url();
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .join(".");
  }, [homeData]);

  useEffect(() => {
    if (!homeData?.length) return;

    homeData.forEach((asset) => {
      const ref = asset?.thumbnail?.asset?._ref;
      if (!ref) return;
      const img = new Image();
      img.src = urlForImage(ref).url();
    });
  }, [preloadingKey, homeData]);

  return (
    <>
      <Grid className="hidden laptop:grid pr-5 pl-5 h-dvh">
        <div className="desktop:col-start-4 laptop:col-start-3 col-span-6 flex items-center justify-center h-dvh">
          <UIImageSanity
            key={homeData[indexImg]?._id}
            asset={homeData[indexImg]?.thumbnail.asset._ref}
            alt={homeData[indexImg]?.title}
            className="object-contain max-h-[85vh]"
          />
        </div>
      </Grid>
      <div className="grid grid-cols-32 z-20 h-dvh w-dvw fixed top-0 left-0">
        {Array.from({ length: 32 }).map((_, i) => (
          <div
            key={i}
            onMouseEnter={() => setIndexImg(i % homeData.length)}
            className="h-full cursor-pointer"
          />
        ))}
      </div>
    </>
  );
};
