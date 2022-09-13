import React from "react";
import {useParams} from "react-router-dom"
import Avatar from "../Avatar/Avatar";
import UserActivity from "../UserActivity/UserActivity";

export default function User(){
    const{userId} = useParams();
    return(
        <div style={{display :"flex"}}>
            <Avatar avatarId={0}/>
            <UserActivity/>
          </div>
    )
}