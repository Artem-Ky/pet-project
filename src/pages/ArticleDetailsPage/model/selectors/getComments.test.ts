import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'utility-types';
import { getArticleCommentsIsLoading, getArticleCommentsError } from './getComments';

describe('articleDetailsComments selectors', () => {
    test('getArticleCommentsIsLoading should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                isLoading: true,
                error: undefined,
                ids: [],
                entities: {},
            },
        };
        expect(getArticleCommentsIsLoading(state as StateSchema)).toEqual(true);
    });

    test('getArticleCommentsError should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetailsComments: {
                isLoading: false,
                error: 'Error message',
                ids: [],
                entities: {},
            },
        };
        expect(getArticleCommentsError(state as StateSchema)).toEqual('Error message');
    });

    test('getArticleCommentsIsLoading should return undefined if no state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleCommentsIsLoading(state as StateSchema)).toBeUndefined();
    });

    test('getArticleCommentsError should return undefined if no state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleCommentsError(state as StateSchema)).toBeUndefined();
    });
});
