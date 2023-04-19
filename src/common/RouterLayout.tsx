import { NavBar } from "./NavBar";
import React from "react";

export const RouterLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...props
}) => {
  return (
    <div {...props}>
      <NavBar />
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};
