import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPhotos, selectPhotos } from './redux/slices/PhotosSlice';
import { useSelector } from 'react-redux';

function Photo(img, title, author, id) {

  const [photos, setAppPhotos] = useState();
  const dispatch = useDispatch();
  const photosSelector = useSelector(selectPhotos);

  useEffect(()=>{
    dispatch(fetchPhotos());
    console.log(photosSelector);
  }, []);

  return (
    <div></div>
  );
}
