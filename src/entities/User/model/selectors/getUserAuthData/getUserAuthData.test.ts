import { DeepPartial } from 'utility-types';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserAuthData } from './getUserAuthData';

describe('getAuthData', () => {
    test('should return authData', () => {
        const state: DeepPartial<StateSchema> = {
            user: { authData: { id: '1', username: 'testUser' } },
        };
        expect(getUserAuthData(state as StateSchema)).toEqual({ id: '1', username: 'testUser' });
    });
});
