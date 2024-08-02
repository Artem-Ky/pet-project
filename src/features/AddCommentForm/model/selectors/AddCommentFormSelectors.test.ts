import { StateSchema } from 'app/providers/StoreProvider';
import { DeepPartial } from 'utility-types';
import {
    getAddCommentFormText,
    getAddCommentFormError,
} from './AddCommentFormSelectors';

describe('getAddCommentFormText', () => {
    test('should return comment text', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text: 'Test comment',
                error: undefined,
            },
        };

        expect(getAddCommentFormText(state as StateSchema)).toEqual('Test comment');
    });

    test('should return undefined if no text', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text: undefined,
                error: undefined,
            },
        };

        expect(getAddCommentFormText(state as StateSchema)).toBeUndefined();
    });

    test('should return undefined if addCommentForm is undefined', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getAddCommentFormText(state as StateSchema)).toBeUndefined();
    });
});

describe('getAddCommentFormError', () => {
    test('should return comment error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text: 'Test comment',
                error: 'Test error',
            },
        };

        expect(getAddCommentFormError(state as StateSchema)).toEqual('Test error');
    });

    test('should return undefined if no error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: {
                text: 'Test comment',
                error: undefined,
            },
        };

        expect(getAddCommentFormError(state as StateSchema)).toBeUndefined();
    });

    test('should return undefined if addCommentForm is undefined', () => {
        const state: DeepPartial<StateSchema> = {};

        expect(getAddCommentFormError(state as StateSchema)).toBeUndefined();
    });
});
