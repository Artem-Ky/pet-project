import { DeepPartial } from 'utility-types';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getUserInited } from './getUserInited';

describe('getUserInited', () => {
    test('should return false', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                _inited: false,
            },
        };
        expect(getUserInited(state as StateSchema)).toEqual(false);
    });
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
                _inited: true,
            },
        };
        expect(getUserInited(state as StateSchema)).toEqual(true);
    });
    test('should return undefine', () => {
        const state: DeepPartial<StateSchema> = {
            user: {
            },
        };
        expect(getUserInited(state as StateSchema)).toEqual(undefined);
    });
});
