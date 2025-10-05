import { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
  className?: string;
};

export default function Grid({ children, className = "" }: GridProps) {
  return (
    <div
      className={`grid grid-cols-6 tablet:grid-cols-10 laptop:grid-cols-12 ${className}`}
    >
      {children}
    </div>
  );
}
