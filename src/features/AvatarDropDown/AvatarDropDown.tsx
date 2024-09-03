import { FC, memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from '@/entities/User';
import {
    DropDown,
    popupsContentColor,
} from '@/shared/ui/Popups';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Avatar, AvatarSize } from '@/shared/ui/Avatar';
import { VStack } from '@/shared/ui/Stack';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text';
import { RoutePath } from '@/shared/const/router';
import { DropdownItem } from '@/shared/ui/Popups/components/DropDown/ui/DropDown';

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
            <>
                <BrowserView>
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
                </BrowserView>
                <MobileView>
                    <VStack gap="4r" align="center" justify="center">
                        <DropDown
                            classNames={classNames}
                            items={optionsList}
                            trigger={(
                                <Avatar
                                    size={AvatarSize.SMALL_ROUND}
                                    src={authData.avatar}
                                    alt={t('Ваш аватар')}
                                />
                            )}
                        />
                        <Text theme={TextTheme.BLACK_WHITE} size={TextSize.S}>
                            {t('Профиль')}
                        </Text>
                    </VStack>
                </MobileView>
            </>
        );
    },
);
