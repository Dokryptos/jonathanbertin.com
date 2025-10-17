"use client";
import { useCart } from "@/components/cart/cartContext";
import { ReactNode } from "react";

interface AddToCartButtonProps {
  variantId: string;
  children?: ReactNode;
  quantity?: number;
  redirectToCheckout?: boolean;
  className?: string;
}

export default function AddToCartButton({
  variantId,
  quantity = 1,
  redirectToCheckout = false,
  children,
  className = "",
}: AddToCartButtonProps) {
  const { addToCart, cart } = useCart();

  const handleClick = async () => {
    try {
      await addToCart(variantId, quantity);

      // si l'utilisateur veut aller directement au checkout
      if (redirectToCheckout && cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    } finally {
    }
  };

  return (
    <div onClick={handleClick} className={`${className}`}>
      {children}
    </div>
  );
}
