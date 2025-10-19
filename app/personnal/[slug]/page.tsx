import SlugPersonnalComponent from "@/components/personnal/slugPersonnal";
export const revalidate = 0;
export const dynamic = "force-dynamic";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "./../../../sanity/lib/live";

const PROJECT_QUERY = defineQuery(`
*[
  _type == "personal" && slug.current == $slug ] | order(orderRank) {_id, title,  thumbnail, slug, gallery, description}`);

export default async function SlugPersonnalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: allProjectData } = await sanityFetch({
    query: PROJECT_QUERY,
    params: { slug: (await params).slug },
  });
  if (!allProjectData) {
    throw new Error("No data");
  }
  return <SlugPersonnalComponent allPersonnalProjectData={allProjectData} />;
}
