import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Reducer, UnknownAction } from '@reduxjs/toolkit';
import { Profile } from '@/entities/Profile';
import { $api } from '@/shared/api/api';
import { Currency } from '@/entities/CurrencySelect';
import { Country } from '@/shared/const/common';
import { ComponentRender } from '@/shared/lib/tests/componentRender/ComponentRender';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';
import { ProfileSchema } from '../..';

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    birthDate: '2003-06-07',
    currency: Currency.USD,
    country: Country.Kazakhstan,
    city: 'Moscow',
    username: 'admin',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: '1', username: 'admin' },
        },
    },
    asyncReducers: {
        profile: profileReducer as Reducer<
            ProfileSchema | undefined,
            UnknownAction,
            ProfileSchema | undefined
        >,
    },
};

describe('features/EditableProfileCard', () => {
    test('Режим рид онли должен переключиться', async () => {
        ComponentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardFooter.EditButton'),
        );
        expect(
            screen.getByTestId('EditableProfileCardFooter.CancelButton'),
        ).toBeInTheDocument();
    });

    test('При отмене значения должны обнуляться', async () => {
        ComponentRender(<EditableProfileCard id="1" />, options);

        const lastName = screen.getByTestId('ProfileCard.lastname') as HTMLInputElement;

        expect(lastName).toHaveAttribute('readonly');

        await userEvent.click(screen.getByTestId('EditableProfileCardFooter.EditButton'));

        expect(lastName).not.toHaveAttribute('readonly');

        await userEvent.clear(lastName);

        expect(lastName.value).toBe('');

        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');

        await userEvent.click(screen.getByTestId('EditableProfileCardFooter.CancelButton'));

        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
    });

    test('Должна появиться ошибка', async () => {
        ComponentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardFooter.EditButton'),
        );

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));

        await userEvent.click(
            screen.getByTestId('EditableProfileCardFooter.SaveButton'),
        );

        expect(
            screen.getByTestId('EditableProfileCard.Error.Header'),
        ).toBeInTheDocument();
    });

    test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        ComponentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(
            screen.getByTestId('EditableProfileCardFooter.EditButton'),
        );

        await userEvent.type(
            screen.getByTestId('ProfileCard.firstname'),
            'user',
        );

        await userEvent.click(
            screen.getByTestId('EditableProfileCardFooter.SaveButton'),
        );

        expect(mockPutReq).toHaveBeenCalled();
    });
});
