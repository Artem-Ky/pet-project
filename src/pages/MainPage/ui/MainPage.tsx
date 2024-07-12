import { BugButton } from 'app/providers/ErrorBoundary';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage: FC = memo(() => {
    const { t } = useTranslation('mainPage');

    return (
        <>
            <div>{t('Главная страница сайта', { ns: 'mainPage' })}</div>
            <BugButton />
        </>
    );
});

export default MainPage;
