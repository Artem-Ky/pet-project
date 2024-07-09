import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'utility-types';
import { getUsername } from './getUsername';

describe('getLoginError', () => {
    test('should return username', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { username: 'toad' },
        };
        expect(getUsername(state as StateSchema)).toEqual('toad');
    });
});
