import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import Layout from "./views/Layout";
import Dashboard from "./views/Dashboard";
import Products from "./views/Products";
import New from "./views/New";
import Schedule from "./views/Schedule";
import Inventory from "./views/Inventory";
import Orders from "./views/Orders";
import Suppliers from "./views/Suppliers";
import Staff from "./views/Staff";

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Dashboard}></IndexRoute>
            <Route path="/products" component={Products}/>
            <Route path="/new" component={New}/>
            <Route path="/schedule" component={Schedule}/>
            <Route path="/inventory" component={Inventory}/>
            <Route path="/orders" component={Orders}/>
            <Route path="/suppliers" component={Suppliers}/>
            <Route path="/staff" component={Staff}/>
        </Route>
    </Router>
,app);
