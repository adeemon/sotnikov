import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { selectUsers } from '../../../redux/slices/UsersSlice';
import './styles.css'

import { useForm } from "react-hook-form"
import { deletePost, updatePost } from '../../../redux/slices/PostsSlice';
import { Comments } from '../comments/Comments';
import { addFavourite, removeFavourite, selectFavourites, selectIsFavourite, selectIsFavouriteById } from '../../../redux/slices/FavouritesSlice';
import { FavouriteIcon } from '../../ui-kit/FavouriteIcon';

export function Post({userId, id, title, body}) {

  const { register, handleSubmit } = useForm();
  let [editMode, setEditMode] = useState(false);
  let [commentsOpened, setCommentsOpened] = useState(false);
  
  const dispatch = useDispatch();
  const userNameSelector = useSelector(selectUsers).filter((user) => user.id === userId)[0].name;
  const isFavourite = useSelector(selectIsFavourite(id));

  const onComments = () => {
    setCommentsOpened(!commentsOpened);
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

  const onSubmit = (data) => {
    dispatch(updatePost({userId, id, ...data}))
    setEditMode(false);
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="info">
          <input 
          tabIndex={editMode ? 0 : -1} 
          className={`username + ${editMode ? ' editable' : ''}`} {...register('userName')} 
          defaultValue={userNameSelector} 
          readOnly={!editMode} />
          <input
            tabIndex={editMode ? 0 : -1}
            className={`title + ${editMode ? ' editable' : ''}`} {...register('title')} 
            defaultValue={title} 
            readOnly={!editMode} />
          <input
            tabIndex={editMode ? 0 : -1}
            className={`body + ${editMode ? ' editable' : ''}`} {...register('body')} 
            defaultValue={body} 
            readOnly={!editMode} />
        </div>
      <input className={`${!editMode ? 'hidden' : ''}`}
        type="submit"
        value="Send"
      />
      <input className={`${!editMode ? 'hidden' : ''}`}
        type="reset"
        value="Reset"
      />
    </form>
    <IconButton aria-label="delete" onClick={onComments}>
        <CommentIcon />
    </IconButton>
    <IconButton aria-label="delete" onClick={onEdit}>
        <EditIcon />
    </IconButton>
    <IconButton aria-label="delete" onClick={onFavourite}>
      <FavouriteIcon isFavourite={isFavourite} />
    </IconButton>
    <IconButton aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
    </IconButton>
    {commentsOpened
    ? <Comments postId={id}/>
    : null}
    </div>
  );
}