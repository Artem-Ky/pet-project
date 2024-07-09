import { FC, memo, useCallback } from 'react';
import cnBind from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input';
import { Button } from 'shared/ui/Button';
import { InputSize } from 'shared/ui/Input/ui/Input';
import {
    ButtonOutlineColor,
    ButtonSize,
    ButtonVariant,
} from 'shared/ui/Button/ui/Button';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'app/providers/StoreProvider';
import {
    Text, TextAlign, TextSize, TextTheme,
} from 'shared/ui/Text/ui/Text';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getRememberMe } from '../../model/selectors/getRememberMe/getRememberMe';
import { getUsername } from '../../model/selectors/getUsername/getUsername';
import { getPassword } from '../../model/selectors/getPassword/getPassword';
import { loginActions } from '../../model/slice/LoginSlice';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    classNames?: string[];
}

export const LoginForm: FC<LoginFormProps> = memo((props: LoginFormProps) => {
    const { classNames = [] } = props;
    const cn = cnBind.bind(cls);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getUsername);
    const password = useSelector(getPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginLoading);
    const rememberMe = useSelector(getRememberMe);

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );
    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );
    const onChangeRememberMe = useCallback(() => {
        dispatch(loginActions.setRememberMe(!rememberMe));
    }, [dispatch, rememberMe]);

    const onLoginClick = useCallback(() => {
        dispatch(
            loginByUsername({
                username,
                password,
                remember: rememberMe,
            }),
        );
    }, [dispatch, password, username, rememberMe]);

    return (
        <form
            className={cn(
                cls.LoginForm,
                ...classNames.map((clsName) => cls[clsName] || clsName),
            )}
        >
            {error && (
                <Text
                    text={t('Вы ввели неправильный логин или пароль')}
                    theme={TextTheme.ERROR}
                    size={TextSize.S_BOLD}
                    align={TextAlign.LEFT}
                />
            )}
            <label htmlFor="username" className="sr-only">
                {t('Введите имя')}
            </label>
            <Input
                id="username"
                name="username"
                type="text"
                size={InputSize.MEDIUM}
                autoFocus
                placeholder={t('Имя')}
                onChange={onChangeUsername}
                value={username}
            />
            <label htmlFor="password" className="sr-only">
                {t('Введите пароль')}
            </label>
            <Input
                id="password"
                name="password"
                type="password"
                size={InputSize.MEDIUM}
                placeholder={t('Пароль')}
                onChange={onChangePassword}
                value={password}
            />
            <label htmlFor="rememberMe" className={cls.checkboxLabel}>
                <Input
                    classNames={[cls.checkbox]}
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    placeholder={t('Повторите пароль')}
                    onChange={onChangeRememberMe}
                    checked={rememberMe}
                />
                {t('Запомнить меня')}
            </label>
            <Button
                variant={ButtonVariant.OUTLINE}
                outlineColor={ButtonOutlineColor.Gray_White}
                size={ButtonSize.LARGE}
                classNames={[cls.LoginFormButton]}
                onClick={onLoginClick}
                disabled={isLoading}
                type="submit"
            >
                {t('Войти')}
            </Button>
        </form>
    );
});
