import cnBind from "classnames/bind";
import { Link, LinkProps } from "react-router-dom";
import { FC } from "react";
import cls from "./AppLink.module.scss";

export enum AppLinkTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface AppLinkProps extends LinkProps {
  classNames?: string[];
  theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        classNames,
        children,
        theme = AppLinkTheme.PRIMARY,
        to,
        ...otherProps
    } = props;
    const cn = cnBind.bind(cls);

    return (
        <Link
            to={to}
            className={cn(cls.AppLink, [cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
};
