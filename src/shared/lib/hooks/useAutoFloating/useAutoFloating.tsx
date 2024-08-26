import {
    useFloating, autoUpdate, flip, offset,
} from '@floating-ui/react-dom';

export interface useAutoFloatingProps {
    floatOffset?: number;
}

export function useAutoFloating({
    floatOffset = 0,
}: useAutoFloatingProps = {}) {
    const { refs, floatingStyles } = useFloating({
        placement: 'bottom',
        whileElementsMounted: autoUpdate,
        middleware: [
            offset(floatOffset),
            flip({
                fallbackPlacements: [
                    'bottom',
                    'top',
                    'right-end',
                    'left-end',
                    'right-start',
                    'left-start',
                ],
                rootBoundary: 'viewport',
                altBoundary: true,
            }),
        ],
    });

    return { refs, floatingStyles };
}
