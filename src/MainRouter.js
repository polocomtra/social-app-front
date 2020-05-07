import React, { Component } from 'react';
import {BrowserRouter as Router,
    Switch,
    Route,
    Link} from 'react-router-dom';
import Home from './cores/Home';
import Signup from './user/Signup';

class MainRouter extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/signup">
                        <Signup />
                    </Route>

                    <Route exact path="/">
                        <Home />
                    </Route>
                    
                </Switch>
            </Router>
        );
    }
}

export default MainRouter;