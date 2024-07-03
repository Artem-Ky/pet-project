import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import cls from './NavBar.module.scss';

export const NavBar: FC = () => {
    const { t } = useTranslation();

    return <div className={cls.NavBar} />;
};
