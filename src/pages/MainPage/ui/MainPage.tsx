import { BugButton } from 'app/providers/ErrorBoundary';
import { Counter } from 'entities/Counter';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const MainPage: FC = () => {
    const { t } = useTranslation('mainPage');

    return (
        <>
            <div>{t('Главная страница сайта', { ns: 'mainPage' })}</div>
            <Counter />
            <BugButton />
        </>
    );
};

export default MainPage;
