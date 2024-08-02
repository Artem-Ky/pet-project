import { BugButton } from 'app/providers/ErrorBoundary';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';

const MainPage: FC = memo(() => {
    const { t } = useTranslation('mainPage');

    return (
        <Page>
            {t('Главная страница сайта', { ns: 'mainPage' })}
            <BugButton />
        </Page>
    );
});

export default MainPage;
