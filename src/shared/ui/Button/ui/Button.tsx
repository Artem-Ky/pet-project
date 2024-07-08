/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, FC } from 'react';
import cnBind from 'classnames/bind';
import cls from './Button.module.scss';

export enum ButtonVariant {
    CLEAR = 'clear',
    OUTLINE = 'outline',
}
export enum ButtonColor {
    WHITE = 'white',
    WHITE_DARK = 'white-dark',
    LIGHT_WHITE = 'light-white',
}
export enum ButtonOutlineColor {
    Success = 'outline-success',
    Error = 'outline-error',
    Gray_White = 'outline-grey-white',
    Green_White = 'outline-green-white',
}

export enum ButtonSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    //  дополнительные классы для кнопки

    classNames?: string[];

    //  вариант кнопки

    variant?: ButtonVariant;

    //  тип кнопки

    type?: 'button' | 'submit' | 'reset';

    //  если true то width 100%

    fullWidth?: boolean;

    //  цвет кнопки

    color?: ButtonColor;

    //  размер кнопки

    size?: ButtonSize;

    //  цвет обводки

    outlineColor?: ButtonOutlineColor;

    //  кнопка будет квадратной (по высоте)

    isSquare?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        children,
        classNames = [],
        variant,
        type = 'button',
        fullWidth = false,
        color,
        size,
        outlineColor,
        isSquare,
        ...otherProps
    } = props;
    const cn = cnBind.bind(cls);

    return (
        <button
            type={type}
            className={cn(
                cls.Button,
                cls[size],
                cls[color],
                cls[outlineColor],
                cls[variant],
                { [cls.square]: isSquare },
                { [cls.fullWidth]: fullWidth },
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
            {...otherProps}
        >
            {children}
        </button>
    );
};
