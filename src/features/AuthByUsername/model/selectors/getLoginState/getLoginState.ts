import { StateSchema } from '@/app/providers/StoreProvider';
import { LoginSchema } from '../../types/LoginSchema';

export const getLoginState = (state: StateSchema) => state?.loginForm as LoginSchema;
