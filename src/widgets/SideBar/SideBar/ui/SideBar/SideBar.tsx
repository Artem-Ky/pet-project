import { FC, memo, useState } from 'react';
import cnBind from 'classnames/bind';
import { ThemeSwitcher } from 'widgets/ThemeSwither';
import { useTranslation } from 'react-i18next';
import { LangSwitcher } from 'widgets/LangSwitcher/ui/LangSwitcher';
import { Button } from 'shared/ui/Button';
import { ButtonSize, ButtonVariant } from 'shared/ui/Button/ui/Button';
import cls from './SideBar.module.scss';
import { SideBarItemsList } from '../../model/items';
import { SideBarItem } from '../SideBarItem/SideBarItem';

interface SideBarProps {
    classNames?: string[];
}

export const SideBar: FC<SideBarProps> = memo((props: SideBarProps) => {
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
                {SideBarItemsList.map((item) => (
                    <SideBarItem
                        key={item.path}
                        Item={item}
                        isClose={isClose}
                    />
                ))}
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
});
