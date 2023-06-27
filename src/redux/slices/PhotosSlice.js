import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPhotos = createAsyncThunk(
    'photos/fetchPhotos',
    async function(_, { rejectWithValue }) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos');

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

export const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        photos: [],
        status: null,
        error: null
    },
    reducers: {

        fillPhotoes: (state, action) => {
            state = action.payload;
        }
    },
    extraReducers: {
        [fetchPhotos.pending]: (state) => {
            state.status = 'loading';
        },
        [fetchPhotos.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.photos = action.payload;
        },
        [fetchPhotos.rejected]: setError
    }
})

export const selectPhotos = (state) => {
    return state.photos.photos;
}

export default photosSlice.reducer