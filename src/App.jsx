import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPhotos, selectPhotos } from './redux/slices/PhotosSlice';
import { useSelector } from 'react-redux';

function App() {

  const [photos, setAppPhotos] = useState();
  const dispatch = useDispatch();
  const photosSelector = useSelector(selectPhotos);

  useEffect(()=>{
    dispatch(fetchPhotos());
    console.log(photosSelector);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
