import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Grid,
    CssBaseline,
    Button,
    Link,
    Typography,
    CircularProgress
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import gql from "graphql-tag"
import {setPlayer} from '../../actions'
import { useDispatch } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.changeplusplus.org/">
        Change++
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  wrapper: {
    position: 'relative'
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'black',
    opacity: 0.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LOGIN_QUERY = gql`
  query Login($email: String, $password: String){
    login(input: {email: $email, password: $password}) {
      success
      message
      name
      email
      password
    }
  } 
`;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function LoginPage(props) {
  const dispatch = useDispatch(); //todo delete
  const classes = useStyles();
  const { register, handleSubmit, control, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
        email: '',
        password: ''
    },
  });
  
  const [onLogin, setOnLogin] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [login, {loading, data, error}] = useLazyQuery(LOGIN_QUERY);
  const onSubmit = data => {
    setOnLogin(true);
    login({variables: {email: data.email, password: data.password}});
  };

  useEffect(() => {
    if(!loading){
      if(data){
        if (data.login.success) {
          dispatch(setPlayer({name: data.login.name, email: data.login.email, password: data.login.password}));
          setAlertType('success');
          setMessage(data.login.message);
          setOpen(true);
          setTimeout(() => {
            props.history.push('/welcome');
          }, 1000);
        } else {
          setAlertType('error');
          setMessage(data.login.message);
          setOpen(true);
        }
      }
      else {
        if (onLogin) {
          setAlertType('error');
          setMessage('Something went wrong, please try again!');
          setOpen(true);
        }
      }
      setOnLogin(false);
    }
  }, [loading]);
  
  return (
    <Grid container component="main" className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertType}>
          {message}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className='backgroundImage' />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} className={classes.wrapper} square>
        { onLogin &&
          <div className={classes.loading}>
            <CircularProgress color="primary" />
          </div>
        }
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
          >
              <TextField
                  name='email'
                  label='Email Address'
                  variant='outlined'
                  margin='normal'
                  inputRef={register({
                      required: 'You must provide the email address!',
                      pattern: {
                          value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: 'You must provide a valid email address!',
                      },
                  })}
                  autoComplete='email'
                  error={!!errors.email}
                  className={classes.margin}
                  fullWidth
                  autoFocus
              />
              {errors.email && (
                  <span className={classes.error}>{errors.email.message}</span>
              )}
              <TextField
                  name='password'
                  label='Password'
                  type='password'
                  variant='outlined'
                  margin='normal'
                  inputRef={register({
                  required: 'You must provide a password.',
                  minLength: {
                      value: 6,
                      message: 'Your password must be greater than 6 characters',
                  },
                  })}
                  error={!!errors.password}
                  fullWidth
                  autoComplete='current-password'
              />
              {errors.password && (
                  <span className={classes.error}>{errors.password.message}</span>
              )}
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={!!errors.email || !!errors.password}
                  className={classes.submit}
              >
                  Login
              </Button>
              <Grid container>
                  <Grid item xs></Grid>
                  <Grid item>
                      <Link href="/register" variant="body2">
                      {"Don't you have account? Register"}
                      </Link>
                  </Grid>
              </Grid>
              <Box mt={5}>
                  <Copyright />
              </Box>
            </form>
        </div>
      </Grid>
    </Grid>
  );
}