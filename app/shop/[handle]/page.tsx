import ProductComponent from "@/components/shop/handle/index";
import { PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify/fragments/product";
import { shopifyFetch } from "@/lib/shopify/client";
import { ShopifyProduct } from "@/lib/shopify/types";

export default async function ProcuctPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;

  const data = await shopifyFetch<{ product: ShopifyProduct }>(
    PRODUCT_BY_HANDLE_QUERY,
    {
      handle,
    }
  );

  const product = data.product;
  return <ProductComponent productData={product} />;
}
