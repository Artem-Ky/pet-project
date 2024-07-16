import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'utility-types';
import { Country } from 'shared/const/common';
import { Currency } from 'entities/CurrencySelect';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
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
                form: data,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
