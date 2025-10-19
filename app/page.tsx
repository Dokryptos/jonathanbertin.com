import { getHomeImg } from "@/sanity/queries";
import { LaptopHomeComponent } from "@/components/home/laptopHomeComponent";
import { MobileHomeComponent } from "@/components/home/mobileHomeComponent";
import HomePopUpComponent from "@/components/home/homePopupComponent";

export default async function Home() {
  const homeData = await getHomeImg();
  if (!homeData) {
    throw new Error("No data");
  }

  return (
    <div>
      <LaptopHomeComponent homeData={homeData} />
      <MobileHomeComponent homeData={homeData} />
      <HomePopUpComponent />
    </div>
  );
}
