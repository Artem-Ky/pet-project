/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { FC, useState } from 'react';
import { Button } from 'shared/ui/Button';
import { ButtonVariant } from 'shared/ui/Button/ui/Button';
import { LoginModal } from 'features/AuthByUsername';
import cls from './NavBar.module.scss';

export const NavBar: FC = () => {
    const { t } = useTranslation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const onCloseModal = () => {
        setIsAuthModalOpen(false);
    };

    const onOpenModal = () => {
        setIsAuthModalOpen(true);
    };

    return (
        <div className={cls.NavBar}>
            <Button
                variant={ButtonVariant.CLEAR}
                onClick={onOpenModal}
            >
                {t('Войти')}
            </Button>
            <LoginModal
                isOpen={isAuthModalOpen}
                onClose={onCloseModal}
            />
        </div>
    );
};
