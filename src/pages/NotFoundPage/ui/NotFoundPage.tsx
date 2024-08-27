import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';
import { Page } from '@/widgets/Page';
import cls from './NotFoundPage.module.scss';

export const NotFoundPage: FC = memo(() => {
    const { t } = useTranslation();

    return <Page classNames={[cls.NotFoundPage]}>{t('Страница не найдена')}</Page>;
});
