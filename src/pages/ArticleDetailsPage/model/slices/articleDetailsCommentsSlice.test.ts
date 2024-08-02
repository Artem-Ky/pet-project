import { Comment } from 'entities/Comment';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentsSchema } from '../types/ArticleDetailsCommentsSchema';
import { articleDetailsCommentsReducer, commentsAdapter } from './articleDetailsCommentsSlice';

const initialState = commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {},
});

describe('articleDetailsCommentsSlice', () => {
    test('should handle initial state', () => {
        expect(articleDetailsCommentsReducer(undefined, { type: '' })).toEqual(initialState);
    });

    test('should handle fetchCommentsByArticleId.pending', () => {
        const action = { type: fetchCommentsByArticleId.pending.type };
        const state = articleDetailsCommentsReducer(initialState, action);
        expect(state.isLoading).toEqual(true);
        expect(state.error).toEqual(undefined);
    });

    test('should handle fetchCommentsByArticleId.fulfilled', () => {
        const comments: Comment[] = [{ id: '1', text: 'Test comment' } as Comment];
        const action = { type: fetchCommentsByArticleId.fulfilled.type, payload: comments };
        const state = articleDetailsCommentsReducer(initialState, action);
        expect(state.isLoading).toEqual(false);
        expect(state.error).toEqual(undefined);
        expect(state.ids).toEqual(['1']);
        expect(state.entities['1']).toEqual(comments[0]);
    });

    test('should handle fetchCommentsByArticleId.rejected', () => {
        const action = { type: fetchCommentsByArticleId.rejected.type, payload: 'Error message' };
        const state = articleDetailsCommentsReducer(initialState, action);
        expect(state.isLoading).toEqual(false);
        expect(state.error).toEqual('Error message');
    });
});
