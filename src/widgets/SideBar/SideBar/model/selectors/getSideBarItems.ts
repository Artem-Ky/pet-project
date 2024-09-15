import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import AboutIcon from '@/shared/assets/icons/about.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { IconTypeVariant } from '@/shared/ui/Icon';
import { SideBarItemType } from '../types/sidebar';
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from '@/shared/const/router';

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
    const sideBarItemsList: SideBarItemType[] = [
        {
            path: getRouteMain(),
            Icon: HomeIcon,
            IconType: IconTypeVariant.FILL_NO_STOKE,
            text: 'Главная страница',
        },
    ];

    if (userData) {
        sideBarItemsList.push(
            {
                path: getRouteArticles(),
                Icon: ArticleIcon,
                IconType: IconTypeVariant.STROKE_NO_FILL,
                text: 'Статьи',
                authOnly: true,
            },
            {
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                IconType: IconTypeVariant.FILL_NO_STOKE,
                text: 'Профиль',
                authOnly: true,
            },
        );
    }

    sideBarItemsList.push({
        path: getRouteAbout(),
        Icon: AboutIcon,
        IconType: IconTypeVariant.FILL_NO_STOKE,
        text: 'Страница о нас',
    });

    return sideBarItemsList;
});
