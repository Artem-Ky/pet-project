import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { profileReducer } from 'entities/Profile';
import { addCommentFormReducer } from 'features/AddCommentForm/model/slices/addCommentFormSlice';
import { loginReducer } from 'features/AuthByUsername/model/slice/LoginSlice';
import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice';
import { articlesPageReducer } from 'pages/ArticlesPage/model/slices/articlesPageSlice';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { DeepPartial } from 'utility-types';

const defaultAsyncReducers: ReducersList = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsComments: articleDetailsCommentsReducer,
    articlesPage: articlesPageReducer,
};

export const StoreDecorator = (
    state: DeepPartial<StateSchema>,
    asyncReducers?: ReducersList,
) => (StoryComponent: StoryFn) => (
    <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
    >
        <StoryComponent />
    </StoreProvider>
);
