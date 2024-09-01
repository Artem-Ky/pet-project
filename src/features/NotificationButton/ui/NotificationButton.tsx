import { FC, memo, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Popover } from '@/shared/ui/Popups';
import {
    Icon, IconColor, IconSize, IconTypeVariant,
} from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notify.svg';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import cls from './NotificationButton.module.scss';
import { ButtonVariant } from '@/shared/ui/Button/ui/Button';
import { Text } from '@/shared/ui/Text';
import { TextSize, TextTheme } from '@/shared/ui/Text/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { getUserAuthData } from '@/entities/User';

interface NotificationButtonProps {
    classNames?: string[];
}

export const NotificationButton: FC<NotificationButtonProps> = memo(
    (props: NotificationButtonProps) => {
        const { classNames = [] } = props;
        const { t } = useTranslation();
        const authData = useSelector(getUserAuthData);
        const [isOpen, setIsOpen] = useState(false);

        const onOpenDrawer = () => {
            setIsOpen(true);
        };

        const onCloseDrawer = () => {
            setIsOpen(false);
        };

        const trigger = (
            <Button onClick={onOpenDrawer} variant={ButtonVariant.CLEAR}>
                <BrowserView>
                    <Icon
                        color={IconColor.BLACK_WHITE}
                        variant={IconTypeVariant.FILL_NO_STOKE}
                        size={IconSize.MEDIUM}
                        icon={NotificationIcon}
                    />
                </BrowserView>
                <MobileView>
                    <VStack gap="4r" align="center" justify="center">
                        <Icon
                            color={IconColor.BLACK_WHITE}
                            variant={IconTypeVariant.FILL_NO_STOKE}
                            size={IconSize.SMALL}
                            icon={NotificationIcon}
                        />
                        <Text theme={TextTheme.BLACK_WHITE} size={TextSize.S}>
                            {t('уведомления')}
                        </Text>
                    </VStack>
                </MobileView>
            </Button>
        );

        if (!authData) {
            return null;
        }

        return (
            <>
                <BrowserView className={cls.align}>
                    <Popover
                        classNames={classNames}
                        fullWidthContent
                        trigger={trigger}
                    >
                        <NotificationList classNames={[cls.browser]} />
                    </Popover>
                </BrowserView>
                <MobileView className={cls.align}>
                    {trigger}
                    <Drawer onClose={onCloseDrawer} isOpen={isOpen}>
                        <NotificationList classNames={[cls.mobile]} />
                    </Drawer>
                </MobileView>
            </>
        );
    },
);
