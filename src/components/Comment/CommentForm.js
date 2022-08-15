import { Button, Card, CardContent, InputAdornment, inputAdornmentClasses, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

export default function CommentForm(props) {
    const { userId, userName, postId, refreshComments } = props;
    const [text, setText] = useState("");

    const saveComment = () => {
        fetch("http://localhost:8080/comments",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    postId: postId,
                    userId: userId,
                    text: text,
                }),
            })
            .then((res) => refreshComments())
            .catch((err) => console.log("error"))
    };

    const handleSubmit=()=>{
        saveComment();
        setText("");
    }

    const handleChange=(value)=>{
        setText(value);
    }


    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
        }}>
            <OutlinedInput
                id='outlined-adorment-amount'
                multiline
                placeholder='Title'
                inputProps={{ maxLength: 250 }}
                fullWidth
                onChange={(i)=> handleChange(i.target.value)}
                startAdornment={
                    <InputAdornment position="start" >
                        <Link
                            to={{ pathname: '/users/' + userId }}
                            style={{ background: 'white', textDecoration: 'none', boxShadow: 'none' }}>

                            <Avatar aria-label="recipe"
                                sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', textDecoration: "none", boxShadow: "none" }}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment position="end">
                        <Button
                            variant='contained'
                            style={{
                                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                color: 'white'}}
                            onClick={handleSubmit}>
                            comment
                        </Button>
                    </InputAdornment>
                }
                value={text}
                style={{ color: "black", backgroundColor: "white" }}>
            </OutlinedInput>

        </CardContent>
    )
}
