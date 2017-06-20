import React from "react";
import { IndexLink, Link } from "react-router";

export default class Nav extends React.Component {
    constructor() {
        super()
        this.state = {
            collapsed: true,
        };
    }

    render() {
        const { location } = this.props;
        const { collapsed } = this.state;
        const featuredClass = location.pathname === "/" ? "active" : "";
        const archivesClass = location.pathname.match(/^\/archives/) ? "active" : "";
        const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
        const navClass = collapsed ? "collapse" : "";

        return (
            <div id="mdl-cell mdl-cell--12-col">
                <ul>
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <IndexLink to="/">Dashboard</IndexLink>
                        </span>
                    </li>
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <Link to="products">Products</Link>
                        </span>
                    </li>
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <Link to="new">New</Link>
                        </span>
                    </li>
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <Link to="schedule">Schedule</Link>
                        </span>
                    </li>
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <Link to="inventory">Inventory</Link>
                        </span>
                    </li>
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <Link to="orders">Orders</Link>
                        </span>
                    </li>
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <Link to="suppliers">Suppliers</Link>
                        </span>
                    </li>
                    <li class="mdl-list__item">
                        <span class="mdl-list__item-primary-content">
                            <Link to="staff">Staff</Link>
                        </span>
                    </li>
                </ul>
            </div>
        );
    }
}
