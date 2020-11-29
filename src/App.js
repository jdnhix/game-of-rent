import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import GameBoard from './Components/Board/GameBoard';
import './App.css';
import PlayerSetupPage from './Components/PlayerSetup/PlayerSetup';
import GameSetupPage from './Components/GameSetupPage/GameSetupPage';
import ResultsPage from './Components/ResultsPage/ResultsPage';
import {Provider} from 'react-redux'
import LoginPage from './Components/Auth/Login';
import RegisterPage from './Components/Auth/Register';
import { connect } from 'react-redux';

const ConnectedPrivateRoute = ({component: Component, player, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            player ? <Component {...props}/> : <Redirect to="/login" />
        )} />
    );
};

const mapStateToProps= state => {
    return {
        player: state.player
    }
}

const PrivateRoute = connect(
    mapStateToProps,
)(ConnectedPrivateRoute);

const App = ({store}) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path='/'> <Redirect to="/login"></Redirect> </Route>
                <Route exact path='/login' component={LoginPage} />
                <Route exact path='/register' component={RegisterPage} />
                <PrivateRoute path='/welcome' component={WelcomePage} />
                <PrivateRoute path='/setup' component={GameSetupPage} />
                <PrivateRoute path="/player" component={PlayerSetupPage} />
                <PrivateRoute path="/board" component={GameBoard} />
                <PrivateRoute path="/results" component={ResultsPage} />
            </Switch>

        </Router>
    </Provider>
);


export default App;
