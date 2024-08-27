import { DeepPartial } from 'utility-types';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getPassword } from './getPassword';

describe('getLoginError', () => {
    test('should return password', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { password: '123' },
        };
        expect(getPassword(state as StateSchema)).toEqual('123');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getPassword(state as StateSchema)).toEqual('');
    });
});
