import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async function(_, { rejectWithValue }) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const result = await response.json();

            return result;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: {
        [fetchComments.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchComments.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.comments = action.payload;
        },
        [fetchComments.rejected]: setError
    }
})

export const selectComments = (state) => {
    return state.comments.comments;
}

export const selectCommentsByUserID = (state, userId) => {
    return state.comments.comments.filter((comment) => comment.userId === userId)
}

export const selectIsLoaded = (state) => {
    return state.comments.status === 'loaded'
}

export default commentsSlice.reducer