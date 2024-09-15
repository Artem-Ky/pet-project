import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AboutPage: React.FC = memo(() => {
    const { t } = useTranslation('about');

    return <Page data-testid="AboutPage">{t('О сайте', { ns: 'about' })}</Page>;
});

export default AboutPage;
