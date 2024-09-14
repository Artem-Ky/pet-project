import { FC, memo } from 'react';
import cnBind from 'classnames/bind';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    EffectCoverflow, Pagination, Autoplay, Navigation,
} from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import cls from './Carousel.module.scss';

import { AppLink } from '../../Link';
import {
    Text, TextAlign, TextSize, TextTheme,
} from '../../Text';
import { VStack } from '../../Stack';

export interface CarouselItem {
    title?: string;
    description?: string;
    imageUrl: string;
    linkUrl?: string;
}

export enum CarouselSizeWidth {
    FullWidth = 'FullWidth',
    XXL = 'widthXXL',
    XL = 'widthXL',
    L = 'widthL',
    M = 'widthM',
    S = 'widthS',
    XS = 'widthXS',
    XXS = 'widthXXS',
}

export enum CarouselSizeHeight {
    XL = 'heightXL',
    L = 'heightL',
    M = 'heighM',
    S = 'heightS',
    XS = 'heightXS',
}

export enum CarouselVariantClick {
    AllCardIsLink = 'link',
    HasButton = 'button',
}

export enum CarouselVariantView {
    Default = 'default',
    AllOnePlate = 'onePlate',
    AllTwoPlate = 'twoPlate',
}

interface CarouselProps {
    classNames?: string[];
    data: CarouselItem[];
    widthSize?: CarouselSizeWidth;
    heightSize?: CarouselSizeHeight;
    delayAutoPlay?: number;
    isDarkEffectInclude?: boolean;
    isAutoPlay?: boolean;
    hasNavigation?: boolean;
    Variant?: CarouselVariantClick;
    VariantView?: CarouselVariantView;
}

export const Carousel: FC<CarouselProps> = memo((props: CarouselProps) => {
    const {
        classNames = [],
        data,
        widthSize = CarouselSizeWidth.FullWidth,
        heightSize = CarouselSizeHeight.XL,
        delayAutoPlay = 5000,
        isDarkEffectInclude,
        isAutoPlay,
        hasNavigation,
        Variant = CarouselVariantClick.HasButton,
        VariantView = CarouselVariantView.Default,
    } = props;
    const cn = cnBind.bind(cls);
    const { t } = useTranslation();
    const isSmallWidth = widthSize === CarouselSizeWidth.S
        || CarouselSizeWidth.XS
        || CarouselSizeWidth.XXS;

    let viewType;

    switch (VariantView) {
    case CarouselVariantView.AllOnePlate:
        viewType = {
            100: { slidesPerView: 1 },
        };
        break;

    case CarouselVariantView.AllTwoPlate:
        viewType = {
            100: { slidesPerView: 2 },
        };
        break;

    default: // CarouselVariantView.Default
        viewType = {
            100: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1560: { slidesPerView: 2 },
        };
        break;
    }

    return (
        <div
            className={cn(
                cls.Carousel,
                cls[widthSize],
                cls[heightSize],
                ...classNames.map((clsName) => cls[clsName] || clsName),
                {
                    [cls.isDark]: isDarkEffectInclude,
                    [cls.isLinks]: CarouselVariantClick.AllCardIsLink,
                    [cls.hasNavigation]: hasNavigation,
                },
            )}
        >
            <Swiper
                className={cls.myswiper}
                modules={[Pagination, EffectCoverflow, Autoplay, Navigation]}
                effect="coverflow"
                grabCursor
                centeredSlides
                mousewheel={{ invert: true }}
                navigation={hasNavigation}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 3,
                    slideShadows: true,
                }}
                loop
                pagination={{ clickable: true }}
                // autoplay={isAutoPlay ? {
                //     delay: delayAutoPlay,
                //     disableOnInteraction: false,
                // }: false}
                breakpoints={viewType}
            >
                {data.map((data) => (
                    <SwiperSlide
                        style={{ backgroundImage: `url(${data.imageUrl})` }}
                        className={cls.myswiperSlider}
                    >
                        {Variant === CarouselVariantClick.AllCardIsLink && (
                            <AppLink
                                to={data.linkUrl || ''}
                                classNames={[cls.content]}
                                fullHeight
                                fullWidth
                            >
                                <VStack
                                    justify="center"
                                    align="center"
                                    classNames={[cls.myswiperSliderLinkType]}
                                >
                                    <Text
                                        size={
                                            isSmallWidth
                                                ? TextSize.XL_TITLE
                                                : TextSize.XXL_TITLE
                                        }
                                        theme={TextTheme.WHITE}
                                        title={data.title}
                                    />
                                    <Text
                                        size={
                                            isSmallWidth
                                                ? TextSize.S_BOLD
                                                : TextSize.L_BOLD
                                        }
                                        theme={TextTheme.WHITE}
                                        text={data.description}
                                    />
                                </VStack>
                            </AppLink>
                        )}

                        {Variant === CarouselVariantClick.HasButton && (
                            <div className={cls.content}>
                                <Text
                                    size={
                                        isSmallWidth
                                            ? TextSize.XL_TITLE
                                            : TextSize.XXL_TITLE
                                    }
                                    theme={TextTheme.WHITE}
                                    title={data.title}
                                />
                                <Text
                                    size={
                                        isSmallWidth
                                            ? TextSize.S_BOLD
                                            : TextSize.L_BOLD
                                    }
                                    theme={TextTheme.WHITE}
                                    text={data.description}
                                />
                                <AppLink
                                    to={`${data.linkUrl}`}
                                    href={`${data.linkUrl}`}
                                    className={cn(cls.sliderBtn, cls.linkBtn)}
                                >
                                    <Text
                                        size={
                                            isSmallWidth
                                                ? TextSize.S_BOLD
                                                : TextSize.L_BOLD
                                        }
                                        align={TextAlign.CENTER}
                                        text={t('Перейти')}
                                        theme={TextTheme.MAIN}
                                    />
                                </AppLink>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
});
