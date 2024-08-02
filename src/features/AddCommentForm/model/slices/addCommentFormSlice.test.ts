import { addCommentFormReducer, addCommentFormActions } from './addCommentFormSlice';
import { addCommentStateSchema } from '../types/addCommentType';

describe('addCommentFormSlice', () => {
    test('should return the initial state', () => {
        expect(addCommentFormReducer(undefined, { type: '' })).toEqual({
            text: '',
            error: undefined,
        });
    });

    test('should handle setText', () => {
        const initialState: addCommentStateSchema = {
            text: '',
            error: undefined,
        };

        const expectedState: addCommentStateSchema = {
            text: 'New comment',
            error: undefined,
        };

        expect(addCommentFormReducer(initialState, addCommentFormActions.setText('New comment'))).toEqual(expectedState);
    });
});
