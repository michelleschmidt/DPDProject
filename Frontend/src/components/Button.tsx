import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import "../App.css";

interface Props {
  children: ReactNode;
  text?: string;
  type?: string;
  to?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  color?: string;
  function?: (arg: string) => void;
}

const Button = ({ children, onClick, to = "/", color = "primary" }: Props) => {
  return (
    <div className="centered-button">
      <Link to={to}>
        <button className={`btn btn-${color}`} onClick={onClick}>
          {children}
        </button>
      </Link>
    </div>
  );
};

export default Button;
