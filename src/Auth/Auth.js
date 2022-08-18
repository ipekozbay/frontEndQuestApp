import { FormControl, Input, InputLabel, Button, FormHelperText } from "@mui/material";
import React, { useState } from "react";

export default function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <FormControl>
            <InputLabel>username</InputLabel>
            <Input />
            <InputLabel style={{ top: 80 }} >password</InputLabel>
            <Input style={{ top: 30 }} />
            <Button variant="contained"
                style={{
                    marginTop: 60,
                    backkground: "linear-gradient(45deg, #2196F3, #21CBF3 90%)",
                    color: "white"
                }}> Register
            </Button>
            <FormHelperText style={{ margin: 20 }}>
                are you already registered?
            </FormHelperText>
            <Button variant="contained"
                style={{
                    backkground: "linear-gradient(45deg, #2196F3, #21CBF3 90%)",
                    color: "white"
                }}> Login
            </Button>
        </FormControl>
    )
}