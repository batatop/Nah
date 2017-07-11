import React from "react";
import createReactClass from 'create-react-class';
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { firebaseAuth } from "../config/constants";
import 'react-mdl-css/material.css';
import "react-mdl/extra/material.js";
import LinearProgress from 'material-ui/LinearProgress';
import { style } from "../css/styles.js";

// layout
import Sidebar from "./sidebar";
import Header from "./header";
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
            loading: true,
            location: location.pathname
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
                <div style={style.loadingApp}>
                    <h3>Loading</h3>
                    <LinearProgress mode="indeterminate" />
                </div>
            )
            :
            (
                <BrowserRouter>
                    <div style={style.container}>
                        <div style={style.header}>
                            <Header authed={this.state.authed} />
                        </div>
                        <div style={style.sidebar}>
                            <Sidebar authed={this.state.authed} />
                        </div>
                        <div style={style.content}>
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
                        </div>
                    </div>
                </BrowserRouter>
            );
    }
});

export default App;
