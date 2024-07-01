import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  text?: string;
  type?: string;
  to?: string;
  onClick?: () => void;
  color?: string;
  function?: (arg: string) => void;
}

const Button = ({ children, onClick, to = "/", color = "primary" }: Props) => {
  return (
    <Link to={to}>
      <button className={`btn btn-${color}`} onClick={onClick}>
        {children}
      </button>
    </Link>
  );
};

export default Button;
