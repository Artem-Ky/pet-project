import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage: FC = () => {
    const { t } = useTranslation();

    return <div className={cls.NotFoundPage}>{t('Страница не найдена')}</div>;
};
