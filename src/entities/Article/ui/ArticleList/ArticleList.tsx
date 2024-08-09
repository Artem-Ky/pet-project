import { FC, HTMLAttributeAnchorTarget, memo } from 'react';
import cnBind from 'classnames/bind';
import { Text, TextSize } from 'shared/ui/Text/ui/Text';
import { useTranslation } from 'react-i18next';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';

interface ArticleListProps {
    classNames?: string[];
    articles: Article[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleList: FC<ArticleListProps> = memo(
    (props: ArticleListProps) => {
        const {
            classNames = [],
            articles,
            isLoading,
            view = ArticleView.PLATE,
            target,
        } = props;
        const cn = cnBind.bind(cls);
        const { t } = useTranslation();

        const getSkeletons = (view: ArticleView) => new Array(view === ArticleView.PLATE ? 9 : 3)
            .fill(0)
            .map((item, index) => (
                <ArticleListItemSkeleton
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    view={view}
                />
            ));

        const renderArticle = (article: Article) => (
            <ArticleListItem key={article.id} article={article} view={view} target={target} />
        );

        if (!isLoading && !articles.length) {
            console.log(isLoading);
            console.log(articles);
            return (
                <div className={cn(cls.ArticleList, [cls[view]])}>
                    <Text size={TextSize.L} title={t('Статьи не найдены')} />
                </div>
            );
        }

        return (
            <div
                className={cn(
                    cls.ArticleList,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                {articles.length > 0 ? articles.map(renderArticle) : null}
                {isLoading && getSkeletons(view)}
            </div>
        );
    },
);
