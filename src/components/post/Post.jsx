import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { selectUserByID, selectUsers } from '../../redux/slices/UsersSlice';
import './styles.css'

import { useForm } from "react-hook-form"
import { updatePost } from '../../redux/slices/PostsSlice';

export function Post({userId, id, title, body}) {

  const { register, handleSubmit, reset } = useForm();
  let [editMode, setEditMode] = useState(false);
  let [userName, setUserName] = useState();
  const dispatch = useDispatch();
  const userNameSelector = useSelector(selectUsers).filter((user) => user?.id === userId);

  useEffect(()=>{
    console.log('Пост перерисован');
    console.log('Пропсы = ',{userId, id, title, body});
    if (userNameSelector.length > 0){
      try {
        setUserName(userNameSelector[0].name)
      } catch (error){
        console.log(error);
      }
    }
  },[userNameSelector])

  const onComments = () => {
    console.log('comments!')
  }

  const onEdit = (data) => {
    //reset();
    setEditMode(!editMode);
  }

  const onFavourite = () => {
    console.log('favourite!')
  }

  const onDelete = () => {
    console.log('delete!')
  }

  const onSubmit = (data) => {
    console.log(data);
    dispatch(updatePost({userId, id, ...data}))
    setEditMode(false);
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)} onAbort={()=>console.log('aborted') } >
      <input className={`username + ${editMode ? ' editable' : ''}`} {...register('userName')} defaultValue={userName} readOnly={!editMode} />
      <input className={`title + ${editMode ? ' editable' : ''}`} {...register('title')} defaultValue={title} readOnly={!editMode} />
      <input className={`body + ${editMode ? ' editable' : ''}`} {...register('body')} defaultValue={body} readOnly={!editMode} />
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
        <FavoriteIcon />
    </IconButton>
    <IconButton aria-label="delete" onClick={onDelete}>
        <DeleteIcon />
    </IconButton>
    </div>
  );
}
