import React, { FC, MouseEvent } from "react";
import style from "./Button.module.scss";
import { StatusDot } from "../Icons/Icons";

interface ButtonProps {
  active: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  title?: string;
}

enum Title {
  Alive = "green",
  Dead = "red",
  Unknown = "#cecece",
}

const Button: FC<ButtonProps> = ({ active, onClick, title }) => {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  const buttonClass = `${style.buttonContainer}  ${active ? style.active : ""}`;

  return (
    <button className={buttonClass} onClick={handleClick}>
      <StatusDot color={Title[title as keyof typeof Title]} />
      <span>{title ? title : "unknown"}</span>
    </button>
  );
};

export default Button;
