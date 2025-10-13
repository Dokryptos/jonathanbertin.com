import { shopifyFetch } from "@/lib/shopify/client";
import { PRODUCTS_QUERY } from "@/lib/shopify/fragments/product";
import Image from "next/image";
import Link from "next/link";

export default async function ShopPage() {
  const data = await shopifyFetch<{ products: { edges: any[] } }>(
    PRODUCTS_QUERY
  );
  const products = data.products.edges.map((edge) => edge.node);

  return (
    <main className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/shop/${product.handle}`}
          className="flex flex-col items-center border p-4 rounded-lg"
        >
          <Image
            src={product.images.edges[0]?.node.url}
            alt={product.images.edges[0]?.node.altText || product.title}
            width={300}
            height={300}
            className="object-cover rounded-md"
          />
          <h3 className="mt-2 font-semibold text-sm">{product.title}</h3>
          <p className="text-gray-600 text-xs">
            {product.variants.edges[0]?.node.price.amount}{" "}
            {product.variants.edges[0]?.node.price.currencyCode}
          </p>
        </Link>
      ))}
    </main>
  );
}
