import { Country } from 'shared/const/common';
import { Currency } from 'entities/CurrencySelect';
import { ValidateProfileError } from 'entities/Profile';
import { validateProfileData } from './validateProfileData';

const data = {
    first: 'toad',
    lastname: '505',
    birthDate: '2003-06-07',
    username: 'admin',
    currency: Currency.RUB,
    country: Country.Russia,
    avatar: 'link',
};

describe('validateProfileData.test', () => {
    test('success', async () => {
        const result = validateProfileData(data);

        expect(result).toEqual([]);
    });

    test('without first and last name', async () => {
        const result = validateProfileData({
            ...data,
            first: '',
            lastname: '',
        });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('incorrect currency', async () => {
        const result = validateProfileData({ ...data, currency: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_CURRENCY]);
    });

    test('incorrect username', async () => {
        const result = validateProfileData({ ...data, username: undefined });

        expect(result).toEqual([ValidateProfileError.INCORRECT_USERNAME]);
    });

    test('incorrect all', async () => {
        const result = validateProfileData({});

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_USERNAME,
            ValidateProfileError.INCORRECT_CURRENCY,
        ]);
    });
});
