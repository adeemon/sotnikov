import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async function(_, { rejectWithValue }) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');

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

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async function(id, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            dispatch(removePost({ id }));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const updatePost = createAsyncThunk(
    'posts/updatePost',
    async function({ title, body, userId, id }, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    title: title,
                    body: body
                })
            });

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            dispatch(patchPost({ userId, id, title, body }));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const setError = (state, action) => {
    state.status = 'rejected';
    state.error = action.payload;
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: null,
        error: null
    },
    reducers: {

        fillPosts: (state, action) => {
            state = action.payload;
        },

        removePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload.id)
        },
        patchPost: (state, action) => {
            state.posts = state.posts.map((post) => {
                if (post.id === action.payload.id) {
                    return action.payload;
                }
                return post;
            })
        }
    },
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.posts = action.payload;
        },
        [fetchPosts.rejected]: setError
    }
})

export const selectPosts = (state) => {
    return state.posts.posts;
}

const { fillPosts, removePost, patchPost } = postsSlice.actions;

export default postsSlice.reducer