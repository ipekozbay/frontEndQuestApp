import * as React from 'react';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InputAdornment from '@mui/material/InputAdornment';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { PostWithAuth } from '../../services/HttpService';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PostForm(props) {
    const { userId, userName, refreshPosts } = props;
    const [title, setTitle] = useState("");
    //    const [liked, setLiked] = useState(false);
    //  const [expanded, setExpanded] = React.useState(false);
    const [text, setText] = useState("");
    const [isSent, setIsSent] = useState(false);

    const savePost = () => {
        PostWithAuth("http://localhost:8080/posts", {
            title: title,
            userId: userId,
            text: text,
        })

            .then((res) => refreshPosts())
            .catch((err) => console.log("error"))
    };

    const handleSubmit = () => {
        savePost();
        setIsSent(true);
        setTitle("");
        setText("");

    };

    const handleTitle = (value) => {
        setTitle(value);
        setIsSent(false);
    };

    const handleText = (value) => {
        setText(value);
        setIsSent(false);

    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    return (

        <div>
            <Snackbar open={isSent} autoHideDuration={1220} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    you post has been sent
                </Alert>
            </Snackbar>
            <Card sx={{ width: 800, textAlign: 'center', margin: 8, }} >
                <CardHeader
                    avatar={
                        <Link
                            to={{ pathname: '/users/' + userId }}
                            style={{ background: 'white', textDecoration: 'none', boxShadow: 'none' }}>

                            <Avatar aria-label="recipe"
                                sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <OutlinedInput
                            id='outlined-adorment-amount'
                            multiline
                            placeholder='Title'
                            inputProps={{ maxLength: 25 }}
                            fullWidth
                            value={title}
                            onChange={(i) => handleTitle(i.target.value)}>

                        </OutlinedInput>
                    }
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput
                            id='outlined-adorment-amount'
                            multiline
                            placeholder='Text'
                            inputProps={{ maxLength: 250 }}
                            fullWidth
                            value={text}
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant='contained'
                                        style={{
                                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                            color: 'white'
                                        }}
                                        onClick={handleSubmit}>
                                        post
                                    </Button>
                                </InputAdornment>
                            }>

                        </OutlinedInput>
                    </Typography>
                </CardContent>

            </Card>
        </div>

    );
}
