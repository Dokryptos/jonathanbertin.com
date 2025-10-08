import { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
  className?: string;
};

export default function Grid({ children, className = "" }: GridProps) {
  return (
    <div
      className={`grid grid-cols-3 tablet:grid-cols-5 laptop:grid-cols-5 desktop:grid-cols-6 gap-3 ${className}`}
    >
      {children}
    </div>
  );
}
