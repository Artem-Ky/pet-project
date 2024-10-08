import {
    FC, memo, useCallback, useMemo, useState,
} from 'react';
import cnBind from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, ButtonSize, ButtonVariant } from '@/shared/ui/Button';
import { Text, TextSize, TextTheme } from '@/shared/ui/Text';
import cls from './SideBar.module.scss';
import { SideBarItem } from '../SideBarItem/SideBarItem';
import { getSideBarItems } from '../../model/selectors/getSideBarItems';

export const SideBar: FC = memo(() => {
    const [isClose, setIsClose] = useState(false);
    const cn = cnBind.bind(cls);
    const location = useLocation();
    const sideBarItemsList = useSelector(getSideBarItems);

    const onToggleHandler = useCallback(() => {
        setIsClose((prev) => !prev);
    }, []);

    const itemsList = useMemo(
        () => sideBarItemsList.map((item) => (
            <SideBarItem
                isActive={item.path === location.pathname}
                Item={item}
                isClose={isClose}
                key={item.path}
            />
        )),
        [isClose, location.pathname, sideBarItemsList],
    );

    return (
        <aside
            data-testid="sidebar"
            className={cn(cls.SideBar, { [cls.Close]: isClose })}
        >
            {!isClose && (
                <Text
                    className={cls.title}
                    theme={TextTheme.WHITE}
                    title="Toad App"
                    size={TextSize.XL_TITLE}
                />
            )}
            <nav>
                <ul className={cls.linksList}>{itemsList}</ul>
            </nav>
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
        </aside>
    );
});
