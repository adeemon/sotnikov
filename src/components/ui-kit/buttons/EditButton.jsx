import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

export function EditButton ({onClick}) {
    return (
        <IconButton aria-label="edit-button" onClick={onClick}>
            <EditIcon />
        </IconButton>
    )
}