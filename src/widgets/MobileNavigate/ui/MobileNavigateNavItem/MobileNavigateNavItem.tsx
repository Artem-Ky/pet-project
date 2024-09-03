import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { mobileNavigateItemType } from '../../model/types/mobileNavigate';
import { getUserAuthData } from '@/entities/User';
import { AppLink, AppLinkTheme } from '@/shared/ui/Link';
import { Icon, IconColor, IconSize } from '@/shared/ui/Icon';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';

interface MobileNavigateNavItemProps {
    Item: mobileNavigateItemType;
}

export const MobileNavigateNavItem: FC<MobileNavigateNavItemProps> = memo(
    (props: MobileNavigateNavItemProps) => {
        const { Item } = props;
        const { t } = useTranslation();

        const isAuth = useSelector(getUserAuthData);

        if (Item.authOnly && !isAuth) {
            return null;
        }

        return (
            <li>
                <AppLink theme={AppLinkTheme.MAIN_COLOR} to={Item.path}>
                    <VStack gap="4r" align="center" justify="center">
                        <Icon
                            icon={Item.Icon}
                            variant={Item.IconType}
                            size={IconSize.SMALL}
                            color={IconColor.BLACK_WHITE}
                        />
                        <Text
                            size={TextSize.S}
                            theme={TextTheme.BLACK_WHITE}
                            text={t(Item.text)}
                        />
                    </VStack>
                </AppLink>
            </li>
        );
    },
);
