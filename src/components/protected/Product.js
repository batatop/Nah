import React from "react";
import createReactClass from "create-react-class";
import { Link } from "react-router-dom";
import { Grid, Cell, DataTable, TableHeader, IconButton } from "react-mdl";
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import { base, firebaseAuth } from "../../config/constants";
import { style } from "../../css/styles.js"

var Product = createReactClass({
    componentWillMount: function() {
        var currentUser = firebaseAuth().currentUser.uid;
        this.setState({
            product: [{
                affiliated: "",
                amount: "",
                company: "",
                details: "",
                finished: 0,
                key: "",
                name: "",
                rawMaterial: [],
            }],
            rawMaterials: [],
            finishedAmount: ""
        });
        base.fetch(`users/${currentUser}/`, {
            context: this,
            asArray: true,
            then(user) {
                base.syncState("users", {
                    context: this,
                    asArray: true,
                    state: "staffs",
                    queries: {
                        orderByChild: `info/company`,
                        equalTo: user[0].company
                    }
                });
                base.syncState(`rawMaterials`, {
                    context: this,
                    state: 'rawMaterials',
                    asArray: true,
                    queries: {
                        orderByChild: `info/company`,
                        equalTo: user[0].company
                    }
                });
            }
        });
        base.syncState(`products/${this.props.match.params.productId}`, {
            context: this,
            state: "product",
            asArray: true
        });
    },

    handleUpdateAmount: function(){
        var tempProduct = this.state.product;
        tempProduct[0].finished = parseInt(tempProduct[0].finished, 10)+parseInt(this.state.finishedAmount, 10);
        var updatedProduct = {
            info: tempProduct[0]
        }
        this.setState({product: updatedProduct});
    },

    mapRawMaterial: function() {
        var rawMaterialArray = [];
        if(this.state.product[0].rawMaterial) {
            for(var i=0; i<this.state.product[0].rawMaterial.length; i++){
                var rawMaterial = {
                    no: (i+1),
                    name: this.state.product[0].rawMaterial[i].name,
                    amount: this.state.product[0].rawMaterial[i].amount+" "+this.state.product[0].rawMaterial[i].unit,
                    reserved: (this.state.product[0].rawMaterial[i].amount*this.state.product[0].amount)+" "+this.state.product[0].rawMaterial[i].unit,
                    inStock: this.state.product[0].rawMaterial[i].inStock+" "+this.state.product[0].rawMaterial[i].unit,
                }
                rawMaterialArray.push(rawMaterial);
            }
        }

        return rawMaterialArray;
    },

    getProgress: function() {
        if(this.state.product[0].amount && this.state.product[0].finished){
            return (this.state.product[0].finished*100)/this.state.product[0].amount
        }
        return 0;
    },

    render: function() {
        console.log(this.state.rawMaterials);
        return(
            <Grid>
                <Cell col={12}>
                    <Link to={"/dashboard"}><IconButton name="arrow_back" style={style.dashboardViewButtons} /></Link>
                </Cell>
                <Cell col={12}>
                    <h1>{this.state.product[0].name}</h1>
                </Cell>
                <Cell col={12}>
                    <h4>Afilliated Person: {this.state.product[0].afilliated}</h4>
                </Cell>
                <Cell col={12}>
                    <h4>Details</h4>
                    <h5>{this.state.product[0].details}</h5>
                </Cell>
                <Cell col={4}>
                    <h4>Progress ({Math.round(this.getProgress())}%)</h4>
                    <CircularProgress
                        mode="determinate"
                        value={this.getProgress()}
                        size={200}
                        thickness={13}
                        style={style.productProgress}
                    />
                </Cell>
                <Cell col={8}>
                    <h4 style={style.invisible}>Null</h4>
                    <h5>Produced Amount: {this.state.product[0].finished}</h5>
                    <h5>Total Amount: {this.state.product[0].amount}</h5>
                    <TextField
                        value={this.state.finishedAmount}
                        onChange={(finishedAmount) => {this.setState({finishedAmount: finishedAmount.target.value})}}
                        hintText="Add to the finished amount"
                        floatingLabelText="Update Amount"
                    />
                    <RaisedButton
                        label="Update"
                        onClick={this.handleUpdateAmount}
                        style={style.updateButton}
                    />
                </Cell>
                {
                    this.mapRawMaterial().length !== 0
                    ?
                    <div>
                        <Cell col={12}>
                            <h4>Raw Materials</h4>
                            <DataTable
                                style={style.dataTable}
                                rows={this.mapRawMaterial()}
                            >
                                <TableHeader name="no" tooltip="Row number.">No.</TableHeader>
                                <TableHeader name="name" tooltip="Raw material name.">Name</TableHeader>
                                <TableHeader name="amount" tooltip="Needed amount for one product.">Amount</TableHeader>
                                <TableHeader name="reserved" tooltip="Raw material in the stock.">Reserved</TableHeader>
                                <TableHeader name="inStock" tooltip="Raw material in the stock.">In Stock</TableHeader>
                            </DataTable>
                        </Cell>
                    </div>
                    :
                    <div></div>
                }
            </Grid>
        );
    }
});

export default Product;
