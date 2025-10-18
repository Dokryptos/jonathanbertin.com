"use client";

import { useCart } from "./cartContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
  const { cart, removeFromCart, updateCartLine } = useCart();

  const handleQuantityChange = (lineId: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartLine(lineId, quantity);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart container */}
          <motion.div
            className="fixed top-0 right-0 h-full w-4/5 tablet:w-1/2 laptop:w-2/5 desktop:w-1/3 bg-white z-50 flex flex-col scrollbar-hide pr-5 pl-5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-5 text-black p-1 z-50"
            >
              ✕
            </button>
            {/* Panier vide */}
            {!cart || cart.lines.length === 0 ? (
              <p className="pt-56px">Votre panier est vide.</p>
            ) : (
              <div className="pt-[56px]">
                <p className="mb-6 font-bagossTrial">{`Panier (${cart?.totalQuantity <= 9 ? `0${cart.totalQuantity}` : `${cart.totalQuantity}`}) `}</p>
                {cart.lines.map((line, i) => {
                  const merchandise = line.merchandise;
                  const product = merchandise?.product;
                  const imageUrl = product?.images?.edges?.[0]?.node?.url;
                  const unitPrice = merchandise?.price?.amount || "0";
                  const currency = merchandise?.price?.currencyCode || "EUR";

                  return (
                    <div key={i}>
                      <div key={line.id} className="flex mb-4">
                        <div className=" relative w-25 h-25">
                          <Image
                            src={imageUrl}
                            alt={product?.title || "Produit"}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-col w-full h-auto justify-between pl-3">
                          <div className="flex justify-between">
                            <p>{product?.title}</p>
                            <button onClick={() => removeFromCart(line.id)}>
                              ✕
                            </button>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex flex-col items-end gap-2">
                              <input
                                type="number"
                                min={1}
                                value={line.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    line.id,
                                    Number(e.target.value)
                                  )
                                }
                                className="w-16 border text-center"
                              />
                            </div>
                            <p className="mt-1 text-sm">
                              {unitPrice} {currency}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="absolute bottom-5 flex flex-col w-full pr-10">
                  <div className="flex justify-between">
                    <span>SOUS-TOTAL</span>
                    <span>
                      {cart.cost.totalAmount.amount}
                      {cart.cost.totalAmount.currencyCode === "EUR" ? "€" : "$"}
                    </span>
                  </div>
                  {cart && (
                    <button className="mt-5 w-full text-center py-3 bg-black text-white rounded-3xl">
                      <a href={cart.checkoutUrl} className="">
                        Commander
                      </a>
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
