import NewsSlugComponents from "@/components/news/slug/index";
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";
import { notFound } from "next/navigation";

export const revalidate = 0;
export const dynamic = "force-dynamic";

const NEWS_SLUG_QUERY = defineQuery(`*[
  _type == "news" && slug.current == $slug ] | order(orderRank) {_id, title,  thumbnail, slug, categorie, gallery, description}`);

export default async function NewsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: newsData } = await sanityFetch({
    query: NEWS_SLUG_QUERY,
    params: { slug: (await params).slug },
  });
  if (!newsData) {
    notFound();
  }
  return <NewsSlugComponents newsData={newsData} />;
}
