import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import { Radio } from "@mui/material";
import { PutWithAuth } from "../../services/HttpService";

export default function Avatar(props) {
    const { avatarId, userId, userName } = props;
    const [checked, setChecked] = React.useState([1]);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(avatarId || 0);

    const saveAvatar = () => {
        PutWithAuth("http://localhost:8080/users/" + localStorage.getItem("currentUser"), {
            avatar: selectedValue,
        })

            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => {

        setOpen(false);
        saveAvatar();
    }
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div>
            <Card sx={{ maxWidth: 250, margin: 5 }}>
                <CardMedia
                    component="img"
                    image={`/avatars/avatar${selectedValue}.png`}
                    alt="user avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    </Typography>
                </CardContent>
                <CardActions>
                    {localStorage.getItem("currentUser") == userId ? 
                    <Button onClick={handleOpen}>change avatar</Button> : ""}
                </CardActions>
            </Card>
            <Modal
                style={{ display: "flex", maxWidth: 345 }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <List dense sx={{ maxWidth: 300 }}>
                    {[1, 2, 3, 4, 5, 6].map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem
                                key={value} button
                                disablePadding
                            >
                                <CardMedia
                                    style={{ maxWidth: 100, display: "flex" }}
                                    component="img"
                                    alt={`Avatar n??${value}`}
                                    image={`/avatars/avatar${value}.png`}
                                    title="User Avatar"
                                />
                                <ListItemText id={labelId} />

                                <Radio
                                    edge="end"
                                    value={value}
                                    onChange={handleChange}
                                    checked={"" + selectedValue === "" + value}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </Modal>
        </div>
    );
}