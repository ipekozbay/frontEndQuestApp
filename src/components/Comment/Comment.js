import { Card, CardContent, InputAdornment, inputAdornmentClasses, OutlinedInput } from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

export default function Comment(props) {
    const [text, userId, userName] = props;

    return (
        <CardContent sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
        }}>
            <OutlinedInput
                disabled
                id='outlined-adorment-amount'
                multiline
                placeholder='Title'
                inputProps={{ maxLength: 25 }}
                fullWidth
                value={text}
                startAdornment={
                    <InputAdornment position="start" >
                        <Link
                            to={{ pathname: '/users/' + userId }}
                            style={{ background: 'white', textDecoration: 'none', boxShadow: 'none' }}>

                            <Avatar aria-label="recipe"
                                sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',textDecoration:"none",boxShadow:"none" }}>
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                } style={{ color: "black", backgroundColor: "white" }}
            >
            </OutlinedInput>

        </CardContent>
    )
}
