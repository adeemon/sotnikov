import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: {
        favourites: []
    },
    reducers: {
        addFavourite: (state, action) => {
            state.favourites.push(action.payload.id);
        },
        removeFavourite: (state, action) => {

            state.favourites = state.favourites.filter((favourite) => {
                console.log(favourite);
                console.log(action.payload.id)
                return action.payload.id !== favourite;
            })
        }
    }
})

export const selectIsFavourite = id => state => {
    return state.favourites.favourites.includes(id);
}
export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;