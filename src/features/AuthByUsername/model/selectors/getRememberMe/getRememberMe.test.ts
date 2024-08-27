import { DeepPartial } from 'utility-types';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getRememberMe } from './getRememberMe';

describe('getLoginError', () => {
    test('should return rememberMe', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { rememberMe: true },
        };
        expect(getRememberMe(state as StateSchema)).toEqual(true);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getRememberMe(state as StateSchema)).toEqual(false);
    });
});
