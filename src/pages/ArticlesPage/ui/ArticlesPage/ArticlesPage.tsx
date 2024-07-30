/* eslint-disable max-len */
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
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from '../../model/slices/articlesPageSlice';
import cls from './ArticlePage.module.scss';

const ArticlesPage: FC = () => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);
    const articles = useSelector(getArticles.selectAll);

    useInitialEffect(() => {
        dispatch(fetchArticlesList());
        dispatch(articlesPageActions.initState());
    });

    const reducers: ReducersList = {
        articlesPage: articlesPageReducer,
    };

    const onChangeView = useCallback(
        (newView: ArticleView) => {
            dispatch(articlesPageActions.setView(newView));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={cls.ArticlePage}>
                <ViewSwitcher view={view} onViewClick={onChangeView} />
                <ArticleList
                    articles={articles}
                    view={view}
                    isLoading={isLoading}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
