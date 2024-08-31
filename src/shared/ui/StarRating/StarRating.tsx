import { FC, memo, useState } from 'react';
import cnBind from 'classnames/bind';
import cls from './StarRating.module.scss';
import { Icon, IconColor, IconTypeVariant } from '../Icon';
import starIcon from '@/shared/assets/icons/star.svg';

interface StarRatingProps {
    classNames?: string[];
    onSelect?: (starCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating: FC<StarRatingProps> = memo(
    (props: StarRatingProps) => {
        const {
            classNames = [],
            onSelect,
            size = 30,
            selectedStars = 0,
        } = props;
        const cn = cnBind.bind(cls);
        const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
        const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

        const onHover = (starsCount: number) => () => {
            if (!isSelected) {
                setCurrentStarsCount(starsCount);
            }
        };

        const onLeave = () => {
            if (!isSelected) {
                setCurrentStarsCount(0);
            }
        };

        const onClick = (starsCount: number) => () => {
            if (!isSelected) {
                onSelect?.(starsCount);
                setCurrentStarsCount(starsCount);
                setIsSelected(true);
            }
        };

        return (
            <div
                className={cn(
                    cls.StarRating,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                {stars.map((starNumber) => (
                    <Icon
                        classNames={[
                            cn(cls.starIcon, {
                                [cls.hovered]: currentStarsCount >= starNumber,
                                [cls.selected]: isSelected,
                            }),
                        ]}
                        icon={starIcon}
                        variant={IconTypeVariant.STROKE_NO_FILL}
                        key={starNumber}
                        color={IconColor.BLACK_WHITE}
                        width={size}
                        height={size}
                        onMouseLeave={onLeave}
                        onMouseEnter={onHover(starNumber)}
                        onClick={onClick(starNumber)}
                    />
                ))}
            </div>
        );
    },
);
