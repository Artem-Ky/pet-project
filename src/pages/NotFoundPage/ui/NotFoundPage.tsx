import { useTranslation } from 'react-i18next';
import cls from './NotFoundPage.module.scss';
import { FC } from 'react';

export const NotFoundPage: FC = () => {
    const { t } = useTranslation();

    return <div className={cls.NotFoundPage}>{t('Страница не найдена')}</div>;
};
