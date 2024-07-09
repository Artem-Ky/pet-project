import { createSelector } from '@reduxjs/toolkit';
import { getLoginState } from '../getLoginState/getLoginState';
import { LoginSchema } from '../../types/LoginSchema';

export const getUsername = createSelector(
    getLoginState,
    (loginForm: LoginSchema) => loginForm?.username || '',
);
