import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import {
    Article, ArticleSortField, ArticleType, ArticleView,
} from 'entities/Article';
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
                sort: ArticleSortField.CREATED,
                order: 'asc',
                search: '',
                type: ArticleType.ALL,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'createdAt',
                _order: 'asc',
                q: '',
                type: undefined,
            },
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
                sort: ArticleSortField.CREATED,
                order: 'asc',
                search: '',
                type: ArticleType.ALL,
            },
        });

        thunk.api.get.mockReturnValue(
            Promise.reject(new Error('Network Error')),
        );

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'createdAt',
                _order: 'asc',
                q: '',
                type: undefined,
            },
        });
        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});

describe('fetchArticlesList with different sorting and filtering combinations', () => {
    // Тесты для поля сортировки views
    test('fetchArticlesList sorted by views in ascending order', async () => {
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
                sort: ArticleSortField.VIEWS,
                order: 'asc',
                search: '',
                type: ArticleType.ALL,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'views',
                _order: 'asc',
                q: '',
                type: undefined,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });

    test('fetchArticlesList sorted by views in descending order', async () => {
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
                sort: ArticleSortField.VIEWS,
                order: 'desc',
                search: '',
                type: ArticleType.ALL,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'views',
                _order: 'desc',
                q: '',
                type: undefined,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });

    // Тесты для поля сортировки 'title'
    test('fetchArticlesList sorted by title in ascending order', async () => {
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
                sort: ArticleSortField.TITLE,
                order: 'asc',
                search: '',
                type: ArticleType.ALL,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'title',
                _order: 'asc',
                q: '',
                type: undefined,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });

    test('fetchArticlesList sorted by title in descending order', async () => {
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
                sort: ArticleSortField.TITLE,
                order: 'desc',
                search: '',
                type: ArticleType.ALL,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'title',
                _order: 'desc',
                q: '',
                type: undefined,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });

    // Тесты для поля сортировки 'createdAt'
    test('fetchArticlesList sorted by createdAt in ascending order', async () => {
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
                sort: ArticleSortField.CREATED,
                order: 'asc',
                search: '',
                type: ArticleType.ALL,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'createdAt',
                _order: 'asc',
                q: '',
                type: undefined,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });

    test('fetchArticlesList sorted by createdAt in descending order', async () => {
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
                sort: ArticleSortField.CREATED,
                order: 'desc',
                search: '',
                type: ArticleType.ALL,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'createdAt',
                _order: 'desc',
                q: '',
                type: undefined,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });
});

describe('fetchArticlesList with different types', () => {
    // Тип IT
    test('fetchArticlesList sorted by createdAt in ascending order with IT type', async () => {
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
                sort: ArticleSortField.CREATED,
                order: 'asc',
                search: '',
                type: ArticleType.IT,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'createdAt',
                _order: 'asc',
                q: '',
                type: 'IT',
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });

    // Тип SCIENCE
    test('fetchArticlesList sorted by title in descending order with SCIENCE type', async () => {
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
                sort: ArticleSortField.TITLE,
                order: 'desc',
                search: '',
                type: ArticleType.SCIENCE,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'title',
                _order: 'desc',
                q: '',
                type: 'SCIENCE',
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });

    // Тип ECONOMICS
    test('fetchArticlesList sorted by views in ascending order with ECONOMICS type', async () => {
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
                sort: ArticleSortField.VIEWS,
                order: 'asc',
                search: '',
                type: ArticleType.ECONOMICS,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'views',
                _order: 'asc',
                q: '',
                type: 'ECONOMICS',
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });
});

describe('fetchArticlesList with different search queries', () => {
    // Поиск с пустой строкой
    test('fetchArticlesList with empty search query', async () => {
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
                sort: ArticleSortField.CREATED,
                order: 'asc',
                search: '',
                type: ArticleType.ALL,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'createdAt',
                _order: 'asc',
                q: '',
                type: undefined,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });

    // Поиск с конкретным запросом
    test('fetchArticlesList with specific search query', async () => {
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
                sort: ArticleSortField.CREATED,
                order: 'asc',
                search: 'My name is Artem',
                type: ArticleType.ALL,
            },
        });

        thunk.api.get.mockReturnValue(Promise.resolve({ data: mockArticles }));

        const result = await thunk.callThunk({ replace: false });

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(thunk.api.get).toHaveBeenCalledWith('/articles', {
            params: {
                _expand: 'user',
                _limit: 12,
                _page: 1,
                _sort: 'createdAt',
                _order: 'asc',
                q: 'My name is Artem',
                type: undefined,
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(mockArticles);
    });
});
