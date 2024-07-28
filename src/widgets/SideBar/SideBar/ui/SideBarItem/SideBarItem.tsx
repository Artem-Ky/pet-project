import { memo } from 'react';
import { AppLink } from 'shared/ui/Link';
import { AppLinkTheme } from 'shared/ui/Link/ui/AppLink';
import { useTranslation } from 'react-i18next';
import cnBind from 'classnames/bind';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/ui/Text';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { Icon } from 'shared/ui/Icon';
import cls from './SideBarItem.module.scss';
import { SideBarItemType } from '../../model/types/sidebar';

interface SideBarItemProps {
    Item: SideBarItemType;
    isClose: boolean;
    isActive: boolean;
}

export const SideBarItem = memo(
    ({ Item, isClose, isActive }: SideBarItemProps) => {
        const { t } = useTranslation();
        const cn = cnBind.bind(cls);

        const isAuth = useSelector(getUserAuthData);

        if (Item.authOnly && !isAuth) {
            return null;
        }

        return (
            <li
                className={cn(cls.item, {
                    [cls.Active]: isActive,
                    [cls.CloseItem]: isClose,
                })}
            >
                <AppLink
                    classNames={[
                        cn(cls.linkItem, {
                            [cls.Close]: isClose,
                            [cls.CloseItem]: isClose,
                        }),
                    ]}
                    theme={AppLinkTheme.WHITE}
                    to={Item.path}
                >
                    <Icon icon={Item.Icon} variant={Item.IconType} classNames={[cls.linkIcon]} />
                    <Text
                        size={TextSize.L}
                        theme={TextTheme.WHITE}
                        text={t(Item.text)}
                        className={cls.link}
                    />
                </AppLink>
            </li>
        );
    },
);
