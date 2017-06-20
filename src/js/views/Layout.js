import React from "react";
import { Link } from "react-router";

import Footer from "../components/layout/Footer";
import Nav from "../components/layout/Sidebar";

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
