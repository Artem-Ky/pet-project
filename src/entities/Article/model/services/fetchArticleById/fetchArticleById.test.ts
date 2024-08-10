import { User } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Article, ArticleBlock, ArticleType } from '../../types/article';
import { fetchArticleById } from './fetchArticleById';

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

describe('fetchArticleById.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: article }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalledWith('/articles/1', {
            params: {
                _expand: 'user',
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(article);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchArticleById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalledWith('/articles/1', {
            params: {
                _expand: 'user',
            },
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
