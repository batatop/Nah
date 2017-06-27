import React from "react";
import createReactClass from 'create-react-class';
import { style } from '../../css/styles.js'
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button, ProgressBar, IconButton, List, ListItem, ListItemContent, ListItemAction } from 'react-mdl';
import { base } from '../../config/constants'

var Dashboard = createReactClass({
    componentWillMount() {
        this.setState({
            view: true,
            products: []
        });
        base.syncState(`products`, {
            context: this,
            state: 'products',
            asArray: true
        });
    },

    handleViewClick(view) {
        if(view === "module"){
            this.setState({view: true});
        }
        else{
            this.setState({view: false});
        }
    },

    mapCardView() {
        var cardView = this.state.products.map(function(product, i) {
            return (
                <Cell key={'Card_'+i} col={4}>
                    <Card shadow={2} style={style.productModule}>
                        <CardTitle>
                            {product.name}<br />
                            {product.afilliated}
                        </CardTitle>
                        <CardText>
                            {product.amount}
                        </CardText>
                        <CardActions border>
                            <Button colored>Details</Button>
                        </CardActions>
                        <ProgressBar progress={product.progress} />
                    </Card>
                </Cell>
            );
        });
        return cardView;
    },

    mapListView() {
        var listView = this.state.products.map(function(product, i) {
            return (
                <ListItem key={'List_'+i} style={style.productList}>
                    <ListItemContent>{product.name}</ListItemContent>
                    <ListItemContent><ProgressBar progress={product.progress}/></ListItemContent>
                    <ListItemContent>{product.afilliatedPerson}</ListItemContent>
                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                </ListItem>
            );
        });
        return listView;
    },

    render() {
        return (
            <div>
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
                            <List>
                                {this.mapListView()}
                            </List>
                    </Grid>
                    }
                </Cell>
            </div>
        );
    }
});

export default Dashboard;
