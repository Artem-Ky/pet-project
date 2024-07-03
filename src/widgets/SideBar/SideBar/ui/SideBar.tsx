import { FC, useState } from 'react';
import cnBind from 'classnames/bind';
import { ThemeSwitcher } from 'widgets/ThemeSwither';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'widgets/LangSwitcher/ui/LangSwitcher';
import { Button } from 'shared/ui/Button';
import { ButtonSize, ButtonVariant } from 'shared/ui/Button/ui/Button';
import { AppLink } from 'shared/ui/Link';
import { AppLinkTheme } from 'shared/ui/Link/ui/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import HomeIcon from 'shared/assets/icons/home.svg';
import cls from './SideBar.module.scss';

interface SideBarProps {
    classNames?: string[];
}

export const SideBar: FC<SideBarProps> = (props) => {
    const [isClose, setIsClose] = useState(false);
    const { t } = useTranslation();
    const { classNames = [] } = props;
    const cn = cnBind.bind(cls);

    const onToggleHandler = () => {
        setIsClose((prev) => !prev);
    };

    return (
        <div
            data-testid="sidebar"
            className={cn(
                cls.SideBar,
                { [cls.Close]: isClose },
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        >
            <ul className={cls.linksList}>
                <AppLink
                    classNames={[cls.linkItem]}
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.main}
                >
                    <HomeIcon className={cls.linkIcon} />
                    <span className={cls.link}>{t('Главная страница')}</span>
                </AppLink>
                <AppLink
                    classNames={[cls.linkItem]}
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.about}
                >
                    <AboutIcon className={cls.linkIcon} />
                    <span className={cls.link}>{t('Страница о нас')}</span>
                </AppLink>
            </ul>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
            <Button
                variant={ButtonVariant.CLEAR}
                data-testid="sidebar-toggle"
                onClick={onToggleHandler}
                classNames={[cls.closeBtn]}
                size={ButtonSize.LARGE}
                isSquare
            >
                {isClose ? '>' : '<'}
            </Button>
        </div>
    );
};
