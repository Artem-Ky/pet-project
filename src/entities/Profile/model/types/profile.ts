import { Currency } from 'entities/CurrencySelect';
import { Country } from 'shared/const/common';

export interface Profile {
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
}
