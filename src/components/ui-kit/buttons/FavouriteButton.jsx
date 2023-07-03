import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import styles from './styles.module.scss'

export function FavouriteButton({isFavourite, onClick}) {
    return (
        <IconButton aria-label="set-favourite-button" onClick={onClick}>
            {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton> 
    )
}