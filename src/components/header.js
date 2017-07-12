import React from "react"
import createReactClass from 'create-react-class';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import Settings from 'material-ui/svg-icons/action/settings';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { style } from "../css/styles.js"

var Header = createReactClass({
    render: function() {
        return (
            <AppBar
                title="Boento"
                showMenuIconButton={false}
            >
                <Badge
                    badgeContent={0}
                    secondary={true}
                    badgeStyle={style.headerBadge}
                >
                    <Avatar icon={<NotificationsIcon />} style={style.headerNotifications} />
                </Badge>
                <Avatar icon={<Settings />} style={style.headerContent} />
                <IconMenu
                    iconButtonElement={<IconButton><Avatar icon={<AccountCircle />}/></IconButton>}
                    anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
                    targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
                >
                    <MenuItem primaryText="Name Lastname" />
                    <MenuItem primaryText="Profile Settings" />
                </IconMenu>
            </AppBar>
        );
    }
});

export default Header;
