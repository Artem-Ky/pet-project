import { createSelector } from '@reduxjs/toolkit';
import { getLoginState } from '../getLoginState/getLoginState';
import { LoginSchema } from '../../types/LoginSchema';

export const getRememberMe = createSelector(
    getLoginState,
    (loginForm: LoginSchema) => loginForm?.rememberMe || false,
);
