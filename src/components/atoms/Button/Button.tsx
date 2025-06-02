import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonType = {
  text?: string;
  border?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text, border, ...props }: ButtonType) => {
  return (
    <button
      className={`
        ${styles.button} 
        ${border ? styles.button__border : ""}
        `}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
