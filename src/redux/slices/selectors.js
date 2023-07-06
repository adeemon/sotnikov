import { createSelector } from "@reduxjs/toolkit";
import { selectIsLoaded } from "./CommentsSlice";
import { selectIsUsersLoaded } from "./UsersSlice";

export const selectIsAppLoaded = createSelector([selectIsUsersLoaded, selectIsLoaded],
    (isUsersLoaded, isLoaded) => {
        return isUsersLoaded && isLoaded;
    })