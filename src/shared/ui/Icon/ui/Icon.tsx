import React, { memo, SVGProps } from 'react';
import cnBind from 'classnames/bind';
import cls from './Icon.module.scss';

export enum IconSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export enum IconColor {
    WHITE = 'white',
    GRAY = 'gray',
    BLACK_WHITE = 'black-white',
    LIGHT_GRAY = 'light-gray',
    LIGHT__GRAY_WHITE = 'lightGray-white',
}

export enum IconTypeVariant {
    FILL_NO_STOKE = 'fill-no-stroke',
    STROKE_NO_FILL = 'stroke-no-fill',
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
    classNames?: string[];
    icon: React.VFC<SVGProps<SVGSVGElement>>;
    variant?: IconTypeVariant;
    color?: IconColor;
    size?: IconSize;
    width?: number;
    height?: number;
}

export const Icon = memo((props: IconProps) => {
    const {
        classNames = [],
        icon: IconComponent,
        variant = IconTypeVariant.FILL_NO_STOKE,
        size = IconSize.SMALL,
        color = IconColor.WHITE,
        width,
        height,
        ...otherProps
    } = props;
    const cn = cnBind.bind(cls);

    return (
        <IconComponent
            style={{ height, width }}
            className={cn(
                cls.Icon,
                cls[variant],
                cls[size],
                cls[color],
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
            {...otherProps}
        />
    );
});
