import {
    DetailedHTMLProps, FC, HTMLAttributes, memo, ReactNode,
} from 'react';
import cnBind from 'classnames/bind';
import cls from './Flex.module.scss';

export type FlexJustify = 'start' | 'center' | 'end' | 'between';
export type Side = 'top' | 'right' | 'bottom' | 'left' | 'default';
export type FlexShrink = '0' | '0.5' | '1';
export type FlexGrow = '0' | '0.5' | '1';
export type FlexAlign = 'start' | 'center' | 'end';
export type FlexDirection = 'row' | 'column';
export type FlexWrap = 'wrap' | 'nowrap';
export type FlexGap =
    | '0'
    | '4'
    | '8'
    | '16'
    | '20'
    | '32'
    | '4r'
    | '8r'
    | '16r'
    | '20r'
    | '32r'
    | '4c'
    | '8c'
    | '16c'
    | '20c'
    | '32c';

const justifyClasses: Record<FlexJustify, string> = {
    start: cls.justifyStart,
    center: cls.justifyCenter,
    end: cls.justifyEnd,
    between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
    start: cls.alignStart,
    center: cls.alignCenter,
    end: cls.alignEnd,
};

const shrinkClasses: Record<FlexShrink, string> = {
    0: cls.shrinkNone,
    0.5: cls.shrinkMedium,
    1: cls.shrinkDefault,
};

const growClasses: Record<FlexGrow, string> = {
    0: cls.growNone,
    0.5: cls.growMedium,
    1: cls.growDefault,
};

const directionClasses: Record<FlexDirection, string> = {
    row: cls.directionRow,
    column: cls.directionColumn,
};

const wrapClasses: Record<FlexWrap, string> = {
    wrap: cls.wrap,
    nowrap: cls.noWrap,
};

const sideClasses: Record<Side, string> = {
    default: '',
    top: cls.marginAutoBottom,
    right: cls.marginAutoLeft,
    bottom: cls.marginAutoTop,
    left: cls.marginAutoRight,
};

const gapClasses: Record<FlexGap, string> = {
    0: '',
    4: cls.gap4,
    8: cls.gap8,
    16: cls.gap16,
    20: cls.gap20,
    32: cls.gap32,
    '4r': cls.gap4r,
    '8r': cls.gap8r,
    '16r': cls.gap16r,
    '20r': cls.gap20r,
    '32r': cls.gap32r,
    '4c': cls.gap4c,
    '8c': cls.gap8c,
    '16c': cls.gap16c,
    '20c': cls.gap20c,
    '32c': cls.gap32c,
};

type DivProps = DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export interface FlexProps extends DivProps {
    classNames?: string[];
    children: ReactNode;
    justify?: FlexJustify;
    align?: FlexAlign;
    direction: FlexDirection;
    gap?: FlexGap;
    wrap?: FlexWrap;
    side?: Side;
    shrink?: FlexShrink;
    grow?: FlexGrow;
    maxWidth?: boolean;
    maxHeight?: boolean;
    fullWidth?: boolean;
}

export const Flex: FC<FlexProps> = (props: FlexProps) => {
    const {
        classNames = [],
        children,
        justify = 'start',
        align = 'center',
        direction = 'row',
        gap = '0',
        wrap = 'nowrap',
        side = 'default',
        shrink = '1',
        grow = '0',
        maxWidth,
        maxHeight,
        fullWidth,
    } = props;
    const cn = cnBind.bind(cls);

    const classes = [
        justifyClasses[justify],
        alignClasses[align],
        directionClasses[direction],
        wrapClasses[wrap],
        shrinkClasses[shrink],
        growClasses[grow],
        sideClasses[side],
        gap && gapClasses[gap],
    ];

    return (
        <div
            className={cn(
                cls.Flex,
                ...classNames.map((clsName) => cls[clsName] || clsName),
                classes,
                { [cls.maxWidth]: maxWidth, [cls.maxHeight]: maxHeight, [cls.fullWidth]: fullWidth },
            )}
        >
            {children}
        </div>
    );
};
