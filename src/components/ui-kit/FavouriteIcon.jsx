import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export function FavouriteIcon({isFavourite}) {
    return (
        <div className='container'>
            {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
    )
}