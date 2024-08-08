import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ArticleSortField, ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/types';
import { initArticlesPage } from './initArticlesPage';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../slices/articlesPageSlice';

jest.mock('../fetchArticlesList/fetchArticlesList');

describe('initArticlesPage', () => {
    test('success initialization with URL params', async () => {
        const searchParams = new URLSearchParams({
            order: 'desc',
            sort: ArticleSortField.CREATED,
            search: 'My name is Artem',
            type: ArticleType.IT,
        });

        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: false,
            },
        });

        await thunk.callThunk(searchParams);

        expect(thunk.dispatch).toHaveBeenCalledTimes(8);
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setOrder('desc' as SortOrder),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setSort(ArticleSortField.CREATED),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setSearch('My name is Artem'),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.setType(ArticleType.IT),
        );
        expect(thunk.dispatch).toHaveBeenCalledWith(
            articlesPageActions.initState(),
        );
        expect(fetchArticlesList).toHaveBeenCalledWith({});
    });

    test('page already initialized', async () => {
        const searchParams = new URLSearchParams();

        const thunk = new TestAsyncThunk(initArticlesPage, {
            articlesPage: {
                _inited: true,
            },
        });

        await thunk.callThunk(searchParams);

        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
