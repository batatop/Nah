import React from "react"
import { NavLink } from "react-router-dom";
import createReactClass from 'create-react-class';
import { List, ListItem } from 'material-ui/List';
import { logout } from "../helpers/auth";
import { style } from "../css/styles.js"
import Stop from 'material-ui/svg-icons/av/stop';
import {teal600, teal50, grey500} from 'material-ui/styles/colors';

var Sidebar = createReactClass({
    componentWillMount: function(){
        this.setState({
            fontColor: teal600,
            hoverColor: teal50,
            activeLink: location.pathname
        });
    },

    handleActiveLink: function(activeLink) {
        this.setState({activeLink: activeLink});
    },

    setNavColor: function(activeLink){
        if(activeLink === this.state.activeLink){
            return style.sidebarLinkActive;
        }
        else if(this.state.activeLink === "/" && activeLink === "/dashboard"){
            return style.sidebarLinkActive;
        }
        else if(this.state.activeLink === "/login" && activeLink === "/dashboard" && this.props.authed){
            return style.sidebarLinkActive;
        }
        else if(this.state.activeLink === "/register" && activeLink === "/dashboard" && this.props.authed){
            return style.sidebarLinkActive;
        }
        return style.sidebarLink;
    },

    setIconColor: function(activeLink){
        if(activeLink === this.state.activeLink){
            return teal600;
        }
        else if(this.state.activeLink === "/" && activeLink === "/dashboard"){
            return teal600;
        }
        else if(this.state.activeLink === "/login" && activeLink === "/dashboard" && this.props.authed){
            return teal600;
        }
        else if(this.state.activeLink === "/register" && activeLink === "/dashboard" && this.props.authed){
            return teal600;
        }
        return grey500;
    },

    render() {
        return (
            <List>
                {this.props.authed
                    ?
                    <span>
                        <ListItem
                            primaryText="Dashboard"
                            leftIcon={<Stop color={this.setIconColor("/dashboard")} />}
                            hoverColor={this.state.hoverColor}
                            style={this.setNavColor("/dashboard")}
                            onClick={this.handleActiveLink.bind(null, "/dashboard")}
                            containerElement={
                                <NavLink
                                    to="/dashboard"
                                />
                            }
                        />
                        <ListItem
                            primaryText="Add Product"
                            leftIcon={<Stop color={this.setIconColor("/addProduct")} />}
                            hoverColor={teal50}
                            style={this.setNavColor("/addProduct")}
                            onClick={this.handleActiveLink.bind(null, "/addProduct")}
                            containerElement={
                                <NavLink
                                    to="/addProduct"
                                />
                            }
                        />
                        <ListItem
                            primaryText="Schedule"
                            leftIcon={<Stop color={this.setIconColor("/schedule")} />}
                            hoverColor={teal50}
                            style={this.setNavColor("/schedule")}
                            onClick={this.handleActiveLink.bind(null, "/schedule")}
                            containerElement={
                                <NavLink
                                    to="/schedule"
                                />
                            }
                        />
                        <ListItem
                            primaryText="Raw Materials"
                            leftIcon={<Stop color={this.setIconColor("/rawMaterials")} />}
                            hoverColor={teal50}
                            style={this.setNavColor("/rawMaterials")}
                            onClick={this.handleActiveLink.bind(null, "/rawMaterials")}
                            containerElement={
                                <NavLink
                                    to="/rawMaterials"
                                />
                            }
                        />
                        <ListItem
                            primaryText="Staff"
                            leftIcon={<Stop color={this.setIconColor("/staff")} />}
                            hoverColor={teal50}
                            style={this.setNavColor("/staff")}
                            onClick={this.handleActiveLink.bind(null, "/staff")}
                            containerElement={
                                <NavLink
                                    to="/staff"
                                />
                            }
                        />
                        <ListItem
                            primaryText="Logout"
                            leftIcon={<Stop color={this.setIconColor("/logout")} />}
                            hoverColor={teal50}
                            style={this.setNavColor("/logout")}
                            onClick={
                                () => {
                                    this.handleActiveLink("/login")
                                    logout()
                                }
                            }
                        />
                    </span>
                    :
                    <span>
                        <ListItem
                            primaryText="Login"
                            leftIcon={<Stop color={this.setIconColor("/login")} />}
                            hoverColor={teal50}
                            style={this.setNavColor("/login")}
                            onClick={this.handleActiveLink.bind(null, "/login")}
                            containerElement={
                                <NavLink
                                    to="/login"
                                />
                            }
                        />
                        <ListItem
                            primaryText="Register"
                            leftIcon={<Stop color={this.setIconColor("/register")} />}
                            hoverColor={teal50}
                            style={this.setNavColor("/register")}
                            onClick={this.handleActiveLink.bind(null, "/register")}
                            containerElement={
                                <NavLink
                                    to="/register"
                                />
                            }
                        />
                    </span>
                }
            </List>
        );
    }
});

export default Sidebar;
