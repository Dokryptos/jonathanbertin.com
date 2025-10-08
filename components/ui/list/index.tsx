import { ReactNode } from "react";

type ListProps = {
  children: ReactNode;
  className?: string;
};

export default function List({ children, className = "" }: ListProps) {
  return <div className={`flex flex-wrap ${className}`}>{children}</div>;
}
