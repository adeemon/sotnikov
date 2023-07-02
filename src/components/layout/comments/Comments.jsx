import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import { selectComments, selectCommentsByUserID, selectIsLoaded } from "../../../redux/slices/CommentsSlice"
import { Comment } from "../comment/Comment";


export function Comments({postId}) {
    const isLoaded = useSelector(selectIsLoaded);
    const userComments = useSelector(selectComments).filter((comment) => {
        return comment.postId === postId;
    })

    const commentsToRender = userComments.map((comment) => {   
        return <Comment body={comment.body} 
        name={comment.name}
        email={comment.email}
        key={comment.id} />
        }
    )

    useEffect(()=> {
        console.log('comments');
        console.log(userComments);
    })
    return (
        <div className="container">
            {isLoaded 
            ? <div>{commentsToRender}</div>
            : <div><CircularProgress /></div>
            }
        </div>
    )
}