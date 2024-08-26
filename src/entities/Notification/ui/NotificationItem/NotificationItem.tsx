import { FC, memo } from 'react';
import cnBind from 'classnames/bind';
import { Card } from 'shared/ui/Card';
import { Text } from 'shared/ui/Text';
import { AppLink } from 'shared/ui/Link';
import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    classNames?: string[];
    item: Notification;
}

export const NotificationItem: FC<NotificationItemProps> = memo(
    (props: NotificationItemProps) => {
        const { classNames = [], item } = props;
        const cn = cnBind.bind(cls);

        const content = (
            <Card
                fullWidth
                heightAuto
                className={cn(
                    cls.NotificationItem,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                <Text title={item.title} text={item.description} />
            </Card>
        );

        if (item.href) {
            return (
                <AppLink fullWidth fullHeight target="_blank" to={item.href}>
                    {content}
                </AppLink>
            );
        }

        return content;
    },
);
