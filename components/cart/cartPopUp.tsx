"use client";

import { useCart } from "@shopify/hydrogen-react";
import { AnimatePresence, motion } from "framer-motion";
import CartLine from "./cartLine";

interface CartPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPopup({ isOpen, onClose }: CartPopupProps) {
  const { lines, cost, checkoutUrl, totalQuantity = 0 } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 z-50"
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
              className="absolute top-3 right-5 text-black p-1 z-50 cursor-pointer"
            >
              ✕
            </button>
            {/* Panier vide */}
            {!lines || lines.length === 0 ? (
              <div className="pt-[56px]">
                <p className="mb-6 font-bagossTrial">{`Panier (00)`}</p>
                <p className="pt-56px mb-4">Votre panier est vide.</p>
              </div>
            ) : (
              <div className="pt-[56px]">
                <p className="mb-6 font-bagossTrial">{`Panier (${totalQuantity <= 9 ? `0${totalQuantity}` : `${totalQuantity}`}) `}</p>
                {lines.map((line) => {
                  if (!line) return null;

                  return <CartLine key={line.id} line={line} />;
                })}
                <div className="absolute bottom-5 flex flex-col w-full pr-10">
                  <div className="flex justify-between">
                    <span className="font-bagossTrial">SOUS-TOTAL</span>
                    <span className="font-bagossTrial">
                      {cost?.totalAmount?.amount}0
                      {cost?.totalAmount?.currencyCode === "EUR" ? "€" : "$"}
                    </span>
                  </div>
                  {checkoutUrl && (
                    <button
                      onClick={() => window.open(checkoutUrl, "_blank")}
                      className="mt-5 w-full text-center py-3 bg-black text-white rounded-3xl cursor-pointer"
                    >
                      Commander
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
