import React from "react";
import createReactClass from 'create-react-class';
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { firebaseAuth } from "../config/constants";
import { Grid, Cell, Spinner } from "react-mdl";
import "react-mdl/extra/material.css";
import "react-mdl/extra/material.js";
import { style } from "../css/styles.js";

// layout
import Sidebar from "./sidebar";
// protected
import Dashboard from "./protected/Dashboard";
import AddProduct from "./protected/AddProduct";
import Product from "./protected/Product";
import RawMaterials from "./protected/RawMaterials";
import Schedule from "./protected/Schedule";
import Staff from "./protected/Staff";
// public
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
                                    <PrivateRoute authed={this.state.authed} path="/addProduct" component={AddProduct} />
                                    <PrivateRoute authed={this.state.authed} path="/product/:productId" component={Product} />
                                    <PrivateRoute authed={this.state.authed} path="/rawMaterials" component={RawMaterials} />
                                    <PrivateRoute authed={this.state.authed} path="/schedule" component={Schedule} />
                                    <PrivateRoute authed={this.state.authed} path="/staff" component={Staff} />
                                    <Redirect from="/" to="/dashboard"/>
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
