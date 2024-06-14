import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  text?: string;
  type?: string;
  to?: string;
  onClick?: () => void;
  color?: string;
  function?: (arg: string) => void; // Adjust the type according to your function's requirements
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
