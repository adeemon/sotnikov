import { IconButton } from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import styles from './styles.module.scss'

export function CommentsButton({onClick, isActive}) {
    return (
        <IconButton className={isActive ? styles.activeComment : null} aria-label="toggle-comments-button" onClick={onClick}>
            <CommentIcon />
        </IconButton>
    )
}