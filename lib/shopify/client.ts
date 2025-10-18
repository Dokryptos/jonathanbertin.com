const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2024-10/graphql.json`;

// export async function shopifyFetch<T>(
//   query: string,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   variables: Record<string, any> = {}
// ): Promise<T> {
//   const res = await fetch(endpoint, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Shopify-Storefront-Access-Token": token,
//     },
//     body: JSON.stringify({ query, variables }),
//     next: { revalidate: 60 }, // ISR support
//   });

//   const json = await res.json();
//   if (!res.ok || json.errors) throw new Error(JSON.stringify(json.errors));
//   return json.data;
// }

// lib/shopify/client.ts
export async function shopifyFetch<T>(
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any>
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = await res.json();

  if (json.errors) {
    console.error("Shopify GraphQL Error:", json.errors);
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data;
}
