import { memo } from 'react';
import { AppLink } from 'shared/ui/Link';
import { AppLinkTheme } from 'shared/ui/Link/ui/AppLink';
import { useTranslation } from 'react-i18next';
import cnBind from 'classnames/bind';
import { Text, TextSize } from 'shared/ui/Text/ui/Text';
import cls from './SideBarItem.module.scss';
import { SideBarItemType } from '../../model/items';

interface SideBarItemProps {
    Item: SideBarItemType;
    isClose: boolean;
    isActive: boolean;
}

export const SideBarItem = memo(
    ({ Item, isClose, isActive }: SideBarItemProps) => {
        const { t } = useTranslation();
        const cn = cnBind.bind(cls);
        return (
            <li
                className={cn(cls.item, {
                    [cls.Active]: isActive,
                    [cls.CloseItem]: isClose,
                })}
            >
                <AppLink
                    classNames={[cn(cls.linkItem, { [cls.Close]: isClose, [cls.CloseItem]: isClose })]}
                    theme={AppLinkTheme.WHITE}
                    to={Item.path}
                >
                    <Item.Icon className={cls.linkIcon} />
                    <Text
                        size={TextSize.L}
                        text={t(Item.text)}
                        className={cls.link}
                    />
                </AppLink>
            </li>
        );
    },
);
