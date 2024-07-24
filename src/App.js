import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from './container/Layout';
import { Box } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F33C00',
    },
  },
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Box>
            <Layout {...this.props}>
              <BaseRouter />
            </Layout>
          </Box>
        </ThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
