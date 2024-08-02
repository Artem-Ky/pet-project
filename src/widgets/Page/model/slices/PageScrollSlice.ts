import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pageScrollSchema } from '../types/PageScrollSchema';

const initialState: pageScrollSchema = {
    scroll: {},
};

export const pageScrollSlice = createSlice({
    name: 'pageScroll',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const { actions: pageScrollActions } = pageScrollSlice;
export const { reducer: pageScrollReducer } = pageScrollSlice;
