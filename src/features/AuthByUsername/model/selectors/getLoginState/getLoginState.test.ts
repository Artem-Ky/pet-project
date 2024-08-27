import { DeepPartial } from 'utility-types';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginState } from './getLoginState';

describe('getCounter', () => {
    test('should return loginState', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                error: 'unknown error',
                rememberMe: true,
                password: '123',
                isLoading: true,
                username: 'toad',
            },
        };
        expect(getLoginState(state as StateSchema)).toEqual({
            error: 'unknown error',
            rememberMe: true,
            password: '123',
            isLoading: true,
            username: 'toad',
        });
    });
});
