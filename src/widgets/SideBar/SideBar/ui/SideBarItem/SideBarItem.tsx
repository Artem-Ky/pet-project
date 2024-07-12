import { memo } from 'react';
import { AppLink } from 'shared/ui/Link';
import { AppLinkTheme } from 'shared/ui/Link/ui/AppLink';
import { useTranslation } from 'react-i18next';
import cnBind from 'classnames/bind';
import cls from './SideBarItem.module.scss';
import { SideBarItemType } from '../../model/items';

interface SideBarItemProps {
    Item: SideBarItemType;
    isClose: boolean;
}

export const SideBarItem = memo(({ Item, isClose }: SideBarItemProps) => {
    const { t } = useTranslation();
    const cn = cnBind.bind(cls);
    return (
        <AppLink
            classNames={[cls.linkItem, cn({ [cls.Close]: isClose })]}
            theme={AppLinkTheme.SECONDARY}
            to={Item.path}
        >
            <Item.Icon className={cls.linkIcon} />
            <span className={cls.link}>{t(Item.text)}</span>
        </AppLink>
    );
});
