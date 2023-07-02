import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPhotos, selectPhotos } from './redux/slices/PhotosSlice';
import { useSelector } from 'react-redux';
import { Post } from './components/layout/post/Post';
import { fetchPosts, selectPosts } from './redux/slices/PostsSlice';
import { fetchUsers, selectIsUsersLoaded } from './redux/slices/UsersSlice';
import { fetchComments } from './redux/slices/CommentsSlice';
import { CircularProgress } from '@mui/material';

function App() {
  const dispatch = useDispatch();
  const postsSelector = useSelector(selectPosts);
  const isUsersLoaded = useSelector(selectIsUsersLoaded);

  useEffect(()=>{
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    dispatch(fetchComments());
    console.log('Fetched');
  },[]);

  const arrayToRender = postsSelector.map((element) => {
    return <Post userId={element.userId} title={element.title} body={element.body} id={element.id} key={element.id}/>
  })

  return (
    <div>
      {isUsersLoaded 
      ? arrayToRender 
      : <CircularProgress />
      }
    </div>
  );
}

export default App;
