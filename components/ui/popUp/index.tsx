import { ReactNode } from "react";
import { motion } from "framer-motion";

type PopUpProps = {
  children: ReactNode;
  className?: string;
};

export default function List({ children, className = "" }: PopUpProps) {
  return (
    <div className={`flex flex-wrap ${className}`}>
      <div></div>
    </div>
  );
}
