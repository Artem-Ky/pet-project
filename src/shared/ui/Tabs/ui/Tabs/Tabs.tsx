import { FC, memo, useCallback } from 'react';
import cnBind from 'classnames/bind';
import cls from './Tabs.module.scss';
import { TabItem } from '../../model/type';
import { Tab } from '../Tab/Tab';

interface TabsProps {
    classNames?: string[];
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
}

export const Tabs: FC<TabsProps> = memo((props: TabsProps) => {
    const {
        classNames = [], tabs, value, onTabClick,
    } = props;
    const cn = cnBind.bind(cls);

    const clickHandle = useCallback((tab: TabItem) => () => {
        onTabClick(tab);
    }, [onTabClick]);

    return (
        <div
            className={cn(
                cls.Tabs,
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        >
            {tabs.map((tab) => (
                <Tab
                    key={tab.value}
                    onClick={clickHandle(tab)}
                    classNames={[tab.value === value ? cls.active : '']}
                >
                    {tab.content}
                </Tab>
            ))}
        </div>
    );
});
