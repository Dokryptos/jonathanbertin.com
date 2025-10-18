'use client';

import {
  CartProvider,
  ShopifyProvider,
  useShopifyCookies,
} from "@shopify/hydrogen-react";

export default function ProviderShopify({
  children,
}: {
  children: React.ReactNode;
}) {
  useShopifyCookies();

  return (
    <ShopifyProvider
      storeDomain={process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN as string}
      storefrontToken={
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string
      }
      storefrontApiVersion="2025-07"
      languageIsoCode="EN"
      countryIsoCode="US"
    >
      <CartProvider>{children}</CartProvider>
    </ShopifyProvider>
  );
}
