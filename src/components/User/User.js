import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";

export default function User(){
    const{userId} = useParams();
    const [user, setUser] = useState();

    const getUser = () => {
        fetch("http://localhost:8080/users/" + userId, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey")
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setUser(result);
                },
                (error) => {
                    console.log(error)
                
                }
            )
    }
    useEffect(() => {
        getUser()
    },[])

    return(
        <div style={{display :"flex"}}>
            {user ? <Avatar avatarId={user.avatarId} /> : ""}
            <UserActivity userId={userId}/>
          </div>
    )
}