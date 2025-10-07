"use client";

import Grid from "../ui/grid";
import HomeImgType from "@/types/homepage";
import { UIImageSanity } from "../ui/image/sanity";

interface HomeDataProps {
  homeData: HomeImgType[];
}

export const LaptopHomeComponent = ({ homeData }: HomeDataProps) => {
  return (
    <Grid className="hidden laptop:block ">
      <div className="grid"></div>
      <div>
        {homeData.map((imgHome: HomeImgType, i: number) => (
          <UIImageSanity
            key={i}
            asset={imgHome.thumbnail.asset._ref}
            alt={imgHome.title}
          />
        ))}
      </div>
      <div></div>
    </Grid>
  );
};
