"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import type {
  Cart,
  ShopifyCart,
  ShopifyAddToCartOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from "@/lib/shopify/types";
import { shopifyFetch } from "@/lib/shopify/client";
import {
  CART_CREATE,
  CART_LINES_ADD,
  CART_LINES_REMOVE,
  CART_LINES_UPDATE,
  CART_QUERY,
} from "@/lib/shopify/cartOperations";

// Fonction utilitaire pour convertir ShopifyCart → Cart
const mapShopifyCartToCart = (shopifyCart: ShopifyCart): Cart => ({
  ...shopifyCart,
  lines: shopifyCart.lines.edges.map((edge) => edge.node),
});

interface CartContextProps {
  cart: Cart | null;
  createCart: () => Promise<void>;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  // Crée un nouveau panier si aucun cartId en localStorage
  const createCart = async () => {
    const data = await shopifyFetch<{
      cartCreate: { cart: ShopifyCart };
    }>(CART_CREATE, { input: { lines: [] } });
    const newCart = mapShopifyCartToCart(data.cartCreate.cart);
    console.log(newCart);
    localStorage.setItem("shopify_cart_id", newCart.id);
    setCart(newCart);
  };

  // Ajoute une ligne au panier
  const addToCart = async (variantId: string, quantity: number) => {
    if (!cart) return;

    const variables: ShopifyAddToCartOperation["variables"] = {
      cartId: cart.id,
      lines: [{ merchandiseId: variantId, quantity }],
    };

    const result = await shopifyFetch<ShopifyAddToCartOperation>(
      CART_LINES_ADD,
      variables
    );

    if (!result?.cartLinesAdd) {
      console.error("Erreur lors de l'ajout au panier", result);
      return;
    }

    const updatedCart = mapShopifyCartToCart(result.cartLinesAdd.cart);
    setCart(updatedCart);
  };

  // Supprime une ligne du panier
  const removeFromCart = async (lineId: string) => {
    if (!cart) return;

    const variables = { cartId: cart.id, lineIds: [lineId] };
    const result = await shopifyFetch<ShopifyRemoveFromCartOperation>(
      CART_LINES_REMOVE,
      variables
    );

    if (!result?.data.cartLinesRemove?.cart) {
      console.error("Erreur removeFromCart", result);
      return;
    }

    const updatedCart = mapShopifyCartToCart(result.data.cartLinesRemove.cart);
    setCart(updatedCart);
  };

  const updateCartLine = async (lineId: string, quantity: number) => {
    if (!cart) return;

    const line = cart.lines.find((l) => l.id === lineId);
    if (!line) return;

    const merchandiseId = line.merchandise?.id;
    if (!merchandiseId) {
      console.error("❌ merchandiseId manquant pour la ligne", line);
      return;
    }

    console.log(
      "Update line:",
      lineId,
      "merchandiseId:",
      merchandiseId,
      "quantity:",
      quantity
    );

    const result = await shopifyFetch<ShopifyUpdateCartOperation>(
      CART_LINES_UPDATE,
      {
        cartId: cart.id,
        lines: [{ id: lineId, merchandiseId, quantity }],
      }
    );

    if (result?.data?.cartLinesUpdate?.cart) {
      const updatedCart = mapShopifyCartToCart(
        result.data.cartLinesUpdate.cart
      );
      setCart(updatedCart);
    } else {
      console.error("⚠️ Erreur updateCartLine:", result);
    }
  };

  useEffect(() => {
    const cartId = localStorage.getItem("shopify_cart_id");

    const initCart = async () => {
      if (!cartId) {
        // Crée un nouveau panier automatiquement
        await createCart();
        return;
      }

      try {
        // Sinon récupère le panier existant
        const data = await shopifyFetch<{ cart: ShopifyCart }>(CART_QUERY, {
          cartId,
        });
        setCart(mapShopifyCartToCart(data.cart));
      } catch (error) {
        console.error("Impossible de récupérer le cart existant", error);
        localStorage.removeItem("shopify_cart_id"); // Si le cart est invalide
        await createCart(); // Crée un nouveau panier
      }
    };

    initCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, createCart, addToCart, removeFromCart, updateCartLine }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook pour utiliser le cart facilement
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
