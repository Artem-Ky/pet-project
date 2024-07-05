/* eslint-disable i18next/no-literal-string */
import { useTranslation } from 'react-i18next';
import { FC, useCallback, useState } from 'react';
import { Modal } from 'shared/ui/Modal';
import { Button } from 'shared/ui/Button';
import { ButtonVariant } from 'shared/ui/Button/ui/Button';
import cls from './NavBar.module.scss';

export const NavBar: FC = () => {
    const { t } = useTranslation();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const toggleAuthModalHandler = useCallback(() => {
        setIsAuthModalOpen((prev) => !prev);
    }, []);

    return (
        <div className={cls.NavBar}>
            <Button
                variant={ButtonVariant.CLEAR}
                onClick={toggleAuthModalHandler}
            >
                {t('Войти')}
            </Button>
            <Modal isOpen={isAuthModalOpen} onClose={toggleAuthModalHandler}>
                content warning content warning content warning content warning
                content warning content warning content warning content warning
                content warning content warning content warning content warning
            </Modal>
        </div>
    );
};
