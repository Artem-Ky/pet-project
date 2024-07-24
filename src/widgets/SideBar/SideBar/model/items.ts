import { SVGProps, VFC } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import HomeIcon from 'shared/assets/icons/home.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticleIcon from 'shared/assets/icons/article.svg';
import { IconTypeVariant } from 'shared/ui/Icon';

export interface SideBarItemType {
    path: string;
    text: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    IconType: IconTypeVariant;
    authOnly?: boolean;
}

export const SideBarItemsList: SideBarItemType[] = [
    {
        path: RoutePath.main,
        Icon: HomeIcon,
        IconType: IconTypeVariant.FILL_NO_STOKE,
        text: 'Главная страница',
    },
    {
        path: RoutePath.articles,
        Icon: ArticleIcon,
        IconType: IconTypeVariant.STROKE_NO_FILL,
        text: 'Статьи',
        authOnly: true,
    },
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        IconType: IconTypeVariant.FILL_NO_STOKE,
        text: 'Профиль',
        authOnly: true,
    },
    {
        path: RoutePath.about,
        Icon: AboutIcon,
        IconType: IconTypeVariant.FILL_NO_STOKE,
        text: 'Страница о нас',
    },
];
