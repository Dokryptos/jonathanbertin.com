"use client";
import { useCart } from "@shopify/hydrogen-react";
import { ReactNode } from "react";
import { useCart as useCartContext } from "./cartContext";

interface AddToCartButtonProps {
  variantId: string;
  children?: ReactNode;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  variantId,
  quantity = 1,
  children,
  className = "",
}: AddToCartButtonProps) {
  const { linesAdd } = useCart();
  const { openCart } = useCartContext();

  const handleClick = async () => {
    try {
      await linesAdd([
        {
          merchandiseId: variantId,
          quantity: quantity,
        }
      ]);
      openCart();
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
