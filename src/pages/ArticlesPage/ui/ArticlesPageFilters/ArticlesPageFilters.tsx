import { FC, memo, useCallback } from 'react';
import cnBind from 'classnames/bind';
import {
    ArticleSortField,
    ArticleType,
    ArticleTypeTabs,
    ArticleView,
} from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { ViewSwitcher } from 'widgets/ViewSwither/ui/ViewSwitcher';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import { InputSize, InputView } from 'shared/ui/Input/ui/Input';
import searchIcon from 'shared/assets/icons/search.svg';
import {
    Icon, IconColor, IconSize, IconTypeVariant,
} from 'shared/ui/Icon';
import { OrderSort } from 'features/OrderSort';
import { SortOrder } from 'shared/types';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { Button } from 'shared/ui/Button';
import {
    ButtonOutlineColor,
    ButtonSize,
    ButtonVariant,
} from 'shared/ui/Button/ui/Button';
import { AppLink } from 'shared/ui/Link';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
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

        const fetchData = useCallback(() => {
            dispatch(fetchArticlesList({ replace: true }));
        }, [dispatch]);

        const debouncedFetchData = useDebounce(fetchData, 500);

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
            <div
                className={cn(
                    cls.ArticlesPageFilters,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                <div className={cls.selectFilters}>
                    <div>
                        <Input
                            classNames={[cls.searchIconContainer]}
                            placeholder={t('Поиск')}
                            value={search}
                            onChange={onChangeSearch}
                            size={InputSize.LARGE}
                            view={InputView.ICON_MEDIUM}
                            id="search"
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
                    </div>
                    <AppLink to={RoutePath.article_create}>
                        <Button
                            size={ButtonSize.LARGE}
                            variant={ButtonVariant.OUTLINE}
                        >
                            {t('Создать статью')}
                        </Button>
                    </AppLink>
                </div>
                <div className={cls.selectFilters}>
                    <ArticleTypeTabs onChangeType={onChangeType} value={type} />
                    <div className={cls.otherSort}>
                        <OrderSort
                            order={order}
                            sort={sort}
                            onChangeOrder={onChangeOrder}
                            onChangeSort={onChangeSort}
                        />
                        <ViewSwitcher view={view} onViewClick={onChangeView} />
                    </div>
                </div>
            </div>
        );
    },
);
