export const CART_CREATE = `
mutation cartCreate($input: CartInput!) {
  cartCreate(input: $input) {
    cart {
      id
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  url
                }
                priceV2 {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  images(first: 1) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      totalQuantity
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
      }
    }
  }
}`;

export const CART_LINES_ADD = `
mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                image {
                  url
                }
                priceV2 {
                  amount
                  currencyCode
                }
                product {
                  id
                  title
                  images(first: 1) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const CART_LINES_REMOVE = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        totalQuantity
        lines(first: 10) {
          edges {
            node {
              id
              quantity
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;

export const CART_LINES_UPDATE = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        totalQuantity
        lines(first: 10) {
          edges {
            node {
              id
              quantity
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;
export const CART_QUERY = `
  query cartQuery($cartId: ID!) {
    cart(id: $cartId) {
      id
      totalQuantity
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
