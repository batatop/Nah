import React from "react"
import createReactClass from 'create-react-class';
import AppBar from 'material-ui/AppBar';

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
