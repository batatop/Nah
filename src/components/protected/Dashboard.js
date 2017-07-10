import React from "react";
import createReactClass from "create-react-class";
import { Link } from "react-router-dom";
import { Grid, Cell, Card, CardTitle, CardText, CardActions, ProgressBar, IconButton, List, ListItem, ListItemContent, ListItemAction } from "react-mdl";
import { base, firebaseAuth } from "../../config/constants";
import { style } from "../../css/styles.js"

var Dashboard = createReactClass({
    componentWillMount: function() {
        var currentUser = firebaseAuth().currentUser.uid;
        this.setState({
            view: true,
            company: "",
            products: []
        });
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
                    company: user[0].company
                });
            }
        });
    },

    handleViewClick: function(view) {
        if(view === "module"){
            this.setState({view: true});
        }
        else{
            this.setState({view: false});
        }
    },

    mapCardView: function() {
        var cardView = this.state.products.map(function(product, i) {
            return (
                <Cell key={"ProductCard_"+i} col={4}>
                    <Card style={style.productModule}>
                        <CardTitle>
                            {product.info.name}<br />
                            {product.info.afilliated}
                        </CardTitle>
                        <CardText>
                            {product.info.amount}
                        </CardText>
                        <CardActions border>
                            <Link to={"/product/"+product.key}>Details</Link>
                        </CardActions>
                        <ProgressBar progress={product.info.progress} />
                    </Card>
                </Cell>
            );
        });
        return cardView;
    },

    mapListView: function() {
        var listView = this.state.products.map(function(product, i) {
            return (
                <ListItem key={"ProductList_"+i} style={style.productList}>
                    <ListItemContent>{product.info.name}</ListItemContent>
                    <ListItemContent><ProgressBar progress={product.info.progress}/></ListItemContent>
                    <ListItemContent>{product.info.afilliated}</ListItemContent>
                    <ListItemAction>
                        <Link to={"/product/"+product.key}><IconButton name="arrow_forward" /></Link>
                    </ListItemAction>
                </ListItem>
            );
        });
        return listView;
    },

    render: function() {
        return (
            <Grid>
                <Cell col={12}>
                    <IconButton name="view_list" onClick={this.handleViewClick.bind(this, "list")} style={style.dashboardViewButtons} />
                    <IconButton name="view_module" onClick={this.handleViewClick.bind(this, "module")} style={style.dashboardViewButtons} />
                </Cell>
                <Cell col={12}>
                    {this.state.view
                        ?
                        <Grid>
                            {this.mapCardView()}
                        </Grid>
                        :
                        <Grid>
                            <List  style={style.fullWidth}>
                                {this.mapListView()}
                            </List>
                        </Grid>
                    }
                </Cell>
            </Grid>
        );
    }
});

export default Dashboard;
