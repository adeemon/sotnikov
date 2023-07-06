import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import { selectUserById } from '../../../redux/slices/UsersSlice';


import { deletePost, updatePost } from '../../../redux/slices/PostsSlice';

import { addFavourite, removeFavourite, selectIsFavourite } from '../../../redux/slices/FavouritesSlice';
import { PostView } from './PostView';

export function Post({userId, id, title, body}) {

  let [editMode, setEditMode] = useState(false);
  let [isCommentsOpened, setIsCommentsOpened] = useState(false);
  
  const dispatch = useDispatch();
  const userNameSelector = useSelector(selectUserById(userId));
  const isFavourite = useSelector(selectIsFavourite(id));

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0.1,
    rootMargin: '20px 0px',
  });

  useEffect(()=>{
    console.log(`${id} перерисован`)
  })

  const onComments = () => {
    setIsCommentsOpened(!isCommentsOpened);
  }

  const onEdit = (data) => {
    setEditMode(!editMode);
  }

  const onFavourite = () => {
    if (isFavourite) {
      console.log('delete');
      dispatch(removeFavourite({id}));
    } else {
      console.log('add');
      dispatch(addFavourite({id}));
    }
  }

  const onDelete = () => {
    dispatch(deletePost(id));
  }

  const onSubmit = () => {
    setEditMode(false);
  }

  return (
    <div ref={ref}>
      {inView
      ? <PostView 
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
      : <div></div>}
    </div>
  );
}