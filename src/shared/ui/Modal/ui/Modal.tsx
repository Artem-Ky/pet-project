import { FC, ReactNode } from 'react';
import cnBind from 'classnames/bind';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
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
