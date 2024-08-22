import { Currency } from 'entities/CurrencySelect';
import { Country } from 'shared/const/common';

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
