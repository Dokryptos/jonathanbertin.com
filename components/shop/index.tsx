"use client";
import Image from "next/image";
import Link from "next/link";
import type { ShopifyProduct } from "@/lib/shopify/types";

interface ShopDataProps {
  shopData: ShopifyProduct[];
}

export default function ShopComponent({ shopData }: ShopDataProps) {
  const sortedShopData = [...shopData].sort((a, b) => {
    const aQuantity = a.variants.edges[0]?.node?.quantityAvailable ?? 0;
    const bQuantity = b.variants.edges[0]?.node?.quantityAvailable ?? 0;

    const aSoldOut = aQuantity <= 0;
    const bSoldOut = bQuantity <= 0;

    if (aSoldOut && !bSoldOut) return 1; // a après b
    if (!aSoldOut && bSoldOut) return -1; // a avant b
    return 0;
  });

  return (
    <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 pt-[80px] desktop:pt-[96px] gap-3 pr-5 pl-5">
      {sortedShopData.map((product) => (
        <Link
          key={product.id}
          href={`/shop/${product.handle}`}
          className="flex flex-col items-center pb-3"
        >
          <div className="relative w-full aspect-[4/5]">
            <Image
              src={product.images.edges[0]?.node.url}
              alt={product.images.edges[0]?.node.altText || product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="pt-3 font-bagossTrial text-[16px] laptop:text-[10px] desktop:text-[14px] w-full flex justify-between">
            <div>{product.title}</div>
            {product.availableForSale ||
            product.variants.edges[0].node.quantityAvailable <= 0 ? (
              <p className="">Épuisé</p>
            ) : (
              <p className="">
                {product.variants.edges[0]?.node.price.amount}0€
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
