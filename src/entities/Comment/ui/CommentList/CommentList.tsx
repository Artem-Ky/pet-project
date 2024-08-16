import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextTheme } from 'shared/ui/Text/ui/Text';
import cnBind from 'classnames/bind';
import { VStack } from 'shared/ui/Stack';
import cls from './CommentList.module.scss';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className = '', isLoading, comments } = props;
    const { t } = useTranslation();
    const cn = cnBind.bind(cls);

    if (isLoading) {
        if (comments?.length && comments.length < 10) {
            return (
                <VStack gap="16r" className={cn(cls[className])}>
                    {comments.map(() => (
                        <CommentCard isLoading />
                    ))}
                </VStack>
            );
        }

        return (
            <VStack fullWidth gap="16r" className={cn(cls[className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack fullWidth gap="16r" className={cn(cls[className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        isLoading={isLoading}
                        className={cls.comment}
                        comment={comment}
                        key={comment.id}
                    />
                ))
            ) : (
                <Text
                    theme={TextTheme.BLACK_WHITE}
                    text={t('Комментарии отсутствуют')}
                />
            )}
        </VStack>
    );
});
