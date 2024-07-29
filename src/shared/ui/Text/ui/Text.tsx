import { memo } from 'react';
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

    'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h5',
    [TextSize.S_BOLD]: 'h5',
    [TextSize.M]: 'h4',
    [TextSize.M_BOLD]: 'h4',
    [TextSize.L]: 'h3',
    [TextSize.L_BOLD]: 'h3',
    [TextSize.XL_TITLE]: 'h2',
    [TextSize.XXL_TITLE]: 'h1',
};

export const Text = memo((props: TextProps) => {
    const cn = cnBind.bind(cls);
    const {
        className,
        text,
        title,
        label,
        labelId,
        theme = TextTheme.MAIN,
        align = TextAlign.LEFT,
        size = TextSize.M,
        widthAuto,
        'data-testid': dataTestId = 'Text',
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    return (
        <div
            className={cn(
                cls.Text,
                {
                    [cls.widthAuto]: widthAuto,
                    [cls[theme]]: true,
                    [cls[align]]: true,
                    [cls[size]]: true,
                },
                [className],
            )}
        >
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}
            {text && (
                <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
                    {text}
                </p>
            )}
            {label && (
                <label
                    className={cls.text}
                    htmlFor={labelId}
                    data-testid={`${dataTestId}.Label`}
                >
                    {label}
                </label>
            )}
        </div>
    );
});
