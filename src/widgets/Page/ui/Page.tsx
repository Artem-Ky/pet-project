import {
    FC,
    memo,
    MutableRefObject,
    ReactNode,
    useRef,
    UIEvent,
} from 'react';
import cnBind from 'classnames/bind';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getPageScrollByPath } from '../model/selectors/PageScrollSelector';
import { pageScrollActions } from '../model/slices/PageScrollSlice';
import cls from './Page.module.scss';
import { TestProps } from '@/shared/types/tests';

interface PageProps extends TestProps{
    classNames?: string[];
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page: FC<PageProps> = memo((props: PageProps) => {
    const { classNames = [], children, onScrollEnd } = props;
    const cn = cnBind.bind(cls);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const scrollPosition = useSelector((state: StateSchema) => getPageScrollByPath(state, pathname));

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        // console.log(scrollPosition);
        // console.log(wrapperRef);
        wrapperRef.current.scrollTop = scrollPosition;
        // не работает из-за рендера | не знаю как без лагов досролить через requestAnimationFrame
    });

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        // console.log(e.currentTarget.scrollTop);
        dispatch(
            pageScrollActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 500);

    return (
        <main
            ref={wrapperRef}
            className={cn(
                ...classNames.map((clsName) => cls[clsName] || clsName),
                cls.Page,
                { [cls.pageHeightScroll]: onScrollEnd },
            )}
            id={PAGE_ID}
            data-testid={props['data-testid'] ?? 'Page'}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    );
});
