import { useTranslation } from 'react-i18next';
import { FC, memo, useCallback } from 'react';
import { ArticleList, ArticleView } from 'entities/Article';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useSelector } from 'react-redux';
import { ViewSwitcher } from 'widgets/ViewSwither/ui/ViewSwitcher';
import { Page } from 'widgets/Page';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
    getArticlesPageInited,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from '../../model/slices/articlesPageSlice';
import cls from './ArticlePage.module.scss';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage: FC = () => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const articles = useSelector(getArticles.selectAll);
    const inited = useSelector(getArticlesPageInited);

    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageActions.setView(view));
        },
        [dispatch],
    );

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        if (!inited) {
            dispatch(initArticlesPage());
        }
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPart} classNames={[cls.ArticlePage]}>
                <ViewSwitcher view={view} onViewClick={onChangeView} />
                <ArticleList
                    articles={articles}
                    view={view}
                    isLoading={isLoading}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
