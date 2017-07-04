import React from "react";
import createReactClass from "create-react-class";
import { Grid, Cell, DataTable, TableHeader, Textfield, Button } from "react-mdl";
import { base, firebaseAuth } from "../../config/constants";

var RawMaterials = createReactClass({
    componentWillMount() {
        var currentUser = firebaseAuth().currentUser.uid;
        this.setState({
            rawMaterials: [],
            name: "",
            company: "",
            inStock: "",
            unit: ""
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
                this.setState({
                    company: user[0].company
                });
            }
        });
        base.syncState(`rawMaterials`, {
            context: this,
            state: 'rawMaterials',
            asArray: true
        });
    },

    handleAddRawMaterial: function() {
        base.push('rawMaterials', {
            data: {
                info: {
                    name: this.state.name,
                    company: this.state.company,
                    inStock: this.state.inStock,
                    unit: this.state.unit
                }
            },
            then(err){
                if(!err){
                    console.log('added');
                }
            }
        });
    },

    mapRawMaterial: function() {
        var rawMaterialArray = [];

        for(var i=0; i<this.state.rawMaterials.length; i++){
            console.log(this.state.rawMaterials[i]);
            var rawMaterial = {
                no: (i+1),
                name: this.state.rawMaterials[i].info.name,
                stock: this.state.rawMaterials[i].info.inStock+" "+this.state.rawMaterials[i].info.unit,
            }
            rawMaterialArray.push(rawMaterial);
        }

        return rawMaterialArray;
    },

    render() {
        console.log(this.state.rawMaterials);
        return (
            <Grid>
                <Cell col={12}>
                    <h1>Raw Materials</h1>
                </Cell>
                <Cell col={12}>
                    <Textfield
                        onChange={(name) => this.setState({name: name.target.value})}
                        label="Raw Material Name"
                        floatingLabel
                    />
                </Cell>
                <Cell col={12}>
                    <Textfield
                        onChange={(inStock) => this.setState({inStock: inStock.target.value})}
                        label="In Stock"
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input has to be a number."
                        floatingLabel
                    />
                    <Textfield
                        onChange={(unit) => this.setState({unit: unit.target.value})}
                        label="Unit"
                        floatingLabel
                    />
                </Cell>
                <Cell col={12}>
                    <Button onClick={this.handleAddRawMaterial} raised ripple>Add Raw Material</Button>
                </Cell>
                <Cell col={12}>
                    <h4>Raw Materials</h4>
                    <DataTable
                        shadow={2}
                        rows={this.mapRawMaterial()}
                    >
                        <TableHeader name="no" tooltip="Row number.">No.</TableHeader>
                        <TableHeader name="name" tooltip="Raw material name.">Name</TableHeader>
                        <TableHeader name="stock" tooltip="Raw material in stock">In Stock</TableHeader>
                    </DataTable>
                </Cell>
            </Grid>
        );
    }
});

export default RawMaterials;
