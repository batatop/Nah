import React from "react";
import createReactClass from 'create-react-class';
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { firebaseAuth } from "../config/constants";
import { Grid, Cell, Spinner } from "react-mdl";
import "react-mdl/extra/material.css";
import "react-mdl/extra/material.js";
import { style } from "../css/styles.js";

import Sidebar from "./sidebar";
import Dashboard from "./protected/Dashboard";
import Products from "./protected/Products";
import New from "./protected/New";
import Schedule from "./protected/Schedule";
import Inventory from "./protected/Inventory";
import Orders from "./protected/Orders";
import Suppliers from "./protected/Suppliers";
import Staff from "./protected/Staff";
import Login from "./public/Login";
import Register from "./public/Register";

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
            ? <Component {...props} />
            : <Redirect to={{pathname: "/login", state: {from: props.location}}} />}
        />
    )
}

function PublicRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === false
            ? <Component {...props} />
            : <Redirect to="/dashboard" />}
        />
    )
}

var App = createReactClass({
    componentWillMount: function() {
        this.setState({
            authed: false,
            loading: true
        });
    },

    componentWillUnmount: function() {
        this.removeListener()
    },

    componentDidMount: function() {
        this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authed: true,
                    loading: false
                })
            }
            else {
                this.setState({
                    authed: false,
                    loading: false
                })
            }
        })
    },

    render: function() {
        return this.state.loading === true
            ?
            (
                <div style={style.loading}>
                    <Grid>
                        <Cell col={12}>
                            <Spinner style={style.spinner} singleColor />
                        </Cell>
                    </Grid>
                </div>
            )
            :
            (
                <BrowserRouter>
                    <div style={style.container}>
                        <Grid>
                            <Cell col={3} style={style.sidebar}>
                                <Grid>
                                    <Sidebar authed={this.state.authed} />
                                </Grid>
                            </Cell>
                            <Cell col={9} style={style.content}>
                                <Switch>
                                    <PublicRoute authed={this.state.authed} path="/login" component={Login} />
                                    <PublicRoute authed={this.state.authed} path="/register" component={Register} />
                                    <PrivateRoute authed={this.state.authed} path="/dashboard" component={Dashboard} />
                                    <PrivateRoute authed={this.state.authed} path="/products" component={Products} />
                                    <PrivateRoute authed={this.state.authed} path="/new" component={New} />
                                    <PrivateRoute authed={this.state.authed} path="/schedule" component={Schedule} />
                                    <PrivateRoute authed={this.state.authed} path="/inventory" component={Inventory} />
                                    <PrivateRoute authed={this.state.authed} path="/orders" component={Orders} />
                                    <PrivateRoute authed={this.state.authed} path="/suppliers" component={Suppliers} />
                                    <PrivateRoute authed={this.state.authed} path="/staff" component={Staff} />
                                    <Route render={() => <h3>No Match</h3>} />
                                </Switch>
                            </Cell>
                        </Grid>
                    </div>
                </BrowserRouter>
            );
    }
});

export default App;
