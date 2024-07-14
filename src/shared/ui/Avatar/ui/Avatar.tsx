import { FC, memo } from 'react';
import cnBind from 'classnames/bind';
import cls from './Avatar.module.scss';

export enum AvatarSize {
    SMALL_ROUND = 'small-round',
    MEDIUM_ROUND = 'medium-round',
    LARGE_ROUND = 'large-round',
    BIG_SQUARE = 'big-square',
}

interface AvatarProps {
    classNames?: string[];
    src?: string;
    alt: string;
    size?: AvatarSize;
}

export const Avatar: FC<AvatarProps> = memo((props: AvatarProps) => {
    const {
        classNames = [],
        src = 'https://avatars.githubusercontent.com/u/143946153?v=4',
        size = AvatarSize.MEDIUM_ROUND,
        alt,
    } = props;
    const cn = cnBind.bind(cls);

    return (
        <img
            className={cn(
                cls.Avatar,
                cls[size],
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
            src={src}
            alt={alt}
        />
    );
});
