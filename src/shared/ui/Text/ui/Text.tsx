import { memo, ReactNode } from 'react';
import cnBind from 'classnames/bind';
import cls from './Text.module.scss';

export enum TextTheme {
    MAIN = 'primary',
    BLACK_WHITE = 'black-white',
    WHITE = 'white',
    WHITE_GRAY = 'white-gray',
    GRAY = 'gray',
    GRAY_LIGHT = 'gray-light',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum TextSize {
    S = 'size_s',
    S_BOLD = 'size_s_bold',
    M = 'size_m',
    M_BOLD = 'size_m_bold',
    L = 'size_l',
    L_BOLD = 'size_l_bold',
    XL_TITLE = 'size_xl_title',
    XXL_TITLE = 'size_xxl_title',
}

export enum TextH {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    label?: string;
    labelId?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    widthAuto?: boolean;
    children?: ReactNode;
    H?: TextH;

    'data-testid'?: string;
}

export const Text = memo((props: TextProps) => {
    const cn = cnBind.bind(cls);
    const {
        className,
        text,
        title,
        label,
        labelId,
        theme = TextTheme.BLACK_WHITE,
        align = TextAlign.LEFT,
        size = TextSize.M,
        widthAuto,
        children,
        H = TextH.H3,
        'data-testid': dataTestId = 'Text',
    } = props;

    return (
        <>
            {title && (
                <H
                    className={cn(
                        cls.title,
                        {
                            [cls.widthAuto]: widthAuto,
                            [cls[theme]]: true,
                            [cls[align]]: true,
                            [cls[size]]: true,
                        },
                        [className],
                    )}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </H>
            )}
            {text && (
                <p
                    className={cn(
                        cls.text,
                        cls[size],
                        cls[theme],
                        cls[align],
                        {
                            [cls.widthAuto]: widthAuto,
                        },
                        [className],
                    )}
                    data-testid={`${dataTestId}.Paragraph`}
                >
                    {text}
                </p>
            )}
            {label && (
                <label
                    className={cn(
                        cls.text,
                        {
                            [cls.widthAuto]: widthAuto,
                            [cls[theme]]: true,
                            [cls[align]]: true,
                            [cls[size]]: true,
                        },
                        [className],
                    )}
                    htmlFor={labelId}
                    data-testid={`${dataTestId}.Label`}
                >
                    {label}
                </label>
            )}
            {children && (
                <div
                    className={cn(
                        cls.text,
                        {
                            [cls.widthAuto]: widthAuto,
                            [cls[theme]]: true,
                            [cls[align]]: true,
                            [cls[size]]: true,
                        },
                        [className],
                    )}
                    data-testid={`${dataTestId}.Children`}
                >
                    {children}
                </div>
            )}
        </>
    );
});
