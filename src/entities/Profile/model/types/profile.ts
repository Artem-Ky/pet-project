import { Currency } from 'entities/CurrencySelect';
import { Country } from 'shared/const/common';

export enum ValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_USERNAME = 'INCORRECT_USERNAME',
    INCORRECT_CURRENCY = 'INCORRECT_CURRENCY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

export interface Profile {
    id?: string;
    first?: string;
    lastname?: string;
    birthDate?: string;
    currency?: Currency;
    country?: Country;
    city?: string;
    username?: string;
    avatar?: string;
}

export interface ProfileSchema {
    data?: Profile;
    form?: Profile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    ValidateErrors?: ValidateProfileError[];
}
