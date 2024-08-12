import {
    FC, HTMLAttributeAnchorTarget, LegacyRef, memo,
} from 'react';
import cnBind from 'classnames/bind';
import { Text, TextSize } from 'shared/ui/Text/ui/Text';
import { useTranslation } from 'react-i18next';
import { List, ListRowProps, WindowScroller } from 'react-virtualized';
import { PAGE_ID } from 'widgets/Page/ui/Page';
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

        const isList = view === ArticleView.LIST;

        const itemsPerRow = isList ? 1 : 3;
        const rowCount = isList
            ? articles.length
            : Math.ceil(articles.length / itemsPerRow);

        const rowRender = ({
            index,
            isScrolling,
            key,
            style,
        }: ListRowProps) => {
            const items = [];
            const fromIndex = index * itemsPerRow;
            const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

            for (let i = fromIndex; i < toIndex; i += 1) {
                items.push(
                    <ArticleListItem
                        article={articles[i]}
                        view={view}
                        target={target}
                        key={articles[i].id}
                    />,
                );
            }

            return (
                <div key={key} style={style} className={cls.row}>
                    {items}
                </div>
            );
        };

        if (!isLoading && !articles.length) {
            return (
                <div className={cn(cls.ArticleList, [cls[view]])}>
                    <Text size={TextSize.L} title={t('Статьи не найдены')} />
                </div>
            );
        }

        return (
            <WindowScroller
                scrollElement={document.getElementById(PAGE_ID) as Element}
            >
                {({
                    height,
                    width,
                    registerChild,
                    onChildScroll,
                    isScrolling,
                    scrollTop,
                }) => (
                    <div
                        ref={
                            registerChild as
                                | LegacyRef<HTMLDivElement>
                                | undefined
                        }
                        className={cn(
                            cls.ArticleList,
                            ...classNames.map(
                                (clsName) => cls[clsName] || clsName,
                            ),
                            cls[view],
                        )}
                    >
                        <List
                            height={height ?? 700}
                            rowCount={rowCount}
                            rowHeight={isList ? 700 : 270}
                            rowRenderer={rowRender}
                            width={1000}
                            autoHeight
                            onScroll={onChildScroll}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                        />
                        {isLoading && getSkeletons(view)}
                    </div>
                )}
            </WindowScroller>
            // <div
            //     className={cn(
            //         cls.ArticleList,
            //         ...classNames.map((clsName) => cls[clsName] || clsName),
            //     )}
            // >
            //     {articles.length > 0 ? articles.map(renderArticle) : null}
            //     {isLoading && getSkeletons(view)}
            // </div>
        );
    },
);
