import React from "react";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import App from "./App";
import DoLink from "./components/DoLink";
import Source from "./components/Source";

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/do-link" component={DoLink} />
                <Route exact path="/source" component={Source} />
                <Route render={() => <Redirect to="/"/>}/>
            </Switch>
        </Router>
    )
}
