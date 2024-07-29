import {
    FC, HTMLAttributes, memo, ReactNode,
} from 'react';
import cnBind from 'classnames/bind';
import cls from './Card.module.scss';

export enum CardSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

export enum CardView {
    LITTLE = 'LITTLE',
    BIG = 'BIG',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    classNames?: string[];
    children: ReactNode;
    size?: CardSize;
    view?: CardView;
    fullWidth?: boolean;
    heightAuto?: boolean;
}

export const Card: FC<CardProps> = memo((props: CardProps) => {
    const {
        classNames = [],
        children,
        size = CardSize.SMALL,
        view = CardView.LITTLE,
        fullWidth,
        heightAuto,
        ...otherProps
    } = props;
    const cn = cnBind.bind(cls);

    return (
        <div
            className={cn(
                cls.Card,
                cls[view],
                cls[size],
                {
                    [cls.fullWidth]: fullWidth,
                    [cls.heightAuto]: heightAuto,
                },
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
});
