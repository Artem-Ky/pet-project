import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'shared/const/common';
import { Currency } from 'entities/CurrencySelect';
import { DeepPartial } from 'utility-types';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
    test('should return error', () => {
        const data = {
            first: 'toad',
            lastname: '505',
            birthDate: '2003-06-07',
            username: 'admin',
            currency: Currency.RUB,
            country: Country.Russia,
            avatar: 'link',
        };
        const state: DeepPartial<StateSchema> = {
            profile: {
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
