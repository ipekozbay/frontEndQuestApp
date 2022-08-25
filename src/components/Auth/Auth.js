//import { History } from "@mui/icons-material";
import { FormControl, Input, InputLabel, Button, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isSent, setIsSent] = useState(false);


    const handleUsername = (value) => {
        setUsername(value);
    }

    const handlePassword = (value) => {
        setPassword(value);
    }

    const sendRequest = (path) => {
        fetch("http://localhost:8080/auth/" + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.message);
                localStorage.setItem("currentUser", result.userId);
                localStorage.setItem("userName", result.username)
                setIsSent(true);
            })
            .catch((err) => console.log(err))
    }

    const handleButton = (path) => {
        sendRequest(path);
    //    setUsername("");
    //   setPassword("");
        //  window.history.go("http://localhost:8080/auth/");
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };


    return (
        <div>
            <FormControl>
                <InputLabel>username</InputLabel>
                <Input onChange={(i) => handleUsername(i.target.value)} />
                <InputLabel style={{ top: 80 }} >password</InputLabel>
                <Input style={{ top: 30 }}
                    onChange={(i) => handlePassword(i.target.value)} />
                <Button variant="contained"
                    style={{
                        marginTop: 60,
                        backkground: "linear-gradient(45deg, #2196F3, #21CBF3 90%)",
                        color: "white"
                    }}
                    onClick={() => handleButton("register")}> Register
                </Button>
                <FormHelperText style={{ margin: 20 }}>
                    are you already registered?
                </FormHelperText>
                <Button variant="contained"
                    style={{
                        backkground: "linear-gradient(45deg, #2196F3, #21CBF3 90%)",
                        color: "white"
                    }}
                    onClick={() => handleButton("login")}> Login
                </Button>
            </FormControl>

            <div>
                <Snackbar open={isSent} autoHideDuration={1220} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        register 
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}