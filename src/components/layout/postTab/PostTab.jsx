import React, { useEffect, useState } from 'react';
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

export const PostTab = React.memo(PostTabY);


export function PostTabY() {
    const dispatch = useDispatch();
    const postsSelector = useSelector(selectPosts);

    useEffect(()=>{
        console.log('таба ререндер');
        console.log(postsSelector);
    },[dispatch])

    const arrayToRender = postsSelector.map((element) => {
        return <Post userId={element.userId} title={element.title} body={element.body} id={element.id} key={element.id}/>
    })

    return (
        <div className={styles.container} >
        {postsSelector.length > 0 
        ? arrayToRender
        : 'kwkws'}
        </div>
    );
}