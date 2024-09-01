import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import AboutIcon from '@/shared/assets/icons/about.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { IconTypeVariant } from '@/shared/ui/Icon';
import { mobileNavigateItemType } from '../types/mobileNavigate';

export const getMobileNavigateItems = createSelector(
    getUserAuthData,
    (userData) => {
        const mobileNavigateItemsList: mobileNavigateItemType[] = [
            {
                path: RoutePath.main,
                Icon: HomeIcon,
                IconType: IconTypeVariant.FILL_NO_STOKE,
                text: 'Главная страница',
            },
        ];

        if (userData) {
            mobileNavigateItemsList.push(
                {
                    path: RoutePath.articles,
                    Icon: ArticleIcon,
                    IconType: IconTypeVariant.STROKE_NO_FILL,
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }

        mobileNavigateItemsList.push({
            path: RoutePath.about,
            Icon: AboutIcon,
            IconType: IconTypeVariant.FILL_NO_STOKE,
            text: 'Страница о нас',
        });

        return mobileNavigateItemsList;
    },
);
