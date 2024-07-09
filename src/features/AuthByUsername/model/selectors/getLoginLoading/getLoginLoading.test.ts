import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'utility-types';
import { getLoginLoading } from './getLoginLoading';

describe('getLoginError', () => {
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: { isLoading: true },
        };
        expect(getLoginLoading(state as StateSchema)).toEqual(true);
    });
});
