import { defineQuery } from "next-sanity";
import { sanityFetch } from "./lib/live";
import { notFound } from "next/navigation";
// import NewsType from "@/types/news";
import ProjectType from "@/types/project";
import HomeImgType from "@/types/homepage";

export const HOMEIMG_QUERY = defineQuery(`*[
    _type == "homepage"
  ] | order(orderRank) {_id, title, thumbnail}`);

// Fonction pour récupérer les projets (Serveur)
export async function getHomeImg(): Promise<HomeImgType[]> {
  const { data } = await sanityFetch({ query: HOMEIMG_QUERY });
  if (!data) {
    notFound();
  }
  return data;
}

export const COMMISSIONED_QUERY = defineQuery(`*[
  _type == "commissioned"
] | order(orderRank) {_id, title, thumbnail, slug, categorie, gallery, description}
 `);

export async function getAllCommissioned(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: COMMISSIONED_QUERY });
  if (!data) {
    notFound();
  }
  return data;
}

export const PERSONAL_QUERY = defineQuery(`*[
  _type == "personal"
] | order(orderRank) {_id, title,  thumbnail, slug, categorie, gallery, description}`);

export async function getAllPersonal(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: PERSONAL_QUERY });
  if (!data) {
    notFound();
  }
  return data;
}

export const NEWS_QUERY = defineQuery(`*[
  _type == "news"
] | order(orderRank) {_id, title, thumbnail, slug, gallery, description}`);

export async function getAllNews(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: NEWS_QUERY });
  if (!data) {
    notFound();
  }
  return data;
}

export const ALL_PROJECT_QUERY = defineQuery(`*[
  _type == "personal" && slug.current == $slug || _type == "commissioned" && slug.current == $slug
] | order(orderRank) {_id, title,  thumbnail, slug, categorie, gallery, description}`);

export async function getAllProject(): Promise<ProjectType[]> {
  const { data } = await sanityFetch({ query: ALL_PROJECT_QUERY });
  if (!data) {
    notFound();
  }
  return data;
}
