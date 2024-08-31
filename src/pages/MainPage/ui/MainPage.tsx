import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Page } from '@/widgets/Page';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Rating } from '@/entities/Rating';

const MainPage: FC = memo(() => {
    const { t } = useTranslation('mainPage');

    return (
        <Page>
            {t('Главная страница сайта', { ns: 'mainPage' })}
            <BugButton />
            <Rating title="1" feedbackTitle="2" hasFeedback />
        </Page>
    );
});

export default MainPage;
