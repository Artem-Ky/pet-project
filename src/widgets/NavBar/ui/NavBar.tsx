import { useTranslation } from 'react-i18next';
import {
    FC, memo, useCallback, useState,
} from 'react';
import { Button } from 'shared/ui/Button';
import { ButtonVariant } from 'shared/ui/Button/ui/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { ThemeSwitcher } from 'widgets/ThemeSwither';
import { LangSwitcher } from 'widgets/LangSwitcher/ui/LangSwitcher';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Avatar } from 'shared/ui/Avatar';
import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { HStack } from 'shared/ui/Stack';
import {
    DropDown,
    dropDownContentColor,
    DropdownItem,
} from 'shared/ui/DropDown/ui/DropDown';
import cls from './NavBar.module.scss';

export const NavBar: FC = memo(() => {
    const { t } = useTranslation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const isAdminPanelAvaible = isAdmin || isManager;

    const onCloseModal = useCallback(() => {
        setIsAuthModalOpen(false);
    }, []);

    const onOpenModal = useCallback(() => {
        setIsAuthModalOpen(true);
    }, []);

    const onLogOut = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
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
                contentColor: dropDownContentColor.RED,
                onClick: onLogOut,
            },
        ];

        return (
            <header className={cls.NavBar}>
                <HStack gap="20c" justify="end" fullHeight>
                    <LangSwitcher />
                    <ThemeSwitcher />
                    <DropDown
                        items={optionsList}
                        trigger={(
                            <Avatar
                                size={AvatarSize.MEDIUM_ROUND}
                                src={authData.avatar}
                                alt={t('Ваш аватар')}
                            />
                        )}
                    />
                </HStack>
            </header>
        );
    }

    return (
        <header className={cls.NavBar}>
            <HStack gap="20c" justify="end" fullHeight>
                <LangSwitcher />
                {isAuthModalOpen && (
                    <LoginModal
                        isOpen={isAuthModalOpen}
                        onClose={onCloseModal}
                    />
                )}
                <ThemeSwitcher />

                <Button variant={ButtonVariant.CLEAR} onClick={onOpenModal}>
                    {t('Войти')}
                </Button>
            </HStack>
        </header>
    );
});
