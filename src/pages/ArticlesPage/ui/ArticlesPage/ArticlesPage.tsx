import {
    FC, memo, useCallback,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import cnBind from 'classnames/bind';
import { isMobile } from 'react-device-detect';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import cls from './ArticlePage.module.scss';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticleInfinityList } from '../ArticleInfinityList/ArticleInfinityList';

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage: FC = () => {
    const cn = cnBind.bind(cls);
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadNextPart}
                classNames={[cn([cls.ArticlePage], { [cls.mobile]: isMobile })]}
            >
                <ArticlesPageFilters />
                <ArticleInfinityList />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
