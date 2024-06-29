import { AppLink } from 'shared/ui/Link';
import { AppLinkTheme } from 'shared/ui/Link/ui/AppLink';
import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import cls from './NavBar.module.scss';

export const NavBar: FC = () => {
    const { t } = useTranslation();

    return (
        <div className={cls.NavBar}>
            <ul className={cls.linksList}>
                <li>
                    <AppLink theme={AppLinkTheme.SECONDARY} to="/">
                        {t('Главная страница')}
                    </AppLink>
                </li>
                <li>
                    <AppLink theme={AppLinkTheme.SECONDARY} to="/about">
                        {t('Страница о нас')}
                    </AppLink>
                </li>
            </ul>
        </div>
    );
};
