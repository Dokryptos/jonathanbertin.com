"use client";

import { ShopifyProduct } from "@/lib/shopify/types";
import CarousselMobile from "./carrousselMobile";
import { useState } from "react";
import PopUp from "@/components/ui/popUp";
import AddToCartButton from "@/components/cart/cartButton";
/* eslint-disable @next/next/no-img-element */

interface ProductDataProps {
  productData: ShopifyProduct;
}

export default function ShopHandleComponent({ productData }: ProductDataProps) {
  const [infoOpen, setInfoOpen] = useState<boolean>(false);
  console.log(productData.variants.edges[0].node);
  return (
    <>
      <div className="grid grid-cols-1 tablet:grid-cols-2 pt-[80px] desktop:pt-[96px] pl-5 pr-5">
        <div className="font-bagossTrial text-[20px]/[18px] flex items-center pb-1 tablet:hidden laptop:hidden">
          {productData.title}
          <span className="text-[9px] tarblet:text-[12px] pl-2">{`(0${productData.images.edges.length})`}</span>
        </div>
        <div className="text-[20px] pb-5 flex tablet:hidden">
          €{productData.priceRange.minVariantPrice.amount}
        </div>
        <CarousselMobile
          carousselGallery={productData.images.edges}
          title={productData.title}
        />
        <div className="hidden tablet:flex flex-col h-full tablet:max-h-[calc(100vh-80px)] desktop:max-h-[calc(100vh-96px)] overflow-y-auto scrollbar-hide pr-[6px] laptop:pr-6 desktop:pr-[65px] gap-3">
          {productData.images.edges.map((image, i) => (
            <div key={i} className="w-full hidden tablet:block">
              <img
                src={image?.node.url}
                alt={productData?.id}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
        <div className="whitespace-pre-wrap text-[14px]/[18px] pt-3 tablet:pt-0 tablet:pl-[6px] laptop:pl-6 desktop:pl-[65px] laptop:pr-[51px] desktop:pr-[133px] overflow-y-auto scrollbar-hide tablet:max-h-[calc(100vh-80px)] desktop:max-h-[calc(100vh-96px)] pb-[60px]">
          <div className="font-bagossTrial text-[20px]/[18px] desktop:text-[25px] items-center pb-3 hidden tablet:flex">
            {productData.title}
            <span className="text-[9px] tablet:text-[12px] pl-2">{`(${productData.images.edges.length <= 9 ? `0${productData.images.edges.length}` : `${productData.images.edges.length}`})`}</span>
          </div>
          <div className="text-[20px] pb-5 hidden tablet:flex">
            €{productData.priceRange.minVariantPrice.amount}
          </div>
          <div className="flex tablet:hidden pb-6">
            <AddToCartButton
              variantId={productData.variants.edges[0].node.id}
              className="w-full"
            >
              <button className="p-3 bg-black text-white border-1 border-black rounded-4xl w-full underline text-[16px]">
                Ajouter au panier
              </button>
            </AddToCartButton>
          </div>
          <div
            className="text-[16px]/[130%] pb-5 font-junicode prose prose-sm "
            dangerouslySetInnerHTML={{ __html: productData.descriptionHtml }}
          />
          <div className="w-full justify-between items-center text-[16px] hidden tablet:flex">
            <div>€{productData.priceRange.minVariantPrice.amount}</div>
            {productData.availableForSale ||
            productData.variants.edges[0].node.quantityAvailable <= 0 ? (
              <p>Épuisé</p>
            ) : (
              <AddToCartButton
                variantId={productData.variants.edges[0].node.id}
              >
                <button className="p-3 bg-white hover:bg-black text-black hover:text-white transition-all duration-200 border-1 border-black rounded-4xl underline">
                  Ajouter au panier
                </button>
              </AddToCartButton>
            )}
          </div>
        </div>
      </div>
      <div className={`fixed bottom-0 w-dvw bg-white pr-5 pl-5 font-junicode`}>
        <div className="flex justify-between pt-4 pb-4 text-[16px]/[18px] desktop:text-[20px]">
          {productData.availableForSale ||
          productData.variants.edges[0].node.quantityAvailable <= 0 ? (
            <p>Épuisé</p>
          ) : (
            <AddToCartButton variantId={productData.variants.edges[0].node.id}>
              <p className="underline ">Ajouter au panier</p>
            </AddToCartButton>
          )}
          <button
            onClick={() => {
              setInfoOpen(!infoOpen);
            }}
            className="cursor-pointer"
          >
            Informations
          </button>
        </div>
      </div>
      <PopUp isOpen={infoOpen} onClose={() => setInfoOpen(false)}>
        <div className="pt-[46px]">
          <h2 className="font-bagossTrial text-[16px]/[130%] pb-6">
            {productData?.title}
          </h2>
          <p className="font-junicode whitespace-pre-wrap pb-[48px]">
            <div
              className="text-[16px]/[130%] pb-5 font-junicode"
              dangerouslySetInnerHTML={{ __html: productData.descriptionHtml }}
            />
          </p>
        </div>
      </PopUp>
    </>
  );
}
