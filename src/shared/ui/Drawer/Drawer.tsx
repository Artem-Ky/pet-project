import {
    FC, memo, ReactNode, useCallback, useEffect,
} from 'react';
import cnBind from 'classnames/bind';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock-upgrade';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import {
    AnimationProvider,
    useAnimationLibs,
} from '@/shared/lib/components/DynamicModuleLoader/AnimationProvider';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';

interface DrawerProps {
    classNames?: string[];
    children: ReactNode;
    isOpen?: boolean;
    lazy?: boolean;
    onClose?: () => void;
}

const height = window.innerHeight - 100;

export const DrawerContent: FC<DrawerProps> = memo((props: DrawerProps) => {
    const {
        classNames = [], children, onClose, isOpen, lazy,
    } = props;
    const cn = cnBind.bind(cls);
    const { theme } = useTheme();
    const { Spring, Gesture } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        const targetElement = document.getElementById('drawer');
        if (isOpen) {
            openDrawer();
            disableBodyScroll(targetElement as HTMLElement);
        }
    }, [api, isOpen, openDrawer, cn]);

    const close = (velocity = 0) => {
        const targetElementClose = document.getElementById('drawer');
        enableBodyScroll(targetElementClose as HTMLElement);
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    };

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel();

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    openDrawer();
                }
            } else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                id="drawer"
                className={cn(
                    cls.Drawer,
                    theme,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                    { [cls.opened]: isOpen },
                )}
            >
                <Overlay onClick={close} />
                <Spring.a.div
                    className={cls.sheet}
                    style={{
                        display,
                        bottom: `calc(-100vh + ${height - 100}px)`,
                        y,
                    }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
});

const DrawerAsync = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => (
    <AnimationProvider>
        <DrawerAsync {...props} />
    </AnimationProvider>
);
