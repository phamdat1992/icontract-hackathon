import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './assest/fonts/style.css';
import './sass/main.scss';

import Login from './views/login';
import Registered from './views/registered';
import Info from './views/info';
import Dashboard from './views/dashboard';
import Store from 'store';
import { Redirect } from 'react-router-dom';

const RouteWithAuth = (component) => {
    const email = Store.get('email');
    if (!email) {
        return <Redirect to='/login' />
    }

    return component;
};

function App() {


    return (
        <Switch>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/registered">
                <Registered />
            </Route>
            <Route exact path="/info">
                <Info />
            </Route>
            <Route exact path="/dashboard">
                <Dashboard />
            </Route>
            <Route
                path='/'
                render={() => RouteWithAuth(Login)}
            />
        </Switch>
    );
}

App.propTypes = {
    history: PropTypes.object,
};

export default App;