import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import photosSliceReducer from "../slices/PhotosSlice";
import postsSliceRecucer from '../slices/PostsSlice'
const store = configureStore({
    reducer: {
        photos: photosSliceReducer,
        posts: postsSliceRecucer
    }
})

export default store;