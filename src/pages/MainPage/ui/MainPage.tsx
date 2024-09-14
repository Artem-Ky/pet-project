import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Page } from '@/widgets/Page';
import { FirstSectionMainPage } from './FirstSectionMainPage/FirstSectionMainPage';
import { Text, TextH, TextSize } from '@/shared/ui/Text';

const MainPage: FC = memo(() => {
    const { t } = useTranslation('mainPage');

    return (
        <Page>
            {/* <Text title={t('Главная страница сайта', { ns: 'mainPage' })} H={TextH.H1} size={TextSize.XXL_TITLE}/> */}
            <FirstSectionMainPage />
        </Page>
    );
});

export default MainPage;
