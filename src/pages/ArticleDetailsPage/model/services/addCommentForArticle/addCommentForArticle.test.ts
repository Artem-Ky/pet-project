import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Comment } from 'entities/Comment';
import { getUserAuthData, User } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article';
import { fetchCommentsByArticleId } from '../../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticle } from './addCommentForArticle';

jest.mock('entities/User', () => ({
    getUserAuthData: jest.fn(),
}));
jest.mock('entities/Article', () => ({
    getArticleDetailsData: jest.fn(),
}));
jest.mock('../../services/fetchCommentsByArticleId/fetchCommentsByArticleId');

describe('addCommentForArticle.test', () => {
    test('success', async () => {
        const comment: Comment = {
            id: '1',
            text: 'Test comment',
            user: { id: '1', username: 'toad' } as User,
        };
        const thunk = new TestAsyncThunk(addCommentForArticle);
        (getUserAuthData as jest.Mock).mockReturnValue({ id: '1' });
        (getArticleDetailsData as jest.Mock).mockReturnValue({ id: '1' });
        thunk.api.post.mockReturnValue(Promise.resolve({ data: comment }));

        const result = await thunk.callThunk('Test comment');

        expect(thunk.api.post).toHaveBeenCalledWith('/comments', {
            articleId: '1',
            userId: '1',
            text: 'Test comment',
        });
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(comment);
        expect(thunk.dispatch).toHaveBeenCalledWith(
            fetchCommentsByArticleId('1'),
        );
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle);
        (getUserAuthData as jest.Mock).mockReturnValue({ id: '1' });
        (getArticleDetailsData as jest.Mock).mockReturnValue({ id: '1' });
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 500 }));

        const result = await thunk.callThunk('Test comment');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('error');
    });

    test('no user data', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle);
        (getUserAuthData as jest.Mock).mockReturnValue(null);
        (getArticleDetailsData as jest.Mock).mockReturnValue({ id: '1' });

        const result = await thunk.callThunk('Test comment');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('no data');
    });

    test('no article data', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticle);
        (getUserAuthData as jest.Mock).mockReturnValue({ id: '1' });
        (getArticleDetailsData as jest.Mock).mockReturnValue(null);

        const result = await thunk.callThunk('Test comment');

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toBe('no data');
    });
});
