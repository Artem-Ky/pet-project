import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';

const AboutPage: React.FC = () => {
    const { t } = useTranslation('about');

    return <div>{t('О сайте', { ns: 'about' })}</div>;
};

export default AboutPage;
