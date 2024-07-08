import { FC } from 'react';
import cnBind from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { InputSize } from 'shared/ui/Input/ui/Input';
import { ButtonOutlineColor, ButtonSize, ButtonVariant } from 'shared/ui/Button/ui/Button';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    classNames?: string[];
}

export const LoginForm: FC<LoginFormProps> = (props) => {
    const { classNames = [] } = props;
    const cn = cnBind.bind(cls);
    const { t } = useTranslation();

    return (
        <form
            className={cn(
                cls.LoginForm,
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        >
            <Input
                id="username"
                name="username"
                label="username"
                type="text"
                size={InputSize.MEDIUM}
                autoFocus
                placeholder={t('Имя')}
            />
            <Input
                id="password"
                name="password"
                label="password"
                type="password"
                size={InputSize.MEDIUM}
                placeholder={t('Пароль')}
            />
            <Button
                variant={ButtonVariant.OUTLINE}
                outlineColor={ButtonOutlineColor.Gray_White}
                size={ButtonSize.LARGE}
                classNames={[cls.LoginFormButton]}
                type="submit"
            >
                {t('Войти')}
            </Button>
        </form>
    );
};
