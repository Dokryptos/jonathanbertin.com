import { PRODUCTS_QUERY } from "@/lib/shopify/fragments/product";
import { shopifyFetch } from "@/lib/shopify/client";

import ShopComponent from "@/components/shop/index";

export const revalidate = 0;

export default async function ShopPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await shopifyFetch<{ products: { edges: any[] } }>(
    PRODUCTS_QUERY
  );
  const products = data.products.edges.map((edge) => edge.node);

  return <ShopComponent shopData={products} />;
}
