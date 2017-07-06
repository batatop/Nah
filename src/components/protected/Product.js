import React from "react";
import createReactClass from "create-react-class";
import { Grid, Cell, DataTable, TableHeader } from "react-mdl";
import { base } from "../../config/constants";

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

        for(var i=0; i<this.state.product[0].rawMaterial.length; i++){
            var rawMaterial = {
                no: (i+1),
                name: this.state.product[0].rawMaterial[i].name,
                amount: this.state.product[0].rawMaterial[i].amount+" "+this.state.product[0].rawMaterial[i].unit
            }
            rawMaterialArray.push(rawMaterial);
        }

        return rawMaterialArray;
    },

    render: function() {
        return(
            <Grid>
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
                <Cell col={12}>
                    <h4>Raw Materials</h4>
                    <DataTable
                        shadow={2}
                        rows={this.mapRawMaterial()}
                    >
                        <TableHeader name="no" tooltip="Row number.">No.</TableHeader>
                        <TableHeader name="name" tooltip="Raw material name.">Name</TableHeader>
                        <TableHeader name="amount" tooltip="Needed amount of the raw material.">Amount</TableHeader>
                    </DataTable>
                </Cell>
            </Grid>
        );
    }
});

export default Product;
