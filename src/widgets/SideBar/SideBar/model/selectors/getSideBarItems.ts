import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import HomeIcon from 'shared/assets/icons/home.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';
import { IconTypeVariant } from 'shared/ui/Icon';
import { SideBarItemType } from '../types/sidebar';

export const getSideBarItems = createSelector(getUserAuthData, (userData) => {
    const sideBarItemsList: SideBarItemType[] = [
        {
            path: RoutePath.main,
            Icon: HomeIcon,
            IconType: IconTypeVariant.FILL_NO_STOKE,
            text: 'Главная страница',
        },
    ];

    if (userData) {
        sideBarItemsList.push(
            {
                path: RoutePath.articles,
                Icon: ArticleIcon,
                IconType: IconTypeVariant.STROKE_NO_FILL,
                text: 'Статьи',
                authOnly: true,
            },
            {
                path: RoutePath.profile + userData.id,
                Icon: ProfileIcon,
                IconType: IconTypeVariant.FILL_NO_STOKE,
                text: 'Профиль',
                authOnly: true,
            },
        );
    }

    sideBarItemsList.push(
        {
            path: RoutePath.about,
            Icon: AboutIcon,
            IconType: IconTypeVariant.FILL_NO_STOKE,
            text: 'Страница о нас',
        },
    );

    return sideBarItemsList;
});
