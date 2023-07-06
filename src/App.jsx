import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { PostTab } from './components/layout/postTab/PostTab';
import { fetchComments } from './redux/slices/CommentsSlice';
import { fetchPosts } from './redux/slices/PostsSlice';
import { selectIsAppLoaded } from './redux/slices/selectors';
import { fetchUsers } from './redux/slices/UsersSlice';

function App() {
  const dispatch = useDispatch();
  const isAppLoaded = useSelector(selectIsAppLoaded);

  useEffect(()=>{
    dispatch(fetchPosts());
    dispatch(fetchUsers());
    dispatch(fetchComments());
    console.log('Fetched');
  },[])

  useEffect(() => {
    console.log('Апа ререндер')
  })

  return (
    <div>
      {isAppLoaded 
      ? <PostTab />
      : <CircularProgress />
    }
    </div>
  )
}

export default App;
