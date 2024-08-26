import { FC, memo, useCallback } from 'react';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from 'entities/User';
import { useSelector } from 'react-redux';
import {
    DropDown,
    DropdownItem,
} from 'shared/ui/Popups/components/DropDown/ui/DropDown';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { popupsContentColor } from 'shared/ui/Popups';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from 'shared/ui/Avatar';
import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { useTranslation } from 'react-i18next';

interface AvatarDropDownProps {
    classNames?: string[];
}

export const AvatarDropDown: FC<AvatarDropDownProps> = memo(
    (props: AvatarDropDownProps) => {
        const { classNames = [] } = props;
        const { t } = useTranslation();
        const authData = useSelector(getUserAuthData);
        const dispatch = useAppDispatch();
        const isAdmin = useSelector(isUserAdmin);
        const isManager = useSelector(isUserManager);

        const isAdminPanelAvaible = isAdmin || isManager;

        const onLogOut = useCallback(() => {
            dispatch(userActions.logout());
        }, [dispatch]);

        if (!authData) {
            return null;
        }

        const optionsList: DropdownItem[] = [
            ...(isAdminPanelAvaible
                ? [
                    {
                        content: 'Админка',
                        href: RoutePath.admin_panel,
                    },
                ]
                : []),
            {
                content: 'Профиль',
                href: RoutePath.profile + authData.id,
            },
            {
                content: 'Выйти',
                contentColor: popupsContentColor.RED,
                onClick: onLogOut,
            },
        ];

        return (
            <DropDown
                classNames={classNames}
                items={optionsList}
                trigger={(
                    <Avatar
                        size={AvatarSize.MEDIUM_ROUND}
                        src={authData.avatar}
                        alt={t('Ваш аватар')}
                    />
                )}
            />
        );
    },
);
