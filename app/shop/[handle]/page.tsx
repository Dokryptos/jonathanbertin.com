/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductComponent from "@/components/shop/handle/index";
import { PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify/fragments/product";
import { shopifyFetch } from "@/lib/shopify/client";

export default async function ProcuctPage({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = await params;

  const data = await shopifyFetch<{ product: any }>(PRODUCT_BY_HANDLE_QUERY, {
    handle,
  });

  const product = data.product;
  return <ProductComponent productData={product} />;
}
