import { useTranslation } from 'react-i18next';
import { FC, useCallback, useState } from 'react';
import { Button } from 'shared/ui/Button';
import { ButtonVariant } from 'shared/ui/Button/ui/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { useAppDispatch } from 'app/providers/StoreProvider';
import cls from './NavBar.module.scss';

export const NavBar: FC = () => {
    const { t } = useTranslation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

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
        return (
            <div className={cls.NavBar}>
                <Button variant={ButtonVariant.CLEAR} onClick={onLogOut}>
                    {t('Выйти')}
                </Button>
            </div>
        );
    }

    return (
        <div className={cls.NavBar}>
            <Button variant={ButtonVariant.CLEAR} onClick={onOpenModal}>
                {t('Войти')}
            </Button>
            <LoginModal isOpen={isAuthModalOpen} onClose={onCloseModal} />
        </div>
    );
};
