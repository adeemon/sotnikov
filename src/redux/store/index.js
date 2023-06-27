import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import photosSliceReducer from "../slices/PhotosSlice";
const store = configureStore({
    reducer: {
        photos: photosSliceReducer,
    }
})

export default store;