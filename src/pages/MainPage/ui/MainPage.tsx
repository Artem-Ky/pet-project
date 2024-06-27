import { BugButton } from 'app/providers/ErrorBoundary';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation('mainPage');

    return (
        <>
            <div>{t('Главная страница', { ns: 'mainPage' })}</div>
            <BugButton />
        </>
    );
};

export default MainPage;
