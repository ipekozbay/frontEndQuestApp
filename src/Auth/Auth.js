import { History } from "@mui/icons-material";
import { FormControl, Input, InputLabel, Button, FormHelperText } from "@mui/material";
import React, { useState } from "react";

export default function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
            .then((result) => {localStorage.setItem("tokenKey", result.message);
                              localStorage.setItem("currentUser", result.userId);
                              localStorage.setItem("userName", result.username)})
            .catch((err) => console.log(err))
    }

    const handleRegister = (value) => {
        sendRequest("register");
        setUsername("");
        setPassword("");
        window.history.go("http://localhost:8080/auth/");
    }
    const handleLogin = (value) => {
        sendRequest("login");
        setUsername("");
        setPassword("");
    }

    return (
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
                onClick={handleRegister}> Register
            </Button>
            <FormHelperText style={{ margin: 20 }}>
                are you already registered?
            </FormHelperText>
            <Button variant="contained"
                style={{
                    backkground: "linear-gradient(45deg, #2196F3, #21CBF3 90%)",
                    color: "white"
                }}
                onClick={handleLogin}> Login
            </Button>
        </FormControl>
    )
}