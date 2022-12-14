import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";
import { PostWithAuth, DeleteWithAuth } from '../../services/HttpService';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Post(props) {
    const { title, text, userId, userName, postId, likes } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [commentList, setCommentList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const isInitialMount = useRef(true);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [likeId, setLikeId] = useState(null);
    const [refresh,setRefresh] = useState(false);
    let disabled = localStorage.getItem("currentUser") == null ? true : false

    const setCommentRefresh = ()=>{
        setRefresh(true);
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

    const handleLike = () => {
        setIsLiked(!isLiked);

        if (!isLiked) {
            saveLike();
            setLikeCount(likeCount + 1);
        }
        else {
            deleteLike();
            setLikeCount(likeCount - 1);
        }
    };

    const refreshComments = () => {
        fetch("http://localhost:8080/comments?postId=" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCommentList(result);
                },

            ).catch(
                (error) => {
                    console.log("error");
                    setIsLoaded(true);
                    setError(error);
                }
            )
            setRefresh(false)
    }

    const saveLike = () => {
        PostWithAuth("http://localhost:8080/likes/", {
            postId: postId,
            userId: localStorage.getItem("currentUser"),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }

    const deleteLike = () => {
        DeleteWithAuth("http://localhost:8080/likes/" + likeId)
            .catch((err) => console.log(err))
    }

    const checkLikes = () => {
        var likeControl = likes.find((like => "" + like.userId === localStorage.getItem("currentUser")));
        if (likeControl != null) {
            setLikeId(likeControl.id);
            setIsLiked(true);
        }
    }

    useEffect(() => { checkLikes() }, [])

      useEffect(() => {
          if (isInitialMount.current)
               isInitialMount.current = false
           else
               refreshComments();
      },[refresh]);

    useEffect(() => { checkLikes() }, [])

    return (
        <div>
            <Card sx={{ width: 800, textAlign: 'center', margin: 8, }} >
                <CardHeader
                    avatar={
                        <Link
                            to={{ pathname: '/users/' + userId }}
                            style={{ background: 'white', textDecoration: 'none', boxShadow: 'none' }}>

                            <Avatar aria-label="recipe"
                                sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
                                {userName && userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {disabled ?
                        <IconButton
                            disabled
                            onClick={handleLike}
                            aria-label="add to favorites"
                        >
                            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                        </IconButton> :
                        <IconButton
                            onClick={handleLike}
                            aria-label="add to favorites"
                        >
                            <FavoriteIcon style={isLiked ? { color: "red" } : null} />
                        </IconButton>
                    }
                    {likeCount}
                    <IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container
                        fixed>
                        {error ? "error" :
                            isLoaded ? commentList.map(comment => (
                                <div key={comment.id}>
                                    <Comment userId={comment.userId} userName={comment.userName} text={comment.text} key={comment.id}></Comment>
                                </div>
                            )) : "loading"}
                        {disabled ? "" :
                            <CommentForm refreshComments={refreshComments} userId={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} postId={postId} setCommentRefresh={setCommentRefresh}></CommentForm>
                        }

                    </Container>
                </Collapse>
            </Card>
        </div>

    );
}
