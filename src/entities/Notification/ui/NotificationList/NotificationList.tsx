import { FC, memo } from 'react';
import cnBind from 'classnames/bind';
import { VStack } from 'shared/ui/Stack';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { useNotifications } from '../../api/NotificationAPI';
import cls from './NotificationList.module.scss';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    classNames?: string[];
}

export const NotificationList: FC<NotificationListProps> = memo(
    (props: NotificationListProps) => {
        const { classNames = [] } = props;
        const cn = cnBind.bind(cls);
        const { data: notifications, isLoading } = useNotifications(null, {
            pollingInterval: 10000,
        });

        if (isLoading) {
            return (
                <VStack
                    gap="16r"
                    fullWidth
                    classNames={[
                        cn(
                            cls.NotificationList,
                            ...classNames.map(
                                (clsName) => cls[clsName] || clsName,
                            ),
                        ),
                    ]}
                >
                    <Skeleton width="320px" height="80px" />
                    <Skeleton width="320px" height="80px" />
                    <Skeleton width="320px" height="80px" />
                </VStack>
            );
        }

        return (
            <VStack
                gap="16r"
                classNames={[
                    cn(
                        cls.NotificationList,
                        ...classNames.map((clsName) => cls[clsName] || clsName),
                    ),
                ]}
            >
                {notifications?.map((item) => (
                    <NotificationItem key={item.id} item={item} />
                ))}
            </VStack>
        );
    },
);
