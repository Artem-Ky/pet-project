import { createSelector } from '@reduxjs/toolkit';
import { getLoginState } from '../getLoginState/getLoginState';
import { LoginSchema } from '../../types/LoginSchema';

export const getPassword = createSelector(
    getLoginState,
    (loginForm: LoginSchema) => loginForm?.password || '',
);
