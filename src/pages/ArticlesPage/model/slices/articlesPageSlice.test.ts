import { ArticleView, Article } from 'entities/Article';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { User } from 'entities/User';
import {
    ArticleBlock,
    ArticleBlockType,
    ArticleType,
} from 'entities/Article/model/types/article';
import { articlesPageActions, articlesPageReducer } from './articlesPageSlice';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';

describe('articlesPageSlice', () => {
    let initialState: ArticlesPageSchema;

    const mockUser: User = {
        id: 'user1',
        username: 'test_user',
        avatar: 'avatar_url',
    };

    const mockArticleBlocks: ArticleBlock[] = [
        {
            id: 'block1',
            type: ArticleBlockType.TEXT,
            paragraphs: ['block1', 'block1'],
            title: 'block1',
        },
        {
            id: 'block2',
            type: ArticleBlockType.IMAGE,
            src: 'image_url',
            title: 'image_url',
        },
    ];

    const mockArticle: Article = {
        id: 'article1',
        user: mockUser,
        title: 'Test Article Title',
        subtitle: 'Test Article Subtitle',
        img: 'image_url',
        views: 100,
        createdAt: '2023-01-01',
        type: [ArticleType.IT, ArticleType.SCIENCE],
        blocks: mockArticleBlocks,
    };

    const mockArticle2: Article = {
        id: 'article2',
        user: mockUser,
        title: 'Test Article Title 2',
        subtitle: 'Test Article Subtitle 2',
        img: 'image_url_2',
        views: 200,
        createdAt: '2023-01-02',
        type: [ArticleType.SCIENCE],
        blocks: mockArticleBlocks,
    };

    beforeEach(() => {
        initialState = {
            isLoading: false,
            error: undefined,
            ids: [],
            entities: {},
            view: ArticleView.PLATE,
            page: 1,
            hasMore: true,
            _innited: false,
        };
    });

    test('should handle initial state', () => {
        expect(articlesPageReducer(undefined, { type: 'unknown' })).toEqual(
            initialState,
        );
    });

    test('should handle setView', () => {
        const view = ArticleView.LIST;
        const state = articlesPageReducer(
            initialState,
            articlesPageActions.setView(view),
        );

        expect(state.view).toEqual(view);
        expect(localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY)).toEqual(
            view,
        );
    });

    test('should handle setPage', () => {
        const page = 2;
        const state = articlesPageReducer(
            initialState,
            articlesPageActions.setPage(page),
        );

        expect(state.page).toEqual(page);
    });

    test('should handle initState', () => {
        localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, ArticleView.LIST);
        const state = articlesPageReducer(
            initialState,
            articlesPageActions.initState(),
        );

        expect(state.view).toEqual(ArticleView.LIST);
        expect(state.limit).toEqual(4);
    });

    describe('fetchArticlesList', () => {
        test('pending', () => {
            const action = { type: fetchArticlesList.pending.type };
            const state = articlesPageReducer(initialState, action);

            expect(state.isLoading).toBe(true);
            expect(state.error).toBeUndefined();
        });

        test('fulfilled', () => {
            const articles: Article[] = [mockArticle, mockArticle2];
            const action = {
                type: fetchArticlesList.fulfilled.type,
                payload: articles,
            };
            const state = articlesPageReducer(initialState, action);

            expect(state.isLoading).toBe(false);
            expect(state.ids.length).toBe(2);
            expect(state.entities.article1).toEqual(mockArticle);
            expect(state.entities.article2).toEqual(mockArticle2);
            expect(state.hasMore).toBe(true);
        });

        test('fulfilled with no more articles', () => {
            const articles: Article[] = [];
            const action = {
                type: fetchArticlesList.fulfilled.type,
                payload: articles,
            };
            const state = articlesPageReducer(initialState, action);

            expect(state.isLoading).toBe(false);
            expect(state.hasMore).toBe(false);
        });

        test('rejected', () => {
            const action = {
                type: fetchArticlesList.rejected.type,
                payload: 'error',
            };
            const state = articlesPageReducer(initialState, action);

            expect(state.isLoading).toBe(false);
            expect(state.error).toBe('error');
        });
    });
});
