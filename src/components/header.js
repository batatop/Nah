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
import { base, firebaseAuth } from "../config/constants";
import { style } from "../css/styles.js"

var Header = createReactClass({
    componentWillMount: function(){
        this.setState({
            name: "",
            lastName: "",
            company: ""
        });
        if(firebaseAuth().currentUser){
            var currentUser = firebaseAuth().currentUser.uid;
            base.fetch(`users/${currentUser}`, {
                context: this,
                asArray: true,
                then(user) {
                    console.log(user);
                    this.setState({
                        name: user[0].name,
                        lastName: user[0].lastName,
                        company: user[0].company
                    });
                }
            });
        }
    },

    componentWillReceiveProps: function(){
        if(firebaseAuth().currentUser){
            var currentUser = firebaseAuth().currentUser.uid;
            base.fetch(`users/${currentUser}`, {
                context: this,
                asArray: true,
                then(user) {
                    console.log(user);
                    this.setState({
                        name: user[0].name,
                        lastName: user[0].lastName,
                        company: user[0].company
                    });
                }
            });
        }
    },

    render: function() {
        console.log(this.props.authed);
        return (
            <AppBar
                title="Boento"
                showMenuIconButton={false}
            >
                {
                    this.props.authed===true
                    ?
                    <div>
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
                            <MenuItem primaryText={this.state.company} style={style.headerDisabledMenuItem} disabled={true}/>
                            <MenuItem primaryText={this.state.name+" "+this.state.lastName} />
                            <MenuItem primaryText="Profile Settings" />
                        </IconMenu>
                    </div>
                    :
                    <div></div>
                }
            </AppBar>
        );
    }
});

export default Header;
