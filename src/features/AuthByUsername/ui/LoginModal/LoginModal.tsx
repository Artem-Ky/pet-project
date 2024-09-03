import { FC, Suspense } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Modal } from '@/shared/ui/Modal';
import { Loader } from '@/shared/ui/Loader';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';
import { Drawer } from '@/shared/ui/Drawer';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = (props) => {
    const { isOpen, onClose } = props;

    return (
        <>
            <BrowserView>
                <Modal lazy isOpen={isOpen} onClose={onClose}>
                    <Suspense fallback={<Loader />}>
                        <LoginFormLazy onSuccess={onClose} />
                    </Suspense>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer lazy isOpen={isOpen} onClose={onClose}>
                    <Suspense fallback={<Loader />}>
                        <LoginFormLazy onSuccess={onClose} />
                    </Suspense>
                </Drawer>
            </MobileView>
        </>
    );
};
