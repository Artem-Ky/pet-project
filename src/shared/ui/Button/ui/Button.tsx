/* eslint-disable react/button-has-type */
import { ButtonHTMLAttributes, FC, memo } from 'react';
import cnBind from 'classnames/bind';
import cls from './Button.module.scss';

export enum ButtonVariant {
    DEFAULT,
    CLEAR = 'clear',
    OUTLINE = 'outline',
}
export enum ButtonColor {
    NO_COLOR = 'no-color',
    WHITE = 'white',
    WHITE_DARK = 'white-dark',
    LIGHT_WHITE = 'light-white',
    ALT_WHITE_DARK_GRAY = 'select'
}
export enum ButtonOutlineColor {
    Success = 'outline-success',
    Error = 'outline-error',
    Gray = 'outline-grey',
    Gray_White = 'outline-grey-white',
    Green_White = 'outline-green-white',
}

export enum ButtonSize {
    NO_SIZE = 'no-size',
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

    //  отключить кнопку
    disabled?: boolean;
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
    const {
        children,
        classNames = [],
        variant = ButtonVariant.DEFAULT,
        type = 'button',
        fullWidth = false,
        color = ButtonColor.NO_COLOR,
        size = ButtonSize.NO_SIZE,
        outlineColor = ButtonOutlineColor.Gray_White,
        disabled,
        isSquare,
        ...otherProps
    } = props;
    const cn = cnBind.bind(cls);

    return (
        <button
            type={type}
            disabled={disabled}
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
});
