import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { IconTypeVariant } from '@/shared/ui/Icon';
import { mobileNavigateItemType } from '../types/mobileNavigate';
import { getRouteAbout, getRouteArticles, getRouteMain } from '@/shared/const/router';

export const getMobileNavigateItems = createSelector(
    getUserAuthData,
    (userData) => {
        const mobileNavigateItemsList: mobileNavigateItemType[] = [
            {
                path: getRouteMain(),
                Icon: HomeIcon,
                IconType: IconTypeVariant.FILL_NO_STOKE,
                text: 'Главная страница',
            },
        ];

        if (userData) {
            mobileNavigateItemsList.push(
                {
                    path: getRouteArticles(),
                    Icon: ArticleIcon,
                    IconType: IconTypeVariant.STROKE_NO_FILL,
                    text: 'Статьи',
                    authOnly: true,
                },
            );
        }

        mobileNavigateItemsList.push({
            path: getRouteAbout(),
            Icon: AboutIcon,
            IconType: IconTypeVariant.FILL_NO_STOKE,
            text: 'Страница о нас',
        });

        return mobileNavigateItemsList;
    },
);
