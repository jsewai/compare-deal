import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { authLogin } from '../store/actions/auth';
import myPhoto from '../img/myphoto2.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="https://www.linkedin.com/in/jake-junya-sewai-357949162/">
        Jake Sewai
      </Link>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = {
  text: {
    color: 'Black'
  },
  avatarDialog: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    width: '5em',
    height: '5em',
  },
  name: {
    textAlign: 'center'
  },
  icons: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  iconColour: {
    color: 'black',
    margin: '1%'
  }
};


const WelcomeMessage = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const onLogin = () => {
    dispatch(authLogin({ username: "test@test.com", password: "password123" }))
    handleClose()
  }
  if (!open) {
    return <Navigate to="/" />
  } else {
    return (
      <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <div style={styles.avatarDialog} >
              <Avatar alt="Jake Sewai" src={myPhoto} sx={styles.avatar} />
            </div>
            <h1 style={styles.name}>Jake (Junya) Sewai</h1>
            <h4 style={styles.name}>
              Cell Phone: <a href="tel:+1-647-832-9297">647-832-9297</a> | Email: <a href="mailto:junyasewai@gmail.com">junyasewai@gmail.com</a><br />
              <a href='https://github.com/jsewai' target="_blank"><GitHubIcon sx={styles.iconColour} /></a>
              <a href='https://www.linkedin.com/in/jake-junya-sewai-357949162/' target="_blank"><LinkedInIcon sx={styles.iconColour} /></a>
            </h4>
            <DialogContentText sx={styles.text}>
              Dear Hiring Manager: <br />
              <br />
              Thank you for coming to my Website!<br />
              I have created this website to compare ads between 'Google' and 'Kijiji' and to save them as bookmarks for logged in users.<br />
              It is created by the <strong>Django rest framework</strong> for Web scraping API and <strong>React/Redux.js</strong> for UI which hosts on <strong>AWS</strong>.<br />
              I pre-made an account for testing purposes, so you could simply see how this website works by clicking the start button below.<br />
              <br />
              <div style={styles.name}>
              <Button
                variant="contained"
                color="primary"
                onClick={onLogin}
              >
                Login as a Test user
              </Button>
              </div>
              <br />
              <br />
              You can always log out and log in with the credential below, or please feel free to create your own account by yourself to login.<br />
              <br />
              Email: test@test.com<br />
              Password: password123<br />
              <br />
              I can be reached anytime via my cellphone, <a href="tel:+1-647-832-9297">647-832-9297</a> or by email at <a href="mailto:junyasewai@gmail.com">junyasewai@gmail.com</a> Thank you for your time and consideration, I am looking forward to hearing from you about this opportunity.
              <br />
              <br />
              Sincerely,<br />
              Jake (Junya) Sewai
              <br />
            </DialogContentText>
            <Box mt={5}>
              <Copyright />
            </Box>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default WelcomeMessage