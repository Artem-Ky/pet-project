import { FC, memo } from 'react';
import cnBind from 'classnames/bind';
import cls from './Avatar.module.scss';
import { AppImage } from '../../AppImage/AppImage';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { Icon, IconColor } from '../../Icon';
import { Skeleton } from '../../Skeleton';

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

    const errorFallBack = (
        <Icon
            classNames={[cn(
                cls.Avatar,
                cls[size],
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )]}
            icon={ProfileIcon}
            color={IconColor.BLACK_WHITE}
        />
    );
    const loadingFallBack = (
        <Skeleton
            className={cn(
                cls.Avatar,
                cls[size],
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        />
    );

    return (
        <AppImage
            errorFallback={errorFallBack}
            fallback={loadingFallBack}
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
