import { FC, memo, ReactNode } from 'react';
import cnBind from 'classnames/bind';
import { useTheme } from 'shared/lib/hooks/useTheme/useTheme';
import { useModal } from 'shared/lib/hooks/useModal/useModal';
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

export const Drawer: FC<DrawerProps> = memo((props: DrawerProps) => {
    const {
        classNames = [], children, onClose, isOpen, lazy,
    } = props;
    const cn = cnBind.bind(cls);
    const { theme } = useTheme();
    const { isClosing, isMounted, closeHandler } = useModal({
        animationDelay: 300,
        onClose,
        isOpen,
    });

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={cn(
                    cls.Drawer,
                    theme,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                    { [cls.opened]: isOpen },
                    { [cls.isClosing]: isClosing },
                )}
            >
                <Overlay onClick={closeHandler} />
                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    );
});
