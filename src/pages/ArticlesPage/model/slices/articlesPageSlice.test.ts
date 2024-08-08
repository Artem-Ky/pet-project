import {
    Article,
    ArticleSortField,
    ArticleType,
    ArticleView,
} from 'entities/Article';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { SortOrder } from 'shared/types';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions, articlesPageReducer } from './articlesPageSlice';

describe('articlesPageSlice', () => {
    let initialState: ArticlesPageSchema;

    beforeEach(() => {
        initialState = {
            isLoading: false,
            error: undefined,
            ids: [],
            entities: {},
            view: ArticleView.PLATE,
            page: 1,
            hasMore: true,
            limit: 12,
            sort: ArticleSortField.CREATED,
            search: '',
            order: 'desc',
            type: ArticleType.ALL,
            _inited: false,
        };
    });

    // Тесты для обычных экшенов
    test('should handle setOrder', () => {
        const order = 'asc' as SortOrder;
        const state = articlesPageReducer(
            initialState,
            articlesPageActions.setOrder(order),
        );
        expect(state.order).toEqual(order);
    });

    test('should handle setSort', () => {
        const sort = ArticleSortField.TITLE;
        const state = articlesPageReducer(
            initialState,
            articlesPageActions.setSort(sort),
        );
        expect(state.sort).toEqual(sort);
    });

    test('should handle setSearch', () => {
        const search = 'React';
        const state = articlesPageReducer(
            initialState,
            articlesPageActions.setSearch(search),
        );
        expect(state.search).toEqual(search);
    });

    test('should handle setType', () => {
        const type = ArticleType.IT;
        const state = articlesPageReducer(
            initialState,
            articlesPageActions.setType(type),
        );
        expect(state.type).toEqual(type);
    });

    // Тесты для fetchArticlesList
    describe('fetchArticlesList', () => {
        const mockArticle: Article = {
            id: 'article1',
            user: { id: 'user1', username: 'test_user', avatar: 'avatar_url' },
            title: 'Test Article Title',
            subtitle: 'Test Article Subtitle',
            img: 'image_url',
            views: 100,
            createdAt: '2023-01-01',
            type: [ArticleType.IT],
            blocks: [],
        };

        const mockArticle2: Article = {
            id: 'article2',
            user: {
                id: 'user2',
                username: 'test_user2',
                avatar: 'avatar_url2',
            },
            title: 'Test Article Title 2',
            subtitle: 'Test Article Subtitle 2',
            img: 'image_url_2',
            views: 200,
            createdAt: '2023-01-02',
            type: [ArticleType.SCIENCE],
            blocks: [],
        };

        test('pending', () => {
            const action = {
                type: fetchArticlesList.pending.type,
                meta: { arg: { replace: false } },
            };
            const state = articlesPageReducer(initialState, action);
            expect(state.isLoading).toBe(true);
            expect(state.error).toBeUndefined();
        });

        test('fulfilled', () => {
            const articles: Article[] = [mockArticle, mockArticle2];
            const action = {
                type: fetchArticlesList.fulfilled.type,
                payload: articles,
                meta: { arg: { replace: false } },
            };
            const state = articlesPageReducer(initialState, action);

            expect(state.isLoading).toBe(false);
            expect(state.ids.length).toBe(2);
            expect(state.entities.article1).toEqual(mockArticle);
            expect(state.entities.article2).toEqual(mockArticle2);
            expect(state.hasMore).toBe(false);
        });

        test('fulfilled with replace', () => {
            const articles: Article[] = [mockArticle];
            const action = {
                type: fetchArticlesList.fulfilled.type,
                payload: articles,
                meta: { arg: { replace: true } },
            };
            const state = articlesPageReducer(
                {
                    ...initialState,
                    ids: ['article2'],
                    entities: { article2: mockArticle2 },
                },
                action,
            );

            expect(state.isLoading).toBe(false);
            expect(state.ids.length).toBe(1);
            expect(state.entities.article1).toEqual(mockArticle);
            expect(state.entities.article2).toBeUndefined();
            expect(state.hasMore).toBe(false);
        });

        test('fulfilled with no more articles', () => {
            const articles: Article[] = [];
            const action = {
                type: fetchArticlesList.fulfilled.type,
                payload: articles,
                meta: { arg: { replace: false } },
            };
            const state = articlesPageReducer(initialState, action);

            expect(state.isLoading).toBe(false);
            expect(state.hasMore).toBe(false);
        });

        test('rejected', () => {
            const action = {
                type: fetchArticlesList.rejected.type,
                payload: 'error',
                meta: { arg: { replace: false } },
            };
            const state = articlesPageReducer(initialState, action);

            expect(state.isLoading).toBe(false);
            expect(state.error).toBe('error');
        });
    });
});
