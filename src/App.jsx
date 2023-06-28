import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPhotos, selectPhotos } from './redux/slices/PhotosSlice';
import { useSelector } from 'react-redux';
import { Post } from './components/post/Post';
import { fetchPosts, selectPosts } from './redux/slices/PostsSlice';

const testPost =  {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}

function App() {

  const [photos, setAppPhotos] = useState();
  const dispatch = useDispatch();
  const postsSelector = useSelector(selectPosts);

  useEffect(()=>{
    dispatch(fetchPosts());
    console.log(postsSelector);
    console.log('Selector!')
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
