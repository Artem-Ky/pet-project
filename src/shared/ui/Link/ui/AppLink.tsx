import cnBind from 'classnames/bind';
import { Link, LinkProps } from 'react-router-dom';
import { FC, HTMLAttributeAnchorTarget, memo } from 'react';
import cls from './AppLink.module.scss';

export enum AppLinkTheme {
    WHITE = 'white',
    MAIN_COLOR = 'main-color',
}

interface AppLinkProps extends LinkProps {
    classNames?: string[];
    theme?: AppLinkTheme;
    target?: HTMLAttributeAnchorTarget;
    href?: string;
    fullHeight?: boolean;
    fullWidth?: boolean;
}

export const AppLink: FC<AppLinkProps> = memo((props: AppLinkProps) => {
    const {
        classNames = [],
        children,
        target,
        fullHeight,
        fullWidth,
        theme = AppLinkTheme.WHITE,
        to,
        href,
        ...otherProps
    } = props;
    const cn = cnBind.bind(cls);

    if (target && target === '_blank') {
        return (
            <a
                href={href}
                target={target}
                className={cn(
                    cls.AppLink,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                    [cls[theme]],
                    {
                        [cls.fullHeight]: fullHeight,
                        [cls.fullWidth]: fullWidth,
                    },
                )}
                {...otherProps}
            >
                {children}
            </a>
        );
    }

    return (
        <Link
            to={to}
            target={target}
            className={cn(
                cls.AppLink,
                ...classNames.map((clsName) => cls[clsName] || clsName),
                [cls[theme]],
                {
                    [cls.fullHeight]: fullHeight,
                    [cls.fullWidth]: fullWidth,
                },
            )}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
