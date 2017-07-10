import React from "react";
import createReactClass from "create-react-class";
import { Link } from "react-router-dom";
import { Grid, Cell, DataTable, TableHeader, IconButton } from "react-mdl";
import { base } from "../../config/constants";
import { style } from "../../css/styles.js"

var Product = createReactClass({
    componentWillMount: function() {
        this.setState({
            product: [{
                affiliated: "",
                amount: "",
                company: "",
                details: "",
                key: "",
                name: "",
                rawMaterial: []
            }]
        });
        base.syncState(`products/${this.props.match.params.productId}`, {
            context: this,
            state: "product",
            asArray: true
        });
    },

    mapRawMaterial: function() {
        var rawMaterialArray = [];

        if(this.state.product[0].rawMaterial) {
            for(var i=0; i<this.state.product[0].rawMaterial.length; i++){
                var rawMaterial = {
                    no: (i+1),
                    name: this.state.product[0].rawMaterial[i].name,
                    amount: this.state.product[0].rawMaterial[i].amount+" "+this.state.product[0].rawMaterial[i].unit
                }
                rawMaterialArray.push(rawMaterial);
            }
        }

        return rawMaterialArray;
    },

    render: function() {
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
                                <TableHeader name="amount" tooltip="Needed amount of the raw material.">Amount</TableHeader>
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
