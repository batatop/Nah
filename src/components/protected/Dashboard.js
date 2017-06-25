import React from "react";
import { style } from '../../css/styles.js'
import { Grid, Cell, Card, CardTitle, CardText, CardActions, Button, ProgressBar, IconButton, List, ListItem, ListItemContent, ListItemAction } from 'react-mdl';

export default class Featured extends React.Component {
    componentWillMount() {
        this.setState({view: true});
    }

    handleViewClick(view) {
        if(view === "module"){
            this.setState({view: true});
        }
        else{
            this.setState({view: false});
        }
    }

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
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                                <Cell col={4}>
                                    <Card shadow={2} style={style.productModule}>
                                        <CardTitle>
                                            Product<br />
                                            Afilliated Person
                                        </CardTitle>
                                        <CardText>
                                            stock/in production
                                        </CardText>
                                        <CardActions border>
                                            <Button colored>Details</Button>
                                        </CardActions>
                                        <ProgressBar progress={Math.floor((Math.random() * 100))} />
                                    </Card>
                                </Cell>
                            </Grid>
                    :
                    <Grid>
                        <Cell col={12}>
                            <List>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                                <ListItem style={style.productList}>
                                    <ListItemContent>Product</ListItemContent>
                                    <ListItemContent><ProgressBar progress={Math.floor((Math.random() * 100))}/></ListItemContent>
                                    <ListItemContent>Affiliated Person</ListItemContent>
                                    <ListItemAction><IconButton name="arrow_forward" /></ListItemAction>
                                </ListItem>
                            </List>
                        </Cell>
                    </Grid>
                    }
                </Cell>
            </div>
        );
    }
}
