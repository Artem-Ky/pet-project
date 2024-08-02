import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    callback,
    wrapperRef,
    triggerRef,
}: UseInfiniteScrollOptions) {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerElement = triggerRef.current;

        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1,
            };

            observer.current = new IntersectionObserver(([entry]) => {
                console.log('Intersection entry:', entry);
                if (entry.isIntersecting) {
                    console.log('Trigger is intersecting');
                    callback();
                }
            }, options);

            observer.current.observe(triggerElement);
        } else {
            console.log('Callback or triggerElement not defined');
        }

        return () => {
            if (observer.current && triggerElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.current.unobserve(triggerElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
}
