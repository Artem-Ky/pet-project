import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Article, ArticleType, ArticleView } from 'entities/Article';
import { fetchArticlesList } from './fetchArticlesList';

const mockArticles: Article[] = [
    {
        id: '1',
        user: { id: 'user1', username: 'user', avatar: 'avatar_url' },
        title: 'Article 1',
        subtitle: 'Subtitle 1',
        img: 'image_url',
        views: 10,
        createdAt: '2024-01-01',
        type: [ArticleType.IT],
        blocks: [],
    },
    {
        id: '2',
        user: { id: 'user2', username: 'user2', avatar: 'avatar_url2' },
        title: 'Article 2',
        subtitle: 'Subtitle 2',
        img: 'image_url2',
        views: 20,
        createdAt: '2024-01-02',
        type: [ArticleType.SCIENCE],
        blocks: [],
    },
];

describe('fetchArticlesList', () => {
    test('fetchArticlesList fulfilled', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlesPage: {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
                view: ArticleView.PLATE,
                page: 1,
                hasMore: true,
                limit: 12,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ page: 1 });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: { _expand: 'user', _limit: 12, _page: 1 },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });

    test('fetchArticlesList rejected', async () => {
        const thunk = new TestAsyncThunk(fetchArticlesList, {
            articlesPage: {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
                view: ArticleView.PLATE,
                page: 1,
                hasMore: true,
                limit: 12,
            },
        });

        thunk.api.get.mockReturnValue(
            Promise.reject(new Error('Network Error')),
        );

        const result = await thunk.callThunk({ page: 1 });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: { _expand: 'user', _limit: 12, _page: 1 },
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
