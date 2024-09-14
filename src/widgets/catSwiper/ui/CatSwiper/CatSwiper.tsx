/* eslint-disable max-len */
import { FC, memo } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselSizeHeight,
    CarouselSizeWidth,
    CarouselVariantClick,
    CarouselVariantView,
} from '@/shared/ui/Carousel';

interface CatSwiperProps {
    classNames?: string[];
    type?: CarouselVariantView;
    width?: CarouselSizeWidth;
    hasNavigation?: boolean;
}

export const CatSwiper: FC<CatSwiperProps> = memo((props: CatSwiperProps) => {
    const {
        classNames = [],
        hasNavigation,
        width = CarouselSizeWidth.M,
        type = CarouselVariantView.Default,
    } = props;

    const slider: CarouselItem[] = [
        {
            title: 'busy cat',
            description:
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores enim illum sed, cumque at iste facilis perferendis dolor porro, voluptatibus ad officia laboriosam ratione! Maiores qui vero voluptatem nihil laudantium?',
            imageUrl:
                'https://avatars.mds.yandex.net/i?id=1ac0f8ee1aecda16b0263395b678b9ca_l-5878737-images-thumbs&n=13',
            linkUrl: '/articles',
        },
        {
            title: 'vegan cat',
            description:
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores enim illum sed, cumque at iste facilis perferendis dolor porro, voluptatibus ad officia laboriosam ratione! Maiores qui vero voluptatem nihil laudantium?',
            imageUrl:
                'https://avatars.mds.yandex.net/i?id=69cbd13e7037c117b38a3f041e24763d_l-4119220-images-thumbs&n=13',
            linkUrl: '/articles',
        },
        {
            title: 'with dad cat',
            description:
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores enim illum sed, cumque at iste facilis perferendis dolor porro, voluptatibus ad officia laboriosam ratione! Maiores qui vero voluptatem nihil laudantium?',
            imageUrl:
                'https://i.pinimg.com/736x/ed/fb/10/edfb1024f56dfd5d1328a738a043f47c.jpg',
            linkUrl: '/articles',
        },

        {
            title: 'cute cat',
            description:
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores enim illum sed, cumque at iste facilis perferendis dolor porro, voluptatibus ad officia laboriosam ratione! Maiores qui vero voluptatem nihil laudantium?',
            imageUrl:
                'https://i.pinimg.com/736x/6a/5a/48/6a5a48da8d5c1a019523f117e29220d5.jpg',
            linkUrl: '/articles',
        },
        {
            title: 'other cats',
            description:
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores enim illum sed, cumque at iste facilis perferendis dolor porro, voluptatibus ad officia laboriosam ratione! Maiores qui vero voluptatem nihil laudantium?',
            imageUrl:
                'https://i.pinimg.com/736x/5c/67/a3/5c67a355481f834dd23c40a2a9bfa702.jpg',
            linkUrl: '/articles',
        },
    ];

    return (
        <Carousel
            classNames={classNames}
            data={slider}
            isDarkEffectInclude
            Variant={CarouselVariantClick.AllCardIsLink}
            VariantView={type}
            widthSize={width}
            heightSize={CarouselSizeHeight.S}
            hasNavigation={hasNavigation}
            isAutoPlay
        />
    );
});
