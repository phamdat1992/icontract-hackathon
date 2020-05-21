import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './assest/fonts/style.css';
import './sass/main.scss';

import Login from './views/login';
import Registered from './views/registered';
import Info from './views/info';
import Dashboard from './views/dashboard';
import { useHistory } from 'react-router-dom';
import Store from 'store';

function App() {
    const history = useHistory();
    React.useState(() => {
        const email = Store.get('email');
        if (!email) {
            history.push('/login');
        } else {
            history.push('/dashboard');
        }

        return email;
    });

    return (
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registered" component={Registered} />
            <Route exact path="/info" component={Info} />
            <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
    );
}

export default App;