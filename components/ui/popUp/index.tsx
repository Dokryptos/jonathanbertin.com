'use client";';
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
          ></motion.div>
          <motion.div
            className="fixed top-0 right-0 h-full w-4/5 tablet:w-1/2 laptop:w-2/5  desktop:w-1/3  bg-white z-50 pr-5 pl-5 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-5 text-black p-1"
            >
              ✕
            </button>
            {children}
          </motion.div>
        </Grid>
      )}
    </AnimatePresence>
  );
}
