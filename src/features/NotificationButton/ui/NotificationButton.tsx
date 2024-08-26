import { FC, memo } from 'react';
import { Popover } from 'shared/ui/Popups';
import { Icon, IconColor, IconTypeVariant } from 'shared/ui/Icon';
import { Button } from 'shared/ui/Button';
import { NotificationList } from 'entities/Notification';
import NotificationIcon from 'shared/assets/icons/notify.svg';

interface NotificationButtonProps {
    classNames?: string[];
}

export const NotificationButton: FC<NotificationButtonProps> = memo(
    (props: NotificationButtonProps) => {
        const { classNames = [] } = props;

        return (
            <Popover
                classNames={classNames}
                fullWidthContent
                trigger={(
                    <Button>
                        <Icon
                            color={IconColor.BLACK_WHITE}
                            variant={IconTypeVariant.FILL_NO_STOKE}
                            icon={NotificationIcon}
                        />
                    </Button>
                )}
            >
                <NotificationList />
            </Popover>
        );
    },
);
