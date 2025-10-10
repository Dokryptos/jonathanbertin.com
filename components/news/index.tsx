"use client";
import type NewsType from "@/types/project";
import { UIImageSanity } from "../ui/image/sanity";
import Link from "next/link";

interface PersonnalProps {
  newsData: NewsType[];
}
export default function NewsComponent({ newsData }: PersonnalProps) {
  return (
    <div className="pt-[80px] desktop:pt-[96px] pl-5 pr-5 h-full overflow-y-scroll">
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-7 tablet:gap-3 h-full">
        {newsData.map((project: NewsType) => (
          <div key={project._id} className="w-full">
            <Link href={`/news/${project?.slug?.current}`}>
              <div className="w-full aspect-[4/5] overflow-hidden">
                <UIImageSanity
                  asset={project.thumbnail.asset}
                  alt={project._id}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-bagossTrial text-[12px] pt-3 tablet:pb-4">
                {project.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
