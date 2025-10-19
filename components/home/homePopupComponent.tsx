"use client";
import { useState } from "react";
import PopUp from "../ui/popUp";
import Arrow from "@/public/image/arrow-contactPopup.png";
import Image from "next/image";

export default function HomePopUpComponent() {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed bottom-0 w-dvw bg-white pr-5 pl-5 font-junicode z-30`}
      >
        <div className="flex justify-between pt-4 pb-4 text-[16px]/[18px] desktop:text-[20px] ">
          <div className="flex">
            <p className="pr-2"></p>
          </div>
          <button
            onClick={() => {
              setInfoOpen(!infoOpen);
            }}
            className="cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>
      <PopUp
        isOpen={infoOpen}
        onClose={() => setInfoOpen(false)}
        footerName="Contact"
      >
        <div className="pb-3">
          <h2 className="font-bagossTrial text-[16px]/[130%] pb-3">Contact</h2>
          <p>Jonathan Bertin</p>
          <p>Photographe & Directeur Artistique</p>
          <a
            href="contact@jonathanbertin.com"
            className="underline cursor-pointer"
          >
            contact@jonathanbertin.com
          </a>
        </div>

        <div>
          <h2 className="font-bagossTrial text-[16px]/[130%] pb-3">
            Newletter
          </h2>
          <p className="pb-3">Abonnez-vous à la newsletter ici :</p>
          <div className="flex justify-start border-1 rounded-4xl w-full mb-6">
            <input
              placeholder="Entrez votre adresse email... "
              className=" pl-6"
            />
            <button>
              <Image
                src={Arrow}
                alt="arrow"
                unoptimized
                className="h-12 w-12 ml-[2px] p-2 cursor-pointer"
              />
            </button>
          </div>
          <div className="pb-6">
            <h2 className="font-bagossTrial text-[16px]/[130%] pb-3">
              Follow me
            </h2>
            <div className="flex gap-1 flex-wrap cursor-pointer">
              <a href="https://www.instagram.com/jonathanbertin/">Instagram,</a>
              <a href="https://x.com/jonathanbertin">Twitter,</a>
              <a href="https://www.youtube.com/jonathanbertin">Youtube,</a>
              <a href="https://www.tiktok.com/@jonathanbertin">TikTok,</a>
              <a href="https://discord.com/invite/zKyWNUBXB8">Discord,</a>
            </div>
          </div>
          <div>
            <p>
              Droits d&apos;auteur © 2025
              <a
                href="https://jonathanbertin.com/"
                className="underline pl-1 cursor-pointer"
              >
                ERRANCE STUDIO Jonathan Bertin
              </a>
            </p>
          </div>
        </div>
      </PopUp>
    </>
  );
}
