import { Button, Card, CardContent, InputAdornment, inputAdornmentClasses, OutlinedInput } from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

export default function CommentForm(props) {
    const { text, userId, userName } = props;

    const handleSubmit=()=>{
        
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
                style={{ color: "black", backgroundColor: "white" }}>
            </OutlinedInput>

        </CardContent>
    )
}