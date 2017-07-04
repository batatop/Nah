import React, { Component } from "react"
import { Link, NavLink } from "react-router-dom";
import { Cell, List, ListItem, ListItemContent } from "react-mdl";
import { logout } from "../helpers/auth";
import { style } from "../css/styles.js"

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
                                    <NavLink
                                        to="/dashboard"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    >
                                    Dashboard
                                    </NavLink>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <NavLink
                                        to="/new"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    >
                                    New
                                    </NavLink>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <NavLink
                                        to="/schedule"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    >
                                    Schedule
                                    </NavLink>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <NavLink
                                        to="/rawMaterials"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    >
                                    Raw Materials
                                    </NavLink>
                                </ListItemContent>
                            </ListItem>
                            <ListItem>
                                <ListItemContent>
                                    <NavLink
                                        to="/staff"
                                        style={style.sidebarLink}
                                        activeStyle={style.sidebarLinkActive}
                                    >
                                    Staff
                                    </NavLink>
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
