import cnBind from "classnames/bind";
import { AppLink } from "shared/ui/Link";
import { AppLinkTheme } from "shared/ui/Link/ui/AppLink";
import cls from "./NavBar.module.scss";

interface NavbarProps {
  classNames?: string[];
}

export const NavBar = ({ classNames }: NavbarProps) => {
    const cn = cnBind.bind(cls);

    return (
        <div className={cls.NavBar}>
            <ul className={cls.linksList}>
                <li>
                    <AppLink theme={AppLinkTheme.SECONDARY} to="/">
                        main
                    </AppLink>
                </li>
                <li>
                    <AppLink theme={AppLinkTheme.SECONDARY} to="/about">
                        about
                    </AppLink>
                </li>
            </ul>
        </div>
    );
};
