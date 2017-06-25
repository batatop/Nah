import React, { Component } from 'react'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { firebaseAuth } from '../config/constants'
import { Grid, Cell, Spinner } from 'react-mdl'
import 'react-mdl/extra/material.css'
import 'react-mdl/extra/material.js'
import { style } from '../css/styles.js'

import Sidebar from './sidebar'
import Dashboard from './protected/Dashboard'
import Products from './protected/Products'
import New from './protected/New'
import Schedule from './protected/Schedule'
import Inventory from './protected/Inventory'
import Orders from './protected/Orders'
import Suppliers from './protected/Suppliers'
import Staff from './protected/Staff'
import Login from './public/Login'
import Register from './public/Register'

function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
}

function PublicRoute ({component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed === false
            ? <Component {...props} />
            : <Redirect to='/dashboard' />}
        />
    )
}

export default class App extends Component {
    state = {
        authed: false,
        loading: true
    }
    componentWillUnmount () {
        this.removeListener()
    }
    componentDidMount () {
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
    }
    render() {
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
                                    <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                                    <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                                    <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                                    <PrivateRoute authed={this.state.authed} path='/products' component={Products} />
                                    <PrivateRoute authed={this.state.authed} path='/new' component={New} />
                                    <PrivateRoute authed={this.state.authed} path='/schedule' component={Schedule} />
                                    <PrivateRoute authed={this.state.authed} path='/inventory' component={Inventory} />
                                    <PrivateRoute authed={this.state.authed} path='/orders' component={Orders} />
                                    <PrivateRoute authed={this.state.authed} path='/suppliers' component={Suppliers} />
                                    <PrivateRoute authed={this.state.authed} path='/staff' component={Staff} />
                                    <Route render={() => <h3>No Match</h3>} />
                                </Switch>
                            </Cell>
                        </Grid>
                    </div>
                </BrowserRouter>
            );
    }
}

/*
export default class Layout extends React.Component {
    render() {
        const { location } = this.props;
        const containerStyle = {
            width: "75%",
            backgroundColor: '#e8eaf6'
        };
        const sidebarStyle = {
            backgroundColor: 'gray'
        };
        return (
            <div class="mdl-grid" style={containerStyle}>
                <div class="mdl-cell mdl-cell--3-col">
                    <div class="mdl-grid">
                        <Nav location={location} />
                    </div>
                </div>
                <div class="mdl-cell mdl-cell--9-col">
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        );
    }
}

render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
        <BrowserRouter>
            <div>
                <nav className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand">React Router + Firebase Auth</Link>
                        </div>
                        <ul className="nav navbar-nav pull-right">
                            <li>
                                <Link to="/" className="navbar-brand">Home</Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="navbar-brand">Dashboard</Link>
                            </li>
                            <li>
                                {this.state.authed
                                    ? <button
                                        style={{border: 'none', background: 'transparent'}}
                                        onClick={() => {
                                            logout()
                                        }}
                                        className="navbar-brand">Logout</button>
                                        : <span>
                                            <Link to="/login" className="navbar-brand">Login</Link>
                                            <Link to="/register" className="navbar-brand">Register</Link>
                                        </span>}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className="container">
                            <div className="row">
                                <Switch>
                                    <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                                    <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                                    <PrivateRoute authed={this.state.authed} path='/dashboard' component={Dashboard} />
                                    <PrivateRoute authed={this.state.authed} path='/products' component={Products} />
                                    <PrivateRoute authed={this.state.authed} path='/new' component={New} />
                                    <PrivateRoute authed={this.state.authed} path='/schedule' component={Schedule} />
                                    <PrivateRoute authed={this.state.authed} path='/inventory' component={Inventory} />
                                    <PrivateRoute authed={this.state.authed} path='/orders' component={Orders} />
                                    <PrivateRoute authed={this.state.authed} path='/suppliers' component={Suppliers} />
                                    <PrivateRoute authed={this.state.authed} path='/staff' component={Staff} />
                                    <Route render={() => <h3>No Match</h3>} />
                                </Switch>
                            </div>
                        </div>
                        <div style={{width: '80%', margin: 'auto'}}>
                            <Grid className="demo-grid-ruler">
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                                <Cell col={1}>1</Cell>
                            </Grid>
                            <Grid className="demo-grid-1">
                                <Cell col={4}>4</Cell>
                                <Cell col={4}>4</Cell>
                                <Cell col={4}>4</Cell>
                            </Grid>
                            <Grid className="demo-grid-2">
                                <Cell col={6}>6</Cell>
                                <Cell col={4}>4</Cell>
                                <Cell col={2}>2</Cell>
                            </Grid>
                            <Grid className="demo-grid-3">
                                <Cell col={6} tablet={8}>6 (8 tablet)</Cell>
                                <Cell col={4} tablet={6}>4 (6 tablet)</Cell>
                                <Cell col={2} phone={4}>2 (4 phone)</Cell>
                            </Grid>
                        </div>
                    </div>
                </BrowserRouter>
*/
