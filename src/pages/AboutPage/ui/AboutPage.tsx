import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage: React.FC = memo(() => {
    const { t } = useTranslation('about');

    return <div>{t('О сайте', { ns: 'about' })}</div>;
});

export default AboutPage;
