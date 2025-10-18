"use client";

import CartPopup from "./cartPopUp";
import { useCart } from "@/components/cart/cartContext";

export default function CartWrapper() {
  return (
    <>
      <CartButton />
      <CartPopupWrapper />
    </>
  );
}
function CartPopupWrapper() {
  const { isCartOpen, closeCart } = useCart();
  return <CartPopup isOpen={isCartOpen} onClose={closeCart} />;
}

function CartButton() {
  const { cart, toggleCart } = useCart();

  return (
    <button onClick={toggleCart} className="flex items-center font-junicode">
      <p className="text-[16px] desktop:text-[20px]">Cart</p>
      <div className="text-[12px] pl-1 font-bagossTrial">
        ({cart?.totalQuantity || 0})
      </div>
    </button>
  );
}
