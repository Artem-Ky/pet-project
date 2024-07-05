/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import cnBind from 'classnames/bind';
import { Portal } from 'shared/ui/Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    classNames?: string[];
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Modal: FC<ModalProps> = (props) => {
    const {
        classNames = [], children, isOpen, onClose,
    } = props;
    const cn = cnBind.bind(cls);

    const ANIMATION_DELAY = 300;

    const [isClosing, setIsClosing] = useState(false);
    const timeRef = useRef<ReturnType<typeof setTimeout>>();

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timeRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeHandler();
            }
        },
        [closeHandler],
    );

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div
                className={cn(
                    cls.Modal,
                    { [cls.opened]: isOpen },
                    { [cls.isClosing]: isClosing },
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                )}
            >
                <div onClick={closeHandler} className={cls.overlay}>
                    <div onClick={onContentClick} className={cn(cls.content)}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
