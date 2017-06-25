import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { Cell, List, ListItem, ListItemContent } from 'react-mdl';
import { logout } from '../helpers/auth';
import { style } from '../css/styles.js'

export default class Sidebar extends Component  {
    render() {
        return (
            <Cell col={12}>
                <List>
                    <ListItem>
                        <ListItemContent>
                            <h1>Nah</h1>
                        </ListItemContent>
                    </ListItem>
                    {this.props.authed
                        ?
                        <span>
                            <ListItem>
                                <ListItemContent>
                                    <Link to="/dashboard" style={style.sidebarLink}>Dashboard</Link>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <Link to="/products" style={style.sidebarLink}>Products</Link>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <Link to="/new" style={style.sidebarLink}>New</Link>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <Link to="/schedule" style={style.sidebarLink}>Schedule</Link>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <Link to="/inventory" style={style.sidebarLink}>Inventory</Link>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <Link to="/orders" style={style.sidebarLink}>Orders</Link>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <Link to="/suppliers" style={style.sidebarLink}>Suppliers</Link>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <Link to="/staff" style={style.sidebarLink}>Staff</Link>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <a onClick={() => {logout()}} style={style.sidebarLink}>Logout</a>
                                </ListItemContent>
                            </ListItem>
                        </span>
                        :
                        <span>
                            <ListItem>
                                <ListItemContent>
                                    <Link to="/login" style={style.sidebarLink}>Login</Link>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <Link to="/register" style={style.sidebarLink}>Register</Link>
                                </ListItemContent>
                            </ListItem>
                        </span>
                    }
                </List>
            </Cell>
        );
    }
}
