import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { FirstSectionMainPage } from './FirstSectionMainPage/FirstSectionMainPage';

const MainPage: FC = memo(() => {
    const { t } = useTranslation('mainPage');

    return (
        <Page data-testid="MainPage">
            <FirstSectionMainPage />
        </Page>
    );
});

export default MainPage;
