import { useTranslation } from 'react-i18next';
import { FC, memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
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
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsPageProps {
    classNames?: string[];
}

const reducersList: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { classNames = [] } = props;
    const { t } = useTranslation('article-details');
    let { id } = useParams<{ id: string }>();
    const cn = cnBind.bind(cls);
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();

    const onSendCommnet = useCallback(
        (comment: string) => {
            dispatch(addCommentForArticle(comment));
        },
        [dispatch],
    );

    useInitialEffect(() => {
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
            <div
                className={cn(
                    cls.ArticleDetailsPage,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                <ArticleDetails id={id} />
                {!commentsIsLoading && (
                    <>
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
                )}
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
