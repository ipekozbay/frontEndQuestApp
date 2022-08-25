import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { Label, LockOpen } from '@mui/icons-material';

export default function Navbar() {
 // let history = useHistory();

  const onClick = () => {
    localStorage.removeItem("tokenKey")
    localStorage.removeItem("currentUser")
    localStorage.removeItem("userName")
  //  history.go(0)
  }
  return (

    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/"
                style={
                  { textDecoration: 'none', boxShadow: 'none', color: 'white', textAlign: 'left' }}>
                Home
              </Link>
            </Typography>
            <Typography variant='h6'>
              {localStorage.getItem("currentUser") == null ?
                <Link to={{pathname: "/auth"}} style={
                  { textDecoration: 'none', boxShadow: 'none', color: 'white' }}>Login/register
                </Link>: 
                <div><IconButton onClick={onClick} ><LockOpen></LockOpen></IconButton>
                <Link to={{pathname:"/users/" + localStorage.getItem("currentUser")}} style={
                  { textDecoration: 'none', boxShadow: 'none', color: 'white' }}>profile
                </Link>
                </div>}

            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}