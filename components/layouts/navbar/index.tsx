"use client";

import Grid from "@/components/ui/grid/index";
// import { useViewMode } from "@/context/ViewModeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  // const { viewMode, setViewMode } = useViewMode();

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-30 text-[14px]/[18px] desktop:text-[20px]/[26px] h-[80px] desktop:h-[96px] bg-white pl-5 pr-5 pt-3`}
    >
      <Grid>
        <div className="col-start-1 laptop:col-span-6 tablet:col-span-4 col-span-3">
          <Link className="font-bagossTrial" href="/">
            Jonathan Bertin
          </Link>
          <div className="flex pt-2 gap-1">
            <Link
              className={`${pathname.includes("/personnal") ? "italic" : "not-italic"} hover:italic hover:desktop:text-[20.8px] hover:laptop:text-[14.5px]`}
              href={"/personnal"}
            >
              Personal,
            </Link>
            <Link
              className={`${pathname.includes("/commissioned") ? "italic" : "not-italic"} hover:italic hover:desktop:text-[21.65px] hover:laptop:text-[15.2px]`}
              href={"/commissioned"}
            >
              Commissioned,
            </Link>
            <Link
              className={`${pathname.includes("/news") ? "italic" : "not-italic"} hover:italic hover:desktop:text-[21.55px] hover:laptop:text-[15.1px]`}
              href={"/news"}
            >
              News,
            </Link>
            <Link
              className={`${pathname.includes("/about") ? "italic" : "not-italic"} hover:italic hover:desktop:text-[21px] hover:laptop:text-[15px]`}
              href={"/about"}
            >
              About
            </Link>
          </div>
        </div>

        {/* Affichage du Toggle List/Grid uniquement sur la page Project
          {pathname.includes("/project") && (
            <div className="pt-5 pl-3 pb-10 font-ppeiko text-[10px] laptop:text-[12px] flex items-center">
              <button
                className={` pr-1 ${
                  viewMode === "list" ? "text-black" : "text-[#818181]"
                }`}
                onClick={() => setViewMode("list")}
              >
                List
              </button> 
              /
              <button
                className={`pl-1 ${
                  viewMode === "grid" ? "text-black" : "text-[#818181]"
                }`}
                onClick={() => setViewMode("grid")}
              >
                Grid
              </button>
            </div>
          )}*/}

        <div className="desktop:col-start-12 tablet:col-start-10 col-start-6 col-span-2 flex justify-end gap-3">
          <Link
            className={` ${pathname.includes("/shop") ? "italic" : "not-italic"} hover:italic`}
            href="/shop"
          >
            Shop
          </Link>
          <Link
            className={`${pathname.includes("/cart") ? "italic" : "not-italic"} hover:italic hover:desktop:text-[18.7px] hover:laptop:text-[13.18px]`}
            href="/cart"
          >
            Cart
          </Link>
        </div>
      </Grid>
    </nav>
  );
}
