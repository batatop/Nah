import React from "react"
import createReactClass from 'create-react-class';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import Badge from 'material-ui/Badge';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import Settings from 'material-ui/svg-icons/action/settings';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import { base, firebaseAuth } from "../config/constants";
import { style } from "../css/styles.js"

var Header = createReactClass({
    componentWillMount: function() {
        this.setState({
            name: "",
            lastName: "",
            company: "",
            products: [],
            finishedProducts: [],
            finishedProductsNumber: 0
        });
        if(firebaseAuth().currentUser){
            console.log("here");
            var currentUser = firebaseAuth().currentUser.uid;
            base.fetch(`users/${currentUser}`, {
                context: this,
                asArray: true,
                then(user) {
                    base.syncState("products", {
                        context: this,
                        state: "products",
                        asArray: true,
                        queries: {
                            orderByChild: `info/company`,
                            equalTo: user[0].company
                        }
                    });
                    this.setState({
                        name: user[0].name,
                        lastName: user[0].lastName,
                        company: user[0].company,
                    });
                }
            });
        }
    },

    componentWillReceiveProps: function() {
        if(firebaseAuth().currentUser){
            var currentUser = firebaseAuth().currentUser.uid;
            base.fetch(`users/${currentUser}`, {
                context: this,
                asArray: true,
                then(user) {
                    this.setState({
                        name: user[0].name,
                        lastName: user[0].lastName,
                        company: user[0].company,
                    });
                }
            });
        }
    },

    componentWillUpdate: function() {
        this.getFinishedProducts();
    },

    handleMenuItemClick: function(product) {
        for(var i=0; i<this.state.products.length; i++){
            if(product.key === this.state.products[i].key){
                base.remove(`products/${this.state.products[i].key}`, function(err){
                    if(!err){
                        
                    }
                });
            }
        }
    },

    getFinishedProducts: function() {
        var finishedProductsNumber = 0;
        if(this.state.products.length !== 0){
            for(var i=0; i<this.state.products.length; i++){
                if(this.state.products[i].info.finished >= this.state.products[i].info.amount){
                    finishedProductsNumber++;
                }
            }
        }
        return finishedProductsNumber;
    },

    mapFinishedProducts: function() {
        var self = this;
        var finishedProducts = [];
        var finishedProductsList = [];

        if(this.state.products.length !== 0){
            for(var i=0; i<this.state.products.length; i++){
                if(this.state.products[i].info.finished >= this.state.products[i].info.amount){
                    finishedProducts.push(this.state.products[i]);
                }
            }
        }
        finishedProductsList = finishedProducts.map(function(product, i){
            return(
                <MenuItem
                    key={"FinishedProduct_"+i}
                    primaryText={product.info.name}
                    rightIcon={<CheckCircle onClick={self.handleMenuItemClick.bind(null, product)} />}
                />
            );
        });

        return finishedProductsList;
    },

    getBedgeStyle: function() {
        if(this.getFinishedProducts() === 0){
            return style.invisible;
        }
        else{
            return style.headerBadge
        }
    },

    render: function() {
        console.log(this.state.finishedProducts);
        return (
            <AppBar
                title="Boento"
                showMenuIconButton={false}
            >
                {
                    this.props.authed===true
                    ?
                    <div>
                        <IconMenu
                            iconButtonElement={
                                <IconButton>
                                    <Badge
                                        badgeContent={this.getFinishedProducts()}
                                        secondary={true}
                                        badgeStyle={this.getBedgeStyle()}
                                    >
                                        <Avatar icon={<NotificationsIcon />} style={style.headerNotifications} />
                                    </Badge>
                                </IconButton>
                            }
                            anchorOrigin={{horizontal: 'middle', vertical: 'top'}}
                            targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                        >
                            {this.mapFinishedProducts()}
                        </IconMenu>
                        <Avatar icon={<Settings />}/>
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
