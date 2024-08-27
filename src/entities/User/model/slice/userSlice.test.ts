import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { userReducer, userActions } from './userSlice';
import { UserSchema } from '../types/user';

describe('userSlice', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('initAuthData without localStorage value', () => {
        const state: UserSchema = { _inited: false };

        const expectedState = {
            _inited: true,
            authData: undefined,
        };

        expect(userReducer(state, userActions.initAuthData())).toEqual(
            expectedState,
        );
    });

    test('initAuthData with localStorage value', () => {
        const state: UserSchema = { _inited: false };
        const user = { id: '1', username: 'toad' };

        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));

        const expectedState = {
            _inited: true,
            authData: user,
        };

        expect(userReducer(state, userActions.initAuthData())).toEqual(
            expectedState,
        );
    });

    test('setAuthData', () => {
        const state: UserSchema = { _inited: true, authData: undefined };
        const authData = { id: '1', username: 'toad' };

        const expectedState = {
            _inited: true,
            authData,
        };

        expect(userReducer(state, userActions.setAuthData(authData))).toEqual(
            expectedState,
        );
    });

    test('logout', () => {
        const state: UserSchema = {
            _inited: true,
            authData: { id: '1', username: 'toad' },
        };

        const expectedState = {
            _inited: true,
            authData: undefined,
        };

        expect(userReducer(state, userActions.logout())).toEqual(expectedState);
    });
});
