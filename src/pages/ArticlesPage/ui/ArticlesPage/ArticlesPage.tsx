import { useTranslation } from 'react-i18next';
import { FC, memo } from 'react';

const ArticlesPage: FC = () => {
    const { t } = useTranslation('article');

    return <div>{t('ARTICLES PAGE', { ns: 'article' })}</div>;
};

export default memo(ArticlesPage);
