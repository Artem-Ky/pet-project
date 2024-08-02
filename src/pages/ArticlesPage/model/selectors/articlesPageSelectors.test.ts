import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';
import { DeepPartial } from 'utility-types';
import {
    getArticlesPageIsLoading,
    getArticlesPageError,
    getArticlesPageView,
    getArticlesPageNum,
    getArticlesPageLimit,
    getArticlesPageHasMore,
} from './articlesPageSelectors';

describe('Articles Page Selectors', () => {
    const state: DeepPartial<StateSchema> = {
        articlesPage: {
            isLoading: true,
            error: 'Some error',
            view: ArticleView.LIST,
            page: 2,
            limit: 10,
            hasMore: false,
        },
    };

    test('getArticlesPageIsLoading', () => {
        expect(getArticlesPageIsLoading(state as StateSchema)).toBe(true);
    });

    test('getArticlesPageError', () => {
        expect(getArticlesPageError(state as StateSchema)).toBe('Some error');
    });

    test('getArticlesPageView', () => {
        expect(getArticlesPageView(state as StateSchema)).toBe(ArticleView.LIST);
    });

    test('getArticlesPageNum', () => {
        expect(getArticlesPageNum(state as StateSchema)).toBe(2);
    });

    test('getArticlesPageLimit', () => {
        expect(getArticlesPageLimit(state as StateSchema)).toBe(10);
    });

    test('getArticlesPageHasMore', () => {
        expect(getArticlesPageHasMore(state as StateSchema)).toBe(false);
    });

    // Проверка значений по умолчанию
    test('getArticlesPageIsLoading with default state', () => {
        const defaultState: DeepPartial<StateSchema> = {};
        expect(getArticlesPageIsLoading(defaultState as StateSchema)).toBe(false);
    });

    test('getArticlesPageView with default state', () => {
        const defaultState: DeepPartial<StateSchema> = {};
        expect(getArticlesPageView(defaultState as StateSchema)).toBe(ArticleView.PLATE);
    });

    test('getArticlesPageNum with default state', () => {
        const defaultState: DeepPartial<StateSchema> = {};
        expect(getArticlesPageNum(defaultState as StateSchema)).toBe(1);
    });

    test('getArticlesPageLimit with default state', () => {
        const defaultState: DeepPartial<StateSchema> = {};
        expect(getArticlesPageLimit(defaultState as StateSchema)).toBe(12);
    });

    test('getArticlesPageHasMore with default state', () => {
        const defaultState: DeepPartial<StateSchema> = {};
        expect(getArticlesPageHasMore(defaultState as StateSchema)).toBeUndefined();
    });
});
