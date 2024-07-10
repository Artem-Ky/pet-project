import cnBind from 'classnames/bind';
import { Link, LinkProps } from 'react-router-dom';
import { FC, memo } from 'react';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
    classNames?: string[];
    theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
    const {
        classNames = [], children, theme, to, ...otherProps
    } = props;
    const cn = cnBind.bind(cls);

    return (
        <li>
            <Link
                to={to}
                className={cn(
                    cls.AppLink,
                    [cls[theme]],
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
                {...otherProps}
            >
                {children}
            </Link>
        </li>
    );
});
