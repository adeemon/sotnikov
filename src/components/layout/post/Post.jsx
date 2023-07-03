import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { selectUserById, selectUsers } from '../../../redux/slices/UsersSlice';
import styles from './styles.module.scss'
import classNames from 'classnames';

import { useForm } from "react-hook-form"
import { deletePost, updatePost } from '../../../redux/slices/PostsSlice';
import { Comments } from '../comments/Comments';
import { addFavourite, removeFavourite, selectIsFavourite } from '../../../redux/slices/FavouritesSlice';
import { FavouriteButton } from '../../ui-kit/buttons/FavouriteButton';
import { CommentsButton } from '../../ui-kit/buttons/CommentsButton';
import { DeleteButton } from '../../ui-kit/buttons/DeleteButton';
import { EditButton } from '../../ui-kit/buttons/EditButton';

export function Post({userId, id, title, body}) {

  const { register, handleSubmit } = useForm();
  let [editMode, setEditMode] = useState(false);
  let [isCommentsOpened, setIsCommentsOpened] = useState(false);
  
  const dispatch = useDispatch();
  const userNameSelector = useSelector(selectUserById(userId));
  const isFavourite = useSelector(selectIsFavourite(id));

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

  const onSubmit = (data) => {
    dispatch(updatePost({userId, id, ...data}))
    setEditMode(false);
  }

  return (
    <div className={styles.container}> 
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={ styles.info }>
          <input 
          tabIndex={editMode ? 0 : -1} 
          className={classNames(styles.title, editMode ? styles.editable : null)} {...register('userName')} 
          defaultValue={userNameSelector} 
          readOnly={!editMode} />
          <input
            tabIndex={editMode ? 0 : -1}
            className={classNames(styles.email, editMode ? styles.editable : null)} {...register('title')} 
            defaultValue={title} 
            readOnly={!editMode} />
          <input
            tabIndex={editMode ? 0 : -1}
            className={classNames(styles.body, editMode ? styles.editable : null)} {...register('body')} 
            defaultValue={body} 
            readOnly={!editMode} />
        </div>
      <input className={!editMode ? styles.hidden : null}
        type="submit"
        value="Send"
      />
      <input className={!editMode ? styles.hidden : null}
        type="reset"
        value="Reset"
      />
    </form>
    <CommentsButton onClick={onComments} isActive={isCommentsOpened}/>
    <EditButton onClick={onEdit} />
    <FavouriteButton isFavourite={isFavourite} onClick={onFavourite} />
    <DeleteButton onClick={onDelete} />
    {isCommentsOpened
    ? <Comments postId={id}/>
    : null}
    </div>
  );
}