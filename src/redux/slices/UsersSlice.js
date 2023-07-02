import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function(_, { rejectWithValue }) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const result = await response.json();
            console.log('Загрузили юзеров');
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

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.users = action.payload;
        },
        [fetchUsers.rejected]: setError
    }
})

export const selectUsers = (state) => {
    return state.users.status === 'loaded' ? state.users.users : null;
}

export const selectIsUsersLoaded = (state) => {
    return state.users.status === 'loaded';
}

export default usersSlice.reducer