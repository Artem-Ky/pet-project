import {
    FC, memo, useCallback, useMemo, useState,
} from 'react';
import cnBind from 'classnames/bind';
import { Button } from 'shared/ui/Button';
import { ButtonSize, ButtonVariant } from 'shared/ui/Button/ui/Button';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/ui/Text';
import { useLocation } from 'react-router-dom';
import cls from './SideBar.module.scss';
import { SideBarItemsList } from '../../model/items';
import { SideBarItem } from '../SideBarItem/SideBarItem';

export const SideBar: FC = memo(() => {
    const [isClose, setIsClose] = useState(false);
    const cn = cnBind.bind(cls);
    const location = useLocation();

    const onToggleHandler = useCallback(() => {
        setIsClose((prev) => !prev);
    }, []);

    const itemsList = useMemo(
        () => SideBarItemsList.map((item) => (
            <SideBarItem
                isActive={item.path === location.pathname}
                Item={item}
                isClose={isClose}
                key={item.path}
            />
        )),
        [isClose, location.pathname],
    );

    return (
        <div
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
            <ul className={cls.linksList}>{itemsList}</ul>
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
