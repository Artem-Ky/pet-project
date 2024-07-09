import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'utility-types';
import { getLoginError } from './getLoginError';

describe('getLoginError', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { error: 'unknown error' },
        };
        expect(getLoginError(state as StateSchema)).toEqual('unknown error');
    });
});
