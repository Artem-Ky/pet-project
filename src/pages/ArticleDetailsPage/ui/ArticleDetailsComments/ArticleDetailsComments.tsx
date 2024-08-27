import {
    FC, memo, Suspense, useCallback,
} from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text/ui/Text';
import { AddCommentForm } from '@/features/AddCommentForm';
import { CommentList } from '@/entities/Comment';
import { VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader/Loader';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { getArticleCommentsIsLoading } from '../../model/selectors/getComments';

interface ArticleDetailsCommentsProps {
    classNames?: string[];
    id?: string;
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = memo(
    (props: ArticleDetailsCommentsProps) => {
        const { classNames = [], id } = props;
        const { t } = useTranslation('article-details');

        const dispatch = useAppDispatch();

        const comments = useSelector(getArticleComments.selectAll);
        const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

        const onSendComment = useCallback(
            (comment: string) => {
                dispatch(addCommentForArticle(comment));
            },
            [dispatch],
        );

        useInitialEffect(() => {
            dispatch(fetchCommentsByArticleId(id));
        });

        return (
            <VStack
                gap="8r"
                fullWidth
                className={cn(...classNames.map((clsName) => clsName))}
            >
                <Text
                    size={TextSize.XXL_TITLE}
                    theme={TextTheme.BLACK_WHITE}
                    title={t('Комментарии')}
                />
                <Suspense fallback={<Loader />}>
                    <AddCommentForm onSendComment={onSendComment} />
                </Suspense>
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </VStack>
        );
    },
);
