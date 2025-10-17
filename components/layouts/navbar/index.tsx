"use client";

import CartWrapper from "@/components/cart/cartWrapper";
import Grid from "@/components/ui/grid/index";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 text-[16px]/[18px] desktop:text-[20px]/[26px] h-[80px] desktop:h-[96px] bg-white pl-5 pr-5 pt-3`}
    >
      <Grid>
        <div className="col-start-1 laptop:col-span-6 tablet:col-span-4 col-span-3">
          <Link className="font-bagossTrial" href="/">
            Jonathan Bertin
          </Link>
          <div className="flex pt-2 gap-1">
            <Link
              className={`${pathname.includes("/personnal") ? "italic laptop:text-[16.63px] desktop:text-[20.8px]" : "not-italic"} hover:italic hover:desktop:text-[20.8px] hover:laptop:text-[16.63px]`}
              href={"/personnal"}
            >
              Personal,
            </Link>
            <Link
              className={`${pathname.includes("/commissioned") ? "italic desktop:text-[21.65px] laptop:text-[17.32px]" : "not-italic"} hover:italic hover:desktop:text-[21.65px] hover:laptop:text-[17.32px]`}
              href={"/commissioned"}
            >
              Commissioned,
            </Link>
            <Link
              className={`${pathname.includes("/news") ? "italic desktop:text-[21.55px] laptop:text-[17.3px]" : "not-italic"} hover:italic hover:desktop:text-[21.55px] hover:laptop:text-[17.3px]`}
              href={"/news"}
            >
              News,
            </Link>
            <Link
              className={`${pathname.includes("/about") ? "italic desktop:text-[21px] laptop:text-[17.3px]" : "not-italic"} hover:italic hover:desktop:text-[21px] hover:laptop:text-[17.3px]`}
              href={"/about"}
            >
              About
            </Link>
          </div>
        </div>
        <div className="desktop:col-start-12 tablet:col-start-10 col-start-6 col-span-2 flex justify-end gap-3">
          <Link
            className={` ${pathname.includes("/shop") ? "italic" : "not-italic"} hover:italic leading-none`}
            href="/shop"
          >
            Shop
          </Link>
          <div
            className={`hover:italic hover:desktop:text-[18.7px] hover:laptop:text-[15.02px] leading-none`}
          >
            <CartWrapper />
          </div>
        </div>
      </Grid>
    </nav>
  );
}
