import React, { Component } from 'react';
import {BrowserRouter as Router,
    Switch,
    Route} from 'react-router-dom';
import Home from './cores/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './cores/Menu';

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

                    <Route exact path="/signin">
                        <Signin />
                    </Route>
                    
                </Switch>
            </Router>
        );
    }
}

export default MainRouter;