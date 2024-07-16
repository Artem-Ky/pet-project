import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'utility-types';
import { getProfileAvatar } from './getProfileAvatar';

describe('getProfileAvatar.test', () => {
    test('should return error', () => {
        const data = {
            avatar: 'link',
        };
        const state: DeepPartial<StateSchema> = {
            profile: {
                data,
            },
        };
        expect(getProfileAvatar(state as StateSchema)).toEqual(data.avatar);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileAvatar(state as StateSchema)).toEqual(undefined);
    });
});
