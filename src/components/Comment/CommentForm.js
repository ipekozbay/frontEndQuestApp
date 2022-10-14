import { Button, Card, CardContent, InputAdornment, inputAdornmentClasses, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { PostWithAuth, RefreshToken } from "../../services/HttpService";

export default function CommentForm(props) {
    const { userId, userName, postId, refreshComments, setCommentRefresh } = props;
    const [text, setText] = useState("");

    const logout = () => {
        localStorage.removeItem("tokenKey")
        localStorage.removeItem("currentUser")
        localStorage.removeItem("refreshKey")
        localStorage.removeItem("userName")
        navigate('/auth');
    }
    const saveComment = () => {
        PostWithAuth("http://localhost:8080/comments", {
            postId: postId,
            userId: userId,
            text: text,
        })
            .then((res) => {
                if (!res.ok) {
                    RefreshToken()
                        .then((res) => {
                            if (!res.ok) {
                                logout();
                            } else {
                                return res.json()
                            }
                        })
                        .then((result) => {
                            console.log(result)

                            if (result != undefined) {
                                localStorage.setItem("tokenKey", result.accessToken);
                                saveComment();
                                setCommentRefresh();
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                } else
                    res.json()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleSubmit = () => {
        saveComment();
        setText("");
        setCommentRefresh();
    }

    const handleChange = (value) => {
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
                onChange={(i) => handleChange(i.target.value)}
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
                                color: 'white'
                            }}
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
