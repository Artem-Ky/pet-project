import { FC, memo, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Popover } from '@/shared/ui/Popups';
import { Icon, IconColor, IconTypeVariant } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notify.svg';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { AnimationProvider } from '@/shared/lib/components/DynamicModuleLoader/AnimationProvider';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    classNames?: string[];
}

export const NotificationButton: FC<NotificationButtonProps> = memo(
    (props: NotificationButtonProps) => {
        const { classNames = [] } = props;

        const [isOpen, setIsOpen] = useState(false);

        const onOpenDrawer = () => {
            setIsOpen(true);
        };

        const onCloseDrawer = () => {
            setIsOpen(false);
        };

        const trigger = (
            <Button onClick={onOpenDrawer}>
                <Icon
                    color={IconColor.BLACK_WHITE}
                    variant={IconTypeVariant.FILL_NO_STOKE}
                    icon={NotificationIcon}
                />
            </Button>
        );

        return (
            <div>
                <BrowserView>
                    <Popover
                        classNames={classNames}
                        fullWidthContent
                        trigger={trigger}
                    >
                        <NotificationList classNames={[cls.browser]} />
                    </Popover>
                </BrowserView>
                <MobileView>
                    {trigger}
                    <AnimationProvider>
                        <Drawer onClose={onCloseDrawer} isOpen={isOpen}>
                            <NotificationList classNames={[cls.mobile]} />
                        </Drawer>
                    </AnimationProvider>
                </MobileView>
            </div>
        );
    },
);
