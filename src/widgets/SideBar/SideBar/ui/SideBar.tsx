import { FC, useState } from 'react';
import cnBind from 'classnames/bind';
import { ThemeSwitcher } from 'widgets/ThemeSwither';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'widgets/LangSwitcher/ui/LangSwitcher';
import { Button } from 'shared/ui/Button';
import { ThemeButton } from 'shared/ui/Button/ui/Button';
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
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
            <Button
                data-testid="sidebar-toggle"
                theme={ThemeButton.INVERTED_COLOR}
                onClick={onToggleHandler}
            >
                {t('закрыть')}
            </Button>
        </div>
    );
};
