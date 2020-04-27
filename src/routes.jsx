import React from 'react';
import App from './components/App'
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from './components/pages/home/Home'
import Error from './components/pages/error/Error'
import Catsvideos from './components/pages/catsvideos/Catsvideos';
const AppRoutes = () =>
    <App>
        <Switch>
            <Route exact path="/" component={Home} exact />
            <Route exact path="/:cat" component={Home} exact />
            <Route exact path="/videos" component={Catsvideos} exact />
            <Route component={Error}/>
        </Switch>
    </App>

export default withRouter(AppRoutes);

