import React from "react"
import createReactClass from 'create-react-class';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { style } from "../css/styles.js";
import { base, firebaseAuth } from "../config/constants";

var Header = createReactClass({
    render: function() {
        return (
            <AppBar
                title="Boento"
                showMenuIconButton={false}
            />
        );
    }
});

export default Header;
