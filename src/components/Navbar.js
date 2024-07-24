import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import SearchBar from '../container/SearchBar';
import PageSelection from './PageSelection';
import { clearBookmarkList } from '../store/actions/bookmark';
import { styled } from '@mui/material/styles';
import { logout } from '../store/actions/auth';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

import logo from '../img/favicon.png';

const root = {
  backgroundColor: '#FFFFFF',
  color: 'black',
}
const title = {
  flexGrow: 1,
}
const accountSection = {
  position: 'absolute',
  right: '30px',
  top: '10%',
}
const toolBar = {
  display: "flex",
  flexWrap: 'wrap',
  alignItems: 'center',
  width: '100%',
}
const textColor = {
  color: "#f33c00",
  textDecoration: 'none',
}
const acountOptions = {
  position: 'absolute',
  right: '30px',
  top: '0',
}

const TopImage = styled('img')(() => ({
  flexGrow: 1,
  height: '7rem',
}))

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated
  }));
  const { sites } = useSelector(state => ({
    sites: [state.selectPage.google, state.selectPage.kijiji],
  }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToBookmark = () => {
    navigate('/bookmark');
  };

  const signOut = (event) => {
    event.preventDefault();
    dispatch(logout());
    dispatch(clearBookmarkList());
  };

  return (
    <AppBar sx={{height: '100%'}} position="relative">
      <Toolbar sx={root}>
        <Container sx={toolBar}>
          <Link to="/"><TopImage src={logo} alt="Logo" /></Link>
          <SearchBar pageChoice={sites} />
          <PageSelection pageChoice={sites} />
          {isAuthenticated ? (
            <div sx={acountOptions}>
              <IconButton
                aria-label="Bookmark"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={goToBookmark}
                color="inherit"
              >
                <FavoriteBorderRoundedIcon />
              </IconButton>

              <IconButton
                aria-label="Log out"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={signOut}
                color="inherit"
              >
                <ExitToAppRoundedIcon />
              </IconButton>
            </div>
          ) : (
            <Typography variant="subtitle1" sx={[title ,accountSection]} align='right'>
              <Link to="/signup/" sx={textColor}>Register</Link>
              or
              <Link to="/login" sx={textColor}> Login</Link>
            </Typography>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
