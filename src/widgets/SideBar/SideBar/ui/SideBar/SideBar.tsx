import {
    FC, memo, useCallback, useMemo, useState,
} from 'react';
import cnBind from 'classnames/bind';
import { ThemeSwitcher } from 'widgets/ThemeSwither';
import { LangSwitcher } from 'widgets/LangSwitcher/ui/LangSwitcher';
import { Button } from 'shared/ui/Button';
import { ButtonSize, ButtonVariant } from 'shared/ui/Button/ui/Button';
import cls from './SideBar.module.scss';
import { SideBarItemsList } from '../../model/items';
import { SideBarItem } from '../SideBarItem/SideBarItem';

export const SideBar: FC = memo(() => {
    const [isClose, setIsClose] = useState(false);
    const cn = cnBind.bind(cls);

    const onToggleHandler = useCallback(() => {
        setIsClose((prev) => !prev);
    }, []);

    const itemsList = useMemo(
        () => SideBarItemsList.map((item) => (
            <SideBarItem Item={item} isClose={isClose} key={item.path} />
        )),
        [isClose],
    );

    return (
        <div
            data-testid="sidebar"
            className={cn(
                cls.SideBar,
                { [cls.Close]: isClose },
            )}
        >
            <ul className={cls.linksList}>{itemsList}</ul>
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
