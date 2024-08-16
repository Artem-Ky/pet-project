import React, {
    FC,
    HTMLAttributeAnchorTarget,
    LegacyRef,
    memo,
    useEffect,
    useState,
} from 'react';
import cnBind from 'classnames/bind';
import { Text, TextSize } from 'shared/ui/Text/ui/Text';
import { useTranslation } from 'react-i18next';
import { PAGE_ID } from 'widgets/Page/ui/Page';
import {
    CellMeasurer,
    CellMeasurerCache,
    List,
    ListRowProps,
    WindowScroller,
} from 'react-virtualized';
import { HStack } from 'shared/ui/Stack';
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
        const [containerWidth, setContainerWidth] = useState(1000);

        const cache = new CellMeasurerCache({
            fixedWidth: true,
            defaultHeight: 786,
        });

        useEffect(() => {
            const calculateWidth = () => {
                const pageElement = document.getElementById(PAGE_ID);

                if (pageElement) {
                    let calculatedWidth = pageElement.clientWidth;

                    calculatedWidth -= 67 * 2;
                    setContainerWidth(calculatedWidth);
                }
            };

            const resizeObserver = new ResizeObserver(calculateWidth);
            const pageElement = document.getElementById(PAGE_ID);
            if (pageElement) {
                resizeObserver.observe(pageElement);
            }

            calculateWidth();

            return () => {
                resizeObserver.disconnect();
            };
        }, []);

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
        const itemWidthPlate = 214;
        const gapPlate = 20;

        const itemsPerRow = isList
            ? 1
            : Math.floor(
                (containerWidth + gapPlate) / (itemWidthPlate + gapPlate),
            );
        const rowCount = isList
            ? articles.length
            : Math.ceil(articles.length / itemsPerRow);

        const rowRenderPLATE = ({ index, key, style }: ListRowProps) => {
            const items: React.JSX.Element[] = [];
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

        const rowRenderLIST = ({
            index, key, style, parent,
        }: ListRowProps) => {
            const items: React.JSX.Element[] = [];
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
                <CellMeasurer
                    key={key}
                    cache={cache}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                >
                    {({ registerChild }) => (
                        <div
                            style={style}
                            ref={
                                registerChild as
                                    | LegacyRef<HTMLDivElement>
                                    | undefined
                            }
                        >
                            {items}
                        </div>
                    )}
                </CellMeasurer>
            );
        };

        if (!isLoading && !articles.length) {
            return (
                <HStack gap="20" className={cn([cls[view]])}>
                    <Text size={TextSize.L} title={t('Статьи не найдены')} />
                </HStack>
            );
        }

        return (
            <WindowScroller
                scrollElement={document.getElementById(PAGE_ID) as Element || window}
            >
                {({
                    height,
                    registerChild,
                    onChildScroll,
                    isScrolling,
                    scrollTop,
                }) => (
                    <HStack
                        gap="20"
                        wrap="wrap"
                        ref={
                            registerChild as
                                | LegacyRef<HTMLDivElement>
                                | undefined
                        }
                        className={cn(
                            ...classNames.map(
                                (clsName) => cls[clsName] || clsName,
                            ),
                            cls[view],
                        )}
                    >
                        <List
                            height={height ?? 720}
                            rowCount={rowCount}
                            rowHeight={
                                isList
                                    ? (index) => cache.rowHeight(index) + 30
                                    : 290
                            }
                            rowRenderer={
                                isList ? rowRenderLIST : rowRenderPLATE
                            }
                            width={containerWidth}
                            autoHeight
                            deferredMeasurementCache={
                                isList ? cache : undefined
                            }
                            onScroll={onChildScroll}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                        />
                        {isLoading && getSkeletons(view)}
                    </HStack>
                )}
            </WindowScroller>

        // original code before virtualized

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
