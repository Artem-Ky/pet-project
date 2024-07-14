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
import { getUserAuthData, userActions } from 'entities/User';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    Select, SelectItemType, SelectOpenSide, SelectOption, SelectType,
} from 'shared/ui/Select';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { getProfileAvatar } from 'entities/Profile';
import { Avatar } from 'shared/ui/Avatar';
import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { TextTheme } from 'shared/ui/Text/ui/Text';
import cls from './NavBar.module.scss';

export const NavBar: FC = memo(() => {
    const { t } = useTranslation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const avatar = useSelector(getProfileAvatar);

    const onCloseModal = useCallback(() => {
        setIsAuthModalOpen(false);
    }, []);

    const onOpenModal = useCallback(() => {
        setIsAuthModalOpen(true);
    }, []);

    const onLogOut = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const optionsList: SelectOption[] = [
        { label: 'Админка', type: SelectItemType.LINK, to: '/admin' },
        { label: 'Профиль', type: SelectItemType.LINK, to: RoutePath.profile },
        {
            label: 'Выйти',
            type: SelectItemType.BUTTON,
            onClick: onLogOut,
            textTheme: TextTheme.ERROR,
        },
    ];

    if (authData) {
        return (
            <div className={cls.NavBar}>
                <Select
                    type={SelectType.ICON}
                    optionsList={optionsList}
                    openSide={SelectOpenSide.CENTER}
                >
                    <Avatar
                        size={AvatarSize.MEDIUM_ROUND}
                        src={avatar}
                        alt={t('Ваш аватар')}
                    />
                </Select>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        );
    }

    return (
        <div className={cls.NavBar}>
            <Button variant={ButtonVariant.CLEAR} onClick={onOpenModal}>
                {t('Войти')}
            </Button>
            <ThemeSwitcher />
            <LangSwitcher />
            {isAuthModalOpen && (
                <LoginModal isOpen={isAuthModalOpen} onClose={onCloseModal} />
            )}
        </div>
    );
});
