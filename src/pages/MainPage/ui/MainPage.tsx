import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { FirstSectionMainPage } from './FirstSectionMainPage/FirstSectionMainPage';

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
