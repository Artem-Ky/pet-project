import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails, ArticleList } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/ui/Text';
import { CommentList } from 'entities/Comment';
import cnBind from 'classnames/bind';
import { useSelector } from 'react-redux';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Page } from 'widgets/Page';
import { articleDetailsPageReducer } from '../../model/slices';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/getRecommendation';
import {
    articleDetailsPageRecommendationsReducer,
    getArticleRecommendations,
} from '../../model/slices/articleDetailsPageRecommendationsSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../model/selectors/getComments';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';

interface ArticleDetailsPageProps {
    classNames?: string[];
}

const reducersList: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
    articleDetailsRecommendations: articleDetailsPageRecommendationsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { classNames = [] } = props;
    const { t } = useTranslation('article-details');
    let { id } = useParams<{ id: string }>();
    const cn = cnBind.bind(cls);
    const dispatch = useAppDispatch();

    const recommendations = useSelector(getArticleRecommendations.selectAll);

    const comments = useSelector(getArticleComments.selectAll);
    const recommendationsLoading = useSelector(
        getArticleRecommendationsIsLoading,
    );
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    const onSendCommnet = useCallback(
        (comment: string) => {
            dispatch(addCommentForArticle(comment));
        },
        [dispatch],
    );

    useInitialEffect(() => {
        dispatch(fetchArticleRecommendations());
        dispatch(fetchCommentsByArticleId(id));
    });

    if (__PROJECT__ === 'storybook') {
        id = '1';
    }

    if (!id) {
        return <div>{t('Статья не найдена')}</div>;
    }

    return (
        <DynamicModuleLoader reducers={reducersList} removeAfterUnmount>
            <Page
                classNames={[
                    cn(
                        cls.ArticleDetailsPage,
                        ...classNames.map((clsName) => cls[clsName] || clsName),
                    ),
                ]}
            >
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <>
                    <Text
                        size={TextSize.XXL_TITLE}
                        theme={TextTheme.BLACK_WHITE}
                        title={t('Рекомендуем')}
                    />
                    <ArticleList
                        target="_blank"
                        articles={recommendations}
                        isLoading={recommendationsLoading}
                        classNames={[cls.recommendation]}
                    />
                    <Text
                        size={TextSize.XXL_TITLE}
                        theme={TextTheme.BLACK_WHITE}
                        title={t('Комментарии')}
                    />
                    <AddCommentForm onSendComment={onSendCommnet} />
                    <CommentList
                        isLoading={commentsIsLoading}
                        comments={comments}
                    />
                </>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
