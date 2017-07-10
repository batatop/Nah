import React, { Component } from "react"
import { NavLink, Link } from "react-router-dom";
import { Cell } from "react-mdl";
import { List, ListItem } from 'material-ui/List';
import { logout } from "../helpers/auth";
import { style } from "../css/styles.js"

export default class Sidebar extends Component  {
    render() {
        return (
            <Cell col={12}>
                <List>
                    <ListItem disabled>
                        <h1>Boento</h1>
                    </ListItem>
                    {this.props.authed
                        ?
                        <span>
                            <ListItem
                                primaryText="Dashboard"
                                containerElement={
                                    <NavLink
                                        to="/dashboard"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    />
                                }
                            />
                            <ListItem
                                primaryText="Add Product"
                                containerElement={
                                    <NavLink
                                        to="/addProduct"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    />
                                }
                            />
                            <ListItem
                                primaryText="Schedule"
                                containerElement={
                                    <NavLink
                                        to="/schedule"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    />
                                }
                            />
                            <ListItem
                                primaryText="Raw Materials"
                                containerElement={
                                    <NavLink
                                        to="/rawMaterials"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    />
                                }
                            />
                            <ListItem
                                primaryText="Staff"
                                containerElement={
                                    <NavLink
                                        to="/staff"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    />
                                }
                            />
                            <ListItem
                                primaryText="Logout"
                                onClick={() => {logout()}}
                                style={style.sidebarLink}
                            />
                        </span>
                        :
                        <span>
                            <ListItem
                                primaryText="Login"
                                containerElement={
                                    <NavLink
                                        to="/login"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    />
                                }
                            />
                            <ListItem
                                primaryText="Register"
                                containerElement={
                                    <NavLink
                                        to="/register"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    />
                                }
                            />
                        </span>
                    }
                </List>
            </Cell>
        );
    }
}
