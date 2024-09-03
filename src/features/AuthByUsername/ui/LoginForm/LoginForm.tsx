import { FC, memo, useCallback } from 'react';
import cnBind from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
    BrowserView,
    isBrowser,
    isMobile,
    MobileView,
} from 'react-device-detect';
import { Input, InputSize } from '@/shared/ui/Input';
import {
    Button,
    ButtonOutlineColor,
    ButtonSize,
    ButtonVariant,
} from '@/shared/ui/Button';
import {
    Text, TextAlign, TextSize, TextTheme,
} from '@/shared/ui/Text';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getRememberMe } from '../../model/selectors/getRememberMe/getRememberMe';
import { getUsername } from '../../model/selectors/getUsername/getUsername';
import { getPassword } from '../../model/selectors/getPassword/getPassword';
import { loginActions, loginReducer } from '../../model/slice/LoginSlice';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import cls from './LoginForm.module.scss';
import { HStack } from '@/shared/ui/Stack';

interface LoginFormProps {
    classNames?: string[];
    onSuccess: () => void;
}

const LoginForm: FC<LoginFormProps> = memo((props: LoginFormProps) => {
    const { classNames = [], onSuccess } = props;
    const cn = cnBind.bind(cls);
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getUsername);
    const password = useSelector(getPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginLoading);
    const rememberMe = useSelector(getRememberMe);

    const initialReducers: ReducersList = {
        loginForm: loginReducer,
    };

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

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(
            loginByUsername({
                username,
                password,
                remember: rememberMe,
            }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, password, username, rememberMe, onSuccess]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <form
                className={cn(
                    cls.LoginForm,
                    ...classNames.map((clsName) => cls[clsName] || clsName),
                    { [cls.mobile]: isMobile },
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
                    size={isMobile ? InputSize.LARGE : InputSize.MEDIUM}
                    autoFocus
                    placeholder={t('Имя')}
                    {...(isMobile ? { fullWidth: true } : {})}
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
                    size={isMobile ? InputSize.LARGE : InputSize.MEDIUM}
                    placeholder={t('Пароль')}
                    {...(isMobile ? { fullWidth: true } : {})}
                    onChange={onChangePassword}
                    value={password}
                />
                {isBrowser && (
                    <label
                        htmlFor="rememberMe"
                        className={cn(cls.checkboxLabel)}
                    >
                        <Input
                            classNames={[cls.checkbox]}
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                            placeholder={t('Запомнить меня?')}
                            onChange={onChangeRememberMe}
                            checked={rememberMe}
                        />
                        {t('Запомнить меня')}
                    </label>
                )}
                {isMobile && (
                    <HStack justify="end" align="center" gap="16c" fullWidth>
                        <Text
                            label={t('Запомнить меня')}
                            labelId="rememberMe"
                            theme={TextTheme.BLACK_WHITE}
                            size={TextSize.L_BOLD}
                            align={TextAlign.RIGHT}
                        />
                        <Input
                            classNames={[cls.checkbox]}
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                            size={InputSize.LARGE}
                            placeholder={t('Запомнить меня?')}
                            onChange={onChangeRememberMe}
                            checked={rememberMe}
                        />
                    </HStack>
                )}
                <Button
                    variant={ButtonVariant.OUTLINE}
                    outlineColor={ButtonOutlineColor.Gray_White}
                    size={ButtonSize.LARGE}
                    classNames={[cls.LoginFormButton]}
                    onClick={onLoginClick}
                    disabled={isLoading}
                    {...(isMobile ? { fullWidth: true } : { fullWidth: false })}
                    type="submit"
                >
                    {t('Войти')}
                </Button>
            </form>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
