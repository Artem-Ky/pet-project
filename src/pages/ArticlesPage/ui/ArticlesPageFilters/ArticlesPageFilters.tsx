import React, {
    FC,
    LegacyRef,
    memo,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import cnBind from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { BrowserView, isMobile } from 'react-device-detect';
import {
    ArticleSortField,
    ArticleType,
    ArticleTypeTabs,
    ArticleView,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ViewSwitcher } from '@/widgets/ViewSwither';
import { Input, InputSize, InputView } from '@/shared/ui/Input';
import searchIcon from '@/shared/assets/icons/search.svg';
import {
    Icon, IconColor, IconSize, IconTypeVariant,
} from '@/shared/ui/Icon';
import { OrderSort } from '@/features/OrderSort';
import { SortOrder } from '@/shared/types';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button';
import { AppLink } from '@/shared/ui/Link';
import { HStack, VStack } from '@/shared/ui/Stack';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPageFilters.module.scss';
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { RoutePath } from '@/shared/const/router';
import { PAGE_ID } from '@/widgets/Page';

interface ArticlesPageFiltersProps {
    classNames?: string[];
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = memo(
    (props: ArticlesPageFiltersProps) => {
        const { classNames = [] } = props;
        const cn = cnBind.bind(cls);
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const view = useSelector(getArticlesPageView);
        const sort = useSelector(getArticlesPageSort);
        const order = useSelector(getArticlesPageOrder);
        const search = useSelector(getArticlesPageSearch);
        const type = useSelector(getArticlesPageType);

        const page = document.getElementById(PAGE_ID);
        const filtersRef = useRef<HTMLDivElement | null>(null);

        const fetchData = useCallback(() => {
            dispatch(fetchArticlesList({ replace: true }));
        }, [dispatch]);

        const debouncedFetchData = useDebounce(fetchData, 500);

        useEffect(() => {
            if (page && filtersRef.current) {
                let prevScrollpos = page.scrollTop;
                console.log('start ', prevScrollpos);

                page.onscroll = () => {
                    const currentScrollPos = page.scrollTop;
                    const filtersHeight = filtersRef.current!.clientHeight;

                    console.log('onScroll current pos ', currentScrollPos);
                    console.log('onScroll prev pos ', prevScrollpos);
                    console.log('onScroll filter height ', filtersHeight);

                    if (prevScrollpos > currentScrollPos) {
                        filtersRef.current!.style.top = '0';
                    } else if (currentScrollPos > filtersHeight) {
                        filtersRef.current!.style.top = `-${filtersHeight}px`;
                    }

                    prevScrollpos = currentScrollPos;
                };
            }
        }, [page]);

        const onChangeSort = useCallback(
            (newSort: ArticleSortField) => {
                dispatch(articlesPageActions.setSort(newSort));
                dispatch(articlesPageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData],
        );

        const onChangeOrder = useCallback(
            (newOrder: SortOrder) => {
                dispatch(articlesPageActions.setOrder(newOrder));
                dispatch(articlesPageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData],
        );

        const onChangeSearch = useCallback(
            (search: string) => {
                dispatch(articlesPageActions.setSearch(search));
                dispatch(articlesPageActions.setPage(1));
                debouncedFetchData();
            },
            [dispatch, debouncedFetchData],
        );

        const onChangeType = useCallback(
            (value: ArticleType) => {
                dispatch(articlesPageActions.setType(value));
                dispatch(articlesPageActions.setPage(1));
                fetchData();
            },
            [dispatch, fetchData],
        );

        const onChangeView = useCallback(
            (view: ArticleView) => {
                dispatch(articlesPageActions.setView(view));
            },
            [dispatch],
        );

        return (
            <VStack
                ref={filtersRef}
                gap={isMobile ? '10' : '32r'}
                classNames={[
                    cls.sticky,
                    cn(...classNames.map((clsName) => cls[clsName] || clsName)),
                ]}
            >
                <HStack
                    align="center"
                    gap="10"
                    justify="between"
                    fullWidth
                    wrap="wrap"
                >
                    <>
                        <Input
                            placeholder={t('Поиск')}
                            value={search}
                            onChange={onChangeSearch}
                            size={InputSize.LARGE}
                            view={InputView.ICON_MEDIUM}
                            id="search"
                            {...(isMobile
                                ? { fullWidth: true }
                                : { fullWidth: false })}
                        >
                            <Icon
                                classNames={[cls.searchIcon]}
                                variant={IconTypeVariant.STROKE_NO_FILL}
                                size={IconSize.MEDIUM}
                                color={IconColor.GRAY}
                                icon={searchIcon}
                            />
                        </Input>
                        <label className="sr-only" htmlFor="search">
                            {t('Поиск: введите текст')}
                        </label>
                    </>
                    <BrowserView>
                        <AppLink to={RoutePath.article_create}>
                            <Button
                                size={ButtonSize.LARGE}
                                variant={ButtonVariant.OUTLINE}
                            >
                                {t('Создать статью')}
                            </Button>
                        </AppLink>
                    </BrowserView>
                </HStack>
                <HStack
                    gap="10"
                    align="center"
                    justify="between"
                    fullWidth
                    wrap="wrap"
                >
                    <ArticleTypeTabs onChangeType={onChangeType} value={type} />
                    <HStack
                        align="center"
                        gap="20c"
                        wrap="wrap"
                        justify="end"
                        fullWidth
                    >
                        <OrderSort
                            order={order}
                            sort={sort}
                            onChangeOrder={onChangeOrder}
                            onChangeSort={onChangeSort}
                        />
                        <ViewSwitcher view={view} onViewClick={onChangeView} />
                    </HStack>
                </HStack>
            </VStack>
        );
    },
);
