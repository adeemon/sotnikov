import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export function DeleteButton ({onClick}) {
    return (
        <IconButton aria-label="delete" onClick={onClick}>
            <DeleteIcon />
        </IconButton>
    )
}