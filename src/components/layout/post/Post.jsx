import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


import { selectUserById } from '../../../redux/slices/UsersSlice';


import { deletePost } from '../../../redux/slices/PostsSlice';

import { addFavourite, removeFavourite, selectIsFavourite } from '../../../redux/slices/FavouritesSlice';
import { PostView } from './PostView';

export const Post = React.memo(PostY);

export function PostY({userId, id, title, body}) {

  let [editMode, setEditMode] = useState(false);
  let [isCommentsOpened, setIsCommentsOpened] = useState(false);
  
  const dispatch = useDispatch();
  const userNameSelector = useSelector(selectUserById(userId));
  const isFavourite = useSelector(selectIsFavourite(id));

  useEffect(() => {
    console.log(`${id} перерисован`)
  })

  const onComments = useCallback(() => {
    setIsCommentsOpened(!isCommentsOpened);
  },[isCommentsOpened]);

  const onEdit = useCallback(() => {
    setEditMode(!editMode);
  },[editMode]);

  const onFavourite = useCallback(() => {
    if (isFavourite) {
      console.log('delete');
      dispatch(removeFavourite({id}));
    } else {
      console.log('add');
      dispatch(addFavourite({id}));
    }
  },[isFavourite]);

  const onDelete = useCallback(() => {
    dispatch(deletePost(id));
  },[]);

  const onSubmit = useCallback(() => {
    setEditMode(false);
  },[]);

  return (
    <PostView 
      editMode = {editMode}
      isCommentsOpened = {isCommentsOpened}
      isFavourite = {isFavourite}
      userName = {userNameSelector}
      title = {title}
      body = {body}
      onComments = {onComments}
      onEdit = {onEdit}
      onFavourite = {onFavourite}
      onDelete = {onDelete}
      onSubmit = {onSubmit}
      id = {id}
      key = {id}
      userId = {userId}
    />
  )
}