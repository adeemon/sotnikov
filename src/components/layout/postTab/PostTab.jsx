import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPhotos, selectPhotos } from '../../../redux/slices/PhotosSlice';
import { useSelector } from 'react-redux';
import { Post } from '../post/Post';
import { fetchPosts, selectPosts } from '../../../redux/slices/PostsSlice';
import { fetchUsers, selectIsUsersLoaded } from '../../../redux/slices/UsersSlice';
import { fetchComments } from '../../../redux/slices/CommentsSlice';
import { CircularProgress } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import styles from './styles.module.scss'

export function PostTab() {
    const dispatch = useDispatch();
    const postsSelector = useSelector(selectPosts);
    const isUsersLoaded = useSelector(selectIsUsersLoaded);
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });

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
        <div className={styles.container} ref={ref}>
        {isUsersLoaded 
        ? arrayToRender 
        : <CircularProgress />
        }
        </div>
    );
}