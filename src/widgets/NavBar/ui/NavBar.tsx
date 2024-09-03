import { useTranslation } from 'react-i18next';
import {
    FC, memo, useCallback, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { ButtonVariant } from '@/shared/ui/Button/ui/Button';
import { LoginModal } from '@/features/AuthByUsername';
import { ThemeSwitcher } from '@/widgets/ThemeSwither';
import { getUserAuthData } from '@/entities/User';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropDown } from '@/features/AvatarDropDown';
import cls from './NavBar.module.scss';
import { LangSwitcher } from '@/widgets/LangSwitcher';

export const NavBar: FC = memo(() => {
    const { t } = useTranslation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onCloseModal = useCallback(() => {
        setIsAuthModalOpen(false);
    }, []);

    const onOpenModal = useCallback(() => {
        setIsAuthModalOpen(true);
    }, []);

    if (authData) {
        return (
            <header className={cls.NavBar}>
                <HStack gap="20c" justify="end" align="center" fullHeight>
                    <LangSwitcher />
                    <ThemeSwitcher />
                    <NotificationButton />
                    <AvatarDropDown />
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
