"use client";

import { useState } from "react";
import CartPopup from "./cartPopUp";
import { CartProvider } from "@/components/cart/cartContext";
import { useCart } from "@/components/cart/cartContext";

export default function CartWrapper() {
  const [cartOpen, setCartOpen] = useState(false);
  const cart = useCart();

  return (
    <CartProvider>
      <button
        onClick={() => setCartOpen(true)}
        className="flex items-center font-junicode"
      >
        <p className="text-[16px] desktop:text-[20px]">Cart</p>
        <div className="text-[9px] pl-1 font-bagossTrial">{`(${cart.cart?.totalQuantity || 0})`}</div>
      </button>

      <CartPopup isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </CartProvider>
  );
}
