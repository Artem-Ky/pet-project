import { User } from 'entities/User';
import { articleDetailsReducer } from './articleDetailsSlice';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById';
import { Article, ArticleBlock, ArticleType } from '../types/article';

describe('articleDetailsSlice', () => {
    test('should handle fetchArticleById.pending', () => {
        const state: ArticleDetailsSchema = {
            isLoading: false,
            error: undefined,
            data: undefined,
        };

        const action = { type: fetchArticleById.pending.type };
        const expectedState = {
            isLoading: true,
            error: undefined,
            data: undefined,
        };

        expect(articleDetailsReducer(state, action)).toEqual(expectedState);
    });

    test('should handle fetchArticleById.fulfilled', () => {
        const state: ArticleDetailsSchema = {
            isLoading: true,
            error: undefined,
            data: undefined,
        };

        const article: Article = {
            id: '1',
            user: { id: '1', username: 'toad' } as User,
            title: 'Test Article',
            subtitle: 'Test Subtitle',
            img: 'test.jpg',
            views: 100,
            createdAt: '2021-01-01',
            type: [ArticleType.IT],
            blocks: [] as ArticleBlock[],
        };

        const action = {
            type: fetchArticleById.fulfilled.type,
            payload: article,
        };
        const expectedState = {
            isLoading: false,
            error: undefined,
            data: article,
        };

        expect(articleDetailsReducer(state, action)).toEqual(expectedState);
    });

    test('should handle fetchArticleById.rejected', () => {
        const state: ArticleDetailsSchema = {
            isLoading: true,
            error: undefined,
            data: undefined,
        };

        const action = {
            type: fetchArticleById.rejected.type,
            payload: 'Fetch error',
        };
        const expectedState = {
            isLoading: false,
            error: 'Fetch error',
            data: undefined,
        };

        expect(articleDetailsReducer(state, action)).toEqual(expectedState);
    });
});
