import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'utility-types';
import { getRememberMe } from './getRememberMe';

describe('getLoginError', () => {
    test('should return rememberMe', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { rememberMe: true },
        };
        expect(getRememberMe(state as StateSchema)).toEqual(true);
    });
});
