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
    const { userId, userName } = props;
    const [title, setTitle] = useState("");
    const [liked, setLiked] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [text, setText] = useState("");

    const savePost=()=>{
        fetch("http://localhost:8080/posts",
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title:title,
                userId:userId,
                text:text,
            }),
        })
        .then((res)=> res.json())
        .catch((err)=>console.log("error"))
    }

    const handleSubmit = () => {
        savePost();
    }

    const handleTitle = (value) => {
        setTitle(value);
    }

    const handleText=(value)=>{
        setText(value);
    }

    return (
        <div>
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
                            onChange={(i) => handleTitle(i.target.value)}
                            fullWidth>
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
                            onChange={(i) => handleText(i.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <Button
                                        variant='contained'
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
