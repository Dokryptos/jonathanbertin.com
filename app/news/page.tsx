import NewsComponents from "@/components/news";
import { getAllNews } from "@/sanity/queries";
export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function PersonalPage() {
  const newsData = await getAllNews();
  if (!newsData) {
    throw new Error("No data");
  }
  return <NewsComponents newsData={newsData} />;
}
