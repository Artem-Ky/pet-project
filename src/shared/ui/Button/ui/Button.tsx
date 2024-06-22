import { ButtonHTMLAttributes, FC } from "react";
import cls from "./Button.module.scss";
import cnBind from "classnames/bind";

export enum ThemeButton {
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classNames?: string[];
  theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, classNames = [], type = "button", theme, ...otherProps } = props;
  const cn = cnBind.bind(cls);

  return (
    <button
      type={type}
      className={cn(
        cls.Button,
        cls[theme],
        ...classNames.map((clsName) => cls[clsName] || clsName)
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
};
