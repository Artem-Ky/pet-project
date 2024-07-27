import { memo } from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar';
import { AvatarSize } from 'shared/ui/Avatar/ui/Avatar';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/ui/Text';
import cnBind from 'classnames/bind';
import { AppLink } from 'shared/ui/Link';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import cls from './CommentCard.module.scss';
import { Comment } from '../../model/types/comment';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className = '', comment, isLoading } = props;
    const cn = cnBind.bind(cls);

    if (isLoading) {
        return (
            <div className={cn(cls.CommentCard)}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        height={16}
                        width={100}
                        className={cls.username}
                    />
                </div>
                <Skeleton className={cls.text} width="100%" height={50} />
            </div>
        );
    }

    if (!comment) {
        return null;
    }

    return (
        <div className={cn(cls.CommentCard, cls[className])}>
            <AppLink
                to={RoutePath.profile + comment.user.id}
                classNames={[cls.header]}
            >
                {comment.user.avatar ? (
                    <Avatar
                        alt="user comment"
                        size={AvatarSize.LARGE_ROUND}
                        src={comment.user.avatar}
                    />
                ) : null}
                <Text
                    className={cls.username}
                    size={TextSize.XL_TITLE}
                    theme={TextTheme.BLACK_WHITE}
                    title={comment.user.username}
                />
            </AppLink>
            <Text
                className={cls.text}
                size={TextSize.L}
                theme={TextTheme.BLACK_WHITE}
                text={comment.text}
            />
        </div>
    );
});
