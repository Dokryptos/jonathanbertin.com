"use client";

import { useCart } from "@shopify/hydrogen-react";
import CartPopup from "./cartPopUp";
import { useCart as useCartContext } from "@/components/cart/cartContext";

export default function CartWrapper() {
  return (
    <>
      <CartButton />
      <CartPopupWrapper />
    </>
  );
}
function CartPopupWrapper() {
  const { isCartOpen, closeCart } = useCartContext();
  return <CartPopup isOpen={isCartOpen} onClose={closeCart} />;
}

function CartButton() {
  const { toggleCart } = useCartContext();
  const { totalQuantity = 0 } = useCart();

  return (
    <button onClick={toggleCart} className="flex items-center font-junicode">
      <p className="text-[16px] desktop:text-[20px]">Cart</p>
      <div className="text-[12px] pl-1 font-bagossTrial">
        ({totalQuantity <= 9 ? `0${totalQuantity}` : `${totalQuantity}`})
      </div>
    </button>
  );
}
