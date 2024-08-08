import {
    FC, HTMLAttributes, memo, ReactNode,
} from 'react';
import cnBind from 'classnames/bind';
import cls from './Tab.module.scss';

interface TabProps extends HTMLAttributes<HTMLDivElement> {
    classNames?: string[];
    children: ReactNode;
}

export const Tab: FC<TabProps> = memo((props: TabProps) => {
    const { classNames = [], children, ...otherProps } = props;
    const cn = cnBind.bind(cls);

    return (
        <div
            className={cn(
                cls.Tab,
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
            {...otherProps}
        >
            {children}
        </div>
    );
});
