import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from 'shared/ui/Text/ui/Text';
import { ArticleList } from 'entities/Article';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';

interface ArticleInfinityListProps {
    classNames?: string[];
}

export const ArticleInfinityList: FC<ArticleInfinityListProps> = memo(
    (props: ArticleInfinityListProps) => {
        const { classNames = [] } = props;

        const isLoading = useSelector(getArticlesPageIsLoading);
        const view = useSelector(getArticlesPageView);
        const articles = useSelector(getArticles.selectAll);
        const error = useSelector(getArticlesPageError);
        const { t } = useTranslation('article');

        if (error) {
            return (
                <Text
                    theme={TextTheme.ERROR}
                    text={t('Ошибка при загрузке статей')}
                />
            );
        }

        return (
            <ArticleList
                isLoading={isLoading}
                view={view}
                articles={articles}
                classNames={classNames}
            />
        );
    },
);
