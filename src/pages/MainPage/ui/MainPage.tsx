import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';

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
