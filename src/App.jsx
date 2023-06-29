import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPhotos, selectPhotos } from './redux/slices/PhotosSlice';
import { useSelector } from 'react-redux';
import { Post } from './components/post/Post';
import { fetchPosts, selectPosts } from './redux/slices/PostsSlice';
import { fetchUsers } from './redux/slices/UsersSlice';

function App() {
  const dispatch = useDispatch();
  const postsSelector = useSelector(selectPosts);

  useEffect(()=>{
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    console.log('Fetched');
  },[]);

  const arrayToRender = postsSelector.map((element) => {
    return <Post userId={element.userId} title={element.title} body={element.body} id={element.id} key={element.id}/>
  })

  return (
    <div>
      {arrayToRender}
    </div>
  );
}

export default App;
