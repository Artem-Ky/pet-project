import { DeepPartial } from 'utility-types';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getUsername } from './getUsername';

describe('getLoginError', () => {
    test('should return username', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { username: 'toad' },
        };
        expect(getUsername(state as StateSchema)).toEqual('toad');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getUsername(state as StateSchema)).toEqual('');
    });
});
