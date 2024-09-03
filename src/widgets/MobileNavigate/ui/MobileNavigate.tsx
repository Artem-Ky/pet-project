import {
    FC, memo, useCallback, useMemo, useState,
} from 'react';
import cnBind from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cls from './MobileNavigate.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropDown } from '@/features/AvatarDropDown';
import { getMobileNavigateItems } from '../model/selectors/getMobileNavigateItems';
import { MobileNavigateNavItem } from './MobileNavigateNavItem/MobileNavigateNavItem';
import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { Button, ButtonVariant } from '@/shared/ui/Button';

interface MobileNavigateProps {
    classNames?: string[];
}

export const MobileNavigate: FC<MobileNavigateProps> = memo(
    (props: MobileNavigateProps) => {
        const { classNames = [] } = props;
        const cn = cnBind.bind(cls);
        const { t } = useTranslation();
        const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
        const authData = useSelector(getUserAuthData);

        const onCloseModal = useCallback(() => {
            setIsAuthModalOpen(false);
        }, []);

        const onOpenModal = useCallback(() => {
            setIsAuthModalOpen(true);
        }, []);

        const mobileNavigateItemsList = useSelector(getMobileNavigateItems);

        const itemsList = useMemo(
            () => mobileNavigateItemsList.map((item) => (
                <MobileNavigateNavItem Item={item} key={item.path} />
            )),
            [mobileNavigateItemsList],
        );

        if (!authData) {
            return (
                <HStack
                    gap="16c"
                    justify="center"
                    align="center"
                    fullHeight
                    fullWidth
                    classNames={[
                        cn(
                            cls.MobileNavigate,
                            ...classNames.map(
                                (clsName) => cls[clsName] || clsName,
                            ),
                        ),
                    ]}
                >
                    <nav>
                        <ul className={cls.navList}>
                            <HStack align="center" gap="16c">
                                {itemsList}
                            </HStack>
                        </ul>
                    </nav>
                    {isAuthModalOpen && (
                        <LoginModal
                            isOpen={isAuthModalOpen}
                            onClose={onCloseModal}
                        />
                    )}
                    <Button variant={ButtonVariant.CLEAR} onClick={onOpenModal}>
                        {t('Войти')}
                    </Button>
                </HStack>
            );
        }

        return (
            <HStack
                gap="16c"
                justify="center"
                align="center"
                fullHeight
                fullWidth
                classNames={[
                    cn(
                        cls.MobileNavigate,
                        ...classNames.map((clsName) => cls[clsName] || clsName),
                    ),
                ]}
            >
                <nav>
                    <ul className={cls.navList}>
                        <HStack align="center" gap="16c">
                            {itemsList}
                        </HStack>
                    </ul>
                </nav>
                <NotificationButton />
                <AvatarDropDown />
            </HStack>
        );
    },
);
