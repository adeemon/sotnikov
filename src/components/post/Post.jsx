import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CommentIcon from '@mui/icons-material/Comment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

export function Post({userId, id, title, body}) {

    const [userName, setUserName] = useState(null);

    useEffect(async ()=>{
        const result = await fetch(`https://jsonplaceholder.typicode.com/users/1`)
        const userInfo = await result.json();
        console.log(userInfo.name + ' user info')
        setUserName(userInfo.name)
    },[userName])

  const onComments = () => {
    console.log('comments!')
  }

  const onEdit = () => {
    console.log('edit!')
  }

  const onFavourite = () => {
    console.log('favourite!')
  }

  const onDelete = () => {
    console.log('delete!')
  }

  return (
    <div className='container'>
        <div className='userName'>
            {userName}
        </div>
        <div className="title">
            {title}
        </div>
        <div className="body">
            {body}
        </div>  
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
