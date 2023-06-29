import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import photosSliceReducer from "../slices/PhotosSlice";
import postsSliceRecucer from '../slices/PostsSlice'
import usersSliceReducer from '../slices/UsersSlice'
const store = configureStore({
    reducer: {
        photos: photosSliceReducer,
        posts: postsSliceRecucer,
        users: usersSliceReducer
    }
})

export default store;