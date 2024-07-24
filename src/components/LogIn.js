import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { authLogin } from '../store/actions/auth';
import { Button, CssBaseline, TextField, Paper, Box, Grid, Typography, Alert, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../img/favicon.png';

function Copyright() {
  return (
    <Typography variant="body2" color="textprimary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/jake-junya-sewai-357949162/">
        Jake Sewai
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const LogIn = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isAuthenticated, isLoginFail } = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoginFail: state.auth.isLoginFail,
  }));
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/");
  }

  const onSubmit = (data) => {
    dispatch(authLogin(data));
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} sx={{
        backgroundImage: 'url(https://picsum.photos/900/1200)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <RouterLink to="/">
            <img src={logo} alt="Logo" style={{ width: '7rem' }} />
          </RouterLink>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="username"
              autoFocus
              {...register("username")}
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
              {...register("password", { required: "PASSWORD REQUIRED", minLength: 5 })}
              color="primary"
            />
            {errors.password && <Alert severity="error">Password must be at least 5 characters</Alert>}
            {isLoginFail && <Alert severity="error">Login failed: Invalid username or password.</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LogIn;
