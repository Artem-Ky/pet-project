import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkExtraArg } from 'app/providers/StoreProvider';
import axios from 'axios';
import { error } from 'console';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

interface LoginByUsernameProps {
    username: string;
    password: string;
    remember: boolean;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>(
    'login/loginByUsername',
    async ({ username, password, remember }, ThunkAPI) => {
        const { extra, rejectWithValue, dispatch } = ThunkAPI;
        try {
            const response = await extra.api.post<User>('/login', {
                username,
                password,
            });

            if (!response.data) {
                throw new Error();
            }

            if (remember) {
                localStorage.setItem(
                    USER_LOCALSTORAGE_KEY,
                    JSON.stringify(response.data),
                );
            } else {
                sessionStorage.setItem(
                    USER_LOCALSTORAGE_KEY,
                    JSON.stringify(response.data),
                );
            }
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
