import { FC, Suspense } from 'react';
import { Modal } from 'shared/ui/Modal';
import { Loader } from 'shared/ui/Loader/Loader';
import { LoginFormLazy } from '../LoginForm/LoginForm.lazy';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = (props) => {
    const { isOpen, onClose } = props;

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            <Suspense fallback={<Loader />}>
                <LoginFormLazy onSuccess={onClose} />
            </Suspense>
        </Modal>
    );
};
