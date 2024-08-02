import {
    FC, memo, MutableRefObject, ReactNode, useRef,
} from 'react';
import cnBind from 'classnames/bind';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import cls from './Page.module.scss';

interface PageProps {
    classNames?: string[];
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = memo((props: PageProps) => {
    const { classNames = [], children, onScrollEnd } = props;
    const cn = cnBind.bind(cls);
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    return (
        <main
            ref={wrapperRef}
            className={cn(
                ...classNames.map((clsName) => cls[clsName] || clsName),
                cls.Page,
                { [cls.pageHeightScroll]: onScrollEnd },
            )}
        >
            {children}
            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    );
});
