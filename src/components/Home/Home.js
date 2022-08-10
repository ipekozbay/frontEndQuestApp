import React from "react";
import { useState, useEffect } from 'react';
import Post from "../Post/Post";
import PostForm from "../Post/PostForm";

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [postList, setPostlist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/posts")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPostlist(result);
        },

      ).catch(
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div> error </div>;
  } else if (!isLoaded) {
    return <div> loading</div>;
  } else {
    return (
      <div 
      style={{         
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: 'pink'}}
      >
        <PostForm userId={"a"} userName={"dd"} title={"e"} text={"fr"}/>
        {postList.length > 0
          ? postList.map((post) => (
            <Post userId={post.userId} userName={post.userName} title={post.title} text={post.text}></Post>
          ))
          : null}
      </div>
    );
  }
}
