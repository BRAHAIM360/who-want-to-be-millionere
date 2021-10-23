import React from 'react'
import { BrowserRouter as Router, Switch,Route
} from "react-router-dom";
import App from './App';
import Home from './Home';
export default function Navigation() {
    return (
        <Router>

        <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route path="/fr">
                    <App />
                  </Route>
                  <Route path="/ar">
                    <App />
                  </Route>
                  <Route path="/en">
                    <App />
                  </Route>
                </Switch>
        </Router>
    )
}
