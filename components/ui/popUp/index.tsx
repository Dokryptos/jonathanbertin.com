"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Grid from "@/components/ui/grid/index";

type PopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function PopUp({ isOpen, onClose, children }: PopUpProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Grid>
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-4/5 tablet:w-1/2 laptop:w-2/5 desktop:w-1/3 bg-white z-50 flex flex-col scrollbar-hide"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-5 text-black p-1 z-50"
            >
              ✕
            </button>

            <div className="flex-1 overflow-y-auto px-5 pt-10 pb-16">
              {children}
            </div>

            <div className="sticky bottom-0 right-0 w-full bg-white pt-3 pb-3 pr-5 pl-5 flex justify-end z-50">
              <button
                className="p-1 text-[16px]/[130%] desktop:text-[20px]/[130%]"
                onClick={onClose}
              >
                Informations
              </button>
            </div>
          </motion.div>
        </Grid>
      )}
    </AnimatePresence>
  );
}
