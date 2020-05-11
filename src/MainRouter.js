import React, { Component } from 'react';
import {BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom';
import Home from './cores/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './cores/Menu';
import Profile from './user/Profile';
import Users from './user/Users';
import EditUser from './user/EditUser';
import {PrivateRoute} from './auth/PrivateRoute';

class MainRouter extends Component {
    render() {
        return (
            <Router>
                <Menu />
                <Switch>
                    <Route exact path="/signup">
                        <Signup />
                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/users">
                        <Users />
                    </Route>

                    <Route exact path="/signin">
                        <Signin />
                    </Route>
                    
                    <PrivateRoute exact path="/user/:userId">
                        <Profile />
                    </PrivateRoute>

                    <PrivateRoute exact path="/user/edit/:userId">
                        <EditUser />
                    </PrivateRoute>
                </Switch>
            </Router>
        );
    }
}

export default MainRouter;