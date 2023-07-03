import styles from './styles.module.scss';
import { useForm } from "react-hook-form";
import classNames from 'classnames';
import { FavouriteButton } from '../../ui-kit/buttons/FavouriteButton';
import { CommentsButton } from '../../ui-kit/buttons/CommentsButton';
import { DeleteButton } from '../../ui-kit/buttons/DeleteButton';
import { EditButton } from '../../ui-kit/buttons/EditButton';
import { Comments } from '../comments/Comments';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../../redux/slices/PostsSlice';
import { updateUser } from '../../../redux/slices/UsersSlice';
import { useEffect } from 'react';

export function PostView ({onSubmit, editMode, isCommentsOpened, isFavourite,
    userName, title, body, onComments, onEdit, onFavourite, onDelete, id, userId}) {

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const onFormSubmit = (data) => {
      onSubmit();
      dispatch(updatePost({userId, id, ...data}))
      dispatch(updateUser({id, ...data}))
    }

    return (
      <div className={styles.container}> 
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div>{userName}</div>
          <div className={ styles.info }>
            <input
              tabIndex={editMode ? 0 : -1} 
              className={classNames(styles.title, editMode ? styles.editable : null)} {...register('name')} 
              defaultValue={userName} 
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