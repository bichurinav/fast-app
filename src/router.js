import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import App from "./App";
import DoLink from "./components/DoLink";

export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/do-link" component={DoLink} />
            </Switch>
        </Router>
    )
}
