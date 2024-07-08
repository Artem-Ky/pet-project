import { FC } from 'react';
import { Modal } from 'shared/ui/Modal';
import cls from './LoginModal.module.scss';
import { LoginForm } from '../LoginForm/LoginForm';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal: FC<LoginModalProps> = (props) => {
    const { isOpen, onClose } = props;

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose} classNames={[cls.LoginModal]}>
            <LoginForm />
        </Modal>
    );
};
