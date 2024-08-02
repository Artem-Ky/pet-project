import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Comment } from 'entities/Comment';
import { User } from 'entities/User';
import { fetchCommentsByArticleId } from './fetchCommentsByArticleId';

describe('fetchCommentsByArticleId.test', () => {
    test('success', async () => {
        const comments: Comment[] = [
            {
                id: '1',
                text: 'Test comment',
                user: { id: '1', username: 'toad' } as User,
            },
            {
                id: '2',
                text: 'Test comment 2',
                user: { id: '1', username: 'toad' } as User,
            },
        ];
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: comments }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalledWith('/comments', {
            params: {
                articleId: '1',
                _expand: 'user',
            },
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(comments);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 500 }));

        const result = await thunk.callThunk('1');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });

    test('no articleId', async () => {
        const thunk = new TestAsyncThunk(fetchCommentsByArticleId);

        const result = await thunk.callThunk(undefined);

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });
});
