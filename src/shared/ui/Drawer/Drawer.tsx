import { FC, memo, ReactNode } from 'react';
import cnBind from 'classnames/bind';
import { useTheme } from 'shared/lib/hooks/useTheme/useTheme';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { HStack } from '../Stack';

interface DrawerProps {
    classNames?: string[];
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer: FC<DrawerProps> = memo((props: DrawerProps) => {
    const {
        classNames = [], children, onClose, isOpen,
    } = props;
    const cn = cnBind.bind(cls);
    const { theme } = useTheme();

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={cn(
                    cls.Drawer,
                    theme,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                    { [cls.opened]: isOpen },
                )}
            >
                <Overlay onClick={onClose} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});
