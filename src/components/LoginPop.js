import React, { useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link as RouterLink } from 'react-router-dom';
import { authSignup } from '../store/actions/auth';
import { Button, Checkbox, Dialog, DialogContent, DialogContentText, Box, TextField, Typography, Alert } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import logo from '../img/favicon.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <RouterLink to="https://www.linkedin.com/in/jake-junya-sewai-357949162/">
        Jake Sewai
      </RouterLink>
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LoginPop = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { errorDetail } = useSelector(state => ({
    errorDetail: state.auth.errorDetail
  }));
 
  const [open, setOpen] = useState(false);
  const onSubmit = (data) => {
    dispatch(authSignup(data))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Checkbox variant="outlined" color="primary" sx={{ position: 'absolute', right: 0, bottom: 0, zIndex: 99 }} onClick={handleClickOpen} icon={<FavoriteBorder />} checkedIcon={<FavoriteBorder />}>
      </Checkbox>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Button onClick={handleClose}>
            <img src={logo} alt="Logo" style={{ width: '7rem' }} />
          </Button>
          <DialogContentText>
            Found an interesting posting? Sign in to save it for later!
          </DialogContentText>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', { required: 'Email is required' })}
              color="primary"
            />
            {errorDetail && <Alert severity="error">{errorDetail}</Alert>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              {...register('name', { required: 'Name is required' })}
              color="primary"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', { required: "PASSWORD REQUIRED", minLength: 5 })}
              color="primary"
            />
            {errors.password && <Alert severity="error">Password must be at least 5 characters</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default LoginPop;
