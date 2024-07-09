import { DeepPartial } from 'utility-types';
import { LoginSchema } from '../types/LoginSchema';
import { loginActions, loginReducer, loginSlice } from './LoginSlice';
import { loginByUsername } from '../services/loginByUsername/loginByUsername';

describe('LoginSlice', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = {
            username: '123',
        };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername('123new'),
            ),
        ).toEqual({ username: '123new' });
    });
    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: '123',
        };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword('123new'),
            ),
        ).toEqual({ password: '123new' });
    });
    test('test set rememberMe', () => {
        const state: DeepPartial<LoginSchema> = {
            rememberMe: false,
        };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setRememberMe(true),
            ),
        ).toEqual({ rememberMe: true });
    });
});
