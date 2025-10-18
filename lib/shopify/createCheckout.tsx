// import { shopifyFetch } from "./client";

// export async function createCheckout(
//   lines: { merchandiseId: string; quantity: number }[]
// ) {
//   const query = `
//      mutation checkoutCreate($input: CheckoutCreateInput!) {
//        checkoutCreate(input: $input) {
//         checkout {
//            id
//            webUrl
//         }
//        }
//      }
//   `;

//   const data = await shopifyFetch(query, {
//     input: {
//       lineItems: lines.map((l) => ({
//         variantId: l.merchandiseId,
//         quantity: l.quantity,
//       })),
//     },
//   });

//   return data.checkoutCreate.checkout;
// }
