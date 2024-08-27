import {
    EnhancedStore,
    Reducer,
    ReducersMapObject,
    UnknownAction,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { addCommentStateSchema } from '@/features/AddCommentForm';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/EditableProfileCard';
import {
    ArticleDetailsCommentsSchema,
    ArticleDetailsPageSchema,
    ArticleDetailsRecommendationsSchema,
} from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { rtkApi } from '@/shared/api/rtkApi';
import { pageScrollSchema } from '@/widgets/Page';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    pageScroll: pageScrollSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    //  async
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentsSchema;
    articleDetailsRecommendations?: ArticleDetailsRecommendationsSchema;
    addCommentForm?: addCommentStateSchema;
    articlesPage?: ArticlesPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
