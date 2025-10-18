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
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart container */}
          <motion.div
            className="fixed top-0 right-0 h-full w-4/5 sm:w-1/2 md:w-2/5 lg:w-1/3 bg-white z-50 shadow-lg p-5 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Votre panier</h2>
              <button onClick={onClose} className="text-2xl">
                ✕
              </button>
            </div>

            {/* Panier vide */}
            {!cart || cart.lines.length === 0 ? (
              <p>Votre panier est vide.</p>
            ) : (
              <>
                {/* Lignes du panier */}
                {cart.lines.map((line) => {
                  const merchandise = line.merchandise;
                  const product = merchandise?.product;
                  const imageUrl =
                    product?.images?.edges?.[0]?.node?.url ||
                    "/placeholder.jpg";

                  const unitPrice = merchandise?.price?.amount || "0";
                  const currency = merchandise?.price?.currencyCode || "EUR";
                  const totalLine = (Number(unitPrice) * line.quantity).toFixed(
                    2
                  );

                  return (
                    <div
                      key={line.id}
                      className="flex items-center justify-between mb-4"
                    >
                      {/* Image */}
                      <div className="w-20 h-20 relative flex-shrink-0">
                        <Image
                          src={imageUrl}
                          alt={product?.title || "Produit"}
                          fill
                          className="object-cover rounded"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 ml-3">
                        <p className="font-semibold">
                          {product?.title || "Produit inconnu"}
                        </p>
                        <p className="mt-1 text-sm">
                          {unitPrice} {currency}
                        </p>
                        <p className="mt-1 font-bold">
                          {totalLine} {currency === "EUR" ? "€" : "$"}
                        </p>
                      </div>

                      {/* Actions */}
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
                          className="w-16 border rounded text-center"
                        />
                        <button
                          onClick={() => removeFromCart(line.id)}
                          className="text-red-500 text-sm"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Total */}
                <div className="mt-5 border-t pt-3 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>
                    {cart.cost.totalAmount.amount}{" "}
                    {cart.cost.totalAmount.currencyCode === "EUR" ? "€" : "$"}
                  </span>
                </div>

                {/* Checkout */}
                {cart.checkoutUrl && (
                  <a
                    href={cart.checkoutUrl}
                    className="block mt-5 w-full text-center py-3 bg-black text-white rounded-lg"
                  >
                    Passer à la caisse
                  </a>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
