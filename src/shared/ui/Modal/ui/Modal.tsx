/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
    FC,
    MutableRefObject,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import cnBind from 'classnames/bind';
import { HStack } from '../../Stack';
import { Overlay } from '../../Overlay/Overlay';
import { Portal } from '../../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
    classNames?: string[];
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

export const Modal: FC<ModalProps> = (props) => {
    const {
        classNames = [], children, isOpen, onClose, lazy,
    } = props;
    const cn = cnBind.bind(cls);

    const ANIMATION_DELAY = 300;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

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

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return () => {
            clearTimeout(timeRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <HStack
                justify="center"
                align="center"
                classNames={[
                    cn(
                        cls.Modal,
                        { [cls.opened]: isOpen },
                        { [cls.isClosing]: isClosing },
                    ),
                ]}
            >
                <Overlay onClick={closeHandler} />
                <HStack
                    justify="center"
                    align="center"
                    classNames={[
                        cn(
                            cls.content,
                            ...classNames.map(
                                (clsName) => cls[clsName] || clsName,
                            ),
                        ),
                    ]}
                >
                    {children}
                </HStack>
            </HStack>
        </Portal>
    );
};
