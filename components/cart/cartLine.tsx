import { useCart } from "@shopify/hydrogen-react";
import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CartLine({ line }: { line: any }) {
  const { linesRemove, linesUpdate } = useCart();

  const merchandise = line.merchandise;
  const product = merchandise?.product;
  const imageUrl = merchandise?.image?.url;
  const unitPrice = merchandise?.price?.amount || "0";

  return (
    <div className="flex mb-4">
      <div className=" relative w-25 h-25">
        <Image
          unoptimized
          src={imageUrl || ""}
          alt={product?.title || "Produit"}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col w-full h-auto justify-between pl-3">
        <div className="flex justify-between">
          <p>{product?.title}</p>
          <button onClick={() => linesRemove([line.id || ""])}>✕</button>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-2 font-bagossTrial">
            <button
              onClick={() =>
                linesUpdate([
                  { id: line.id || "", quantity: (line.quantity || 0) - 1 },
                ])
              }
              className="px-2 py-1 text-[#8F877A] hover:text-black "
            >
              -
            </button>
            <span>{line?.quantity}</span>
            <button
              onClick={() =>
                linesUpdate([
                  { id: line.id || "", quantity: (line.quantity || 0) + 1 },
                ])
              }
              className="px-2 py-1 text-[#8F877A] hover:text-black"
            >
              +
            </button>
          </div>
          <p className="mt-1 font-bagossTrial">{unitPrice}0 €</p>
        </div>
      </div>
    </div>
  );
}
