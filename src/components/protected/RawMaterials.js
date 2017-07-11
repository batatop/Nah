import React from "react";
import createReactClass from "create-react-class";
import { Grid, Cell, DataTable, TableHeader, Textfield, Button, Icon } from "react-mdl";
import { base, firebaseAuth } from "../../config/constants";
import { style } from "../../css/styles.js"

var RawMaterials = createReactClass({
    componentWillMount() {
        var currentUser = firebaseAuth().currentUser.uid;
        this.setState({
            rawMaterials: [],
            name: "",
            company: "",
            inStock: "",
            unit: "",
            reserved: 0,
            hierarchy: "",
            dropdown: false,
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
                this.setState({
                    company: user[0].company,
                    hierarchy: user[0].hierarchy
                });
            }
        });
    },

    handleAddRawMaterial: function() {
        var self = this;
        base.push('rawMaterials', {
            data: {
                info: {
                    name: this.state.name,
                    company: this.state.company,
                    inStock: this.state.inStock,
                    unit: this.state.unit,
                    reserved: 0
                }
            },
            then(err){
                if(!err){
                    self.setState({
                        name: "",
                        inStock: "",
                        unit: ""
                    });
                }
            }
        });
    },

    handleDropdown: function() {
        if(this.state.dropdown){
            this.setState({dropdown: false});
        }
        else{
            this.setState({dropdown: true});
        }
    },

    dropdownIcon: function() {
        if(this.state.dropdown){
            return <Icon name="keyboard_arrow_up" />
        }
        else{
            return <Icon name="keyboard_arrow_down" />
        }
    },

    mapRawMaterial: function() {
        var rawMaterialArray = [];

        for(var i=0; i<this.state.rawMaterials.length; i++){
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
        return (
            <Grid>
                <Cell col={12}>
                    <h1>Raw Materials</h1>
                </Cell>
                {
                    this.state.hierarchy === 1
                    ?
                    <div>
                        <Button onClick={this.handleDropdown} style={style.button} raised ripple>New Raw Material {this.dropdownIcon()}</Button>
                        {
                            this.state.dropdown
                            ?
                            <Grid>
                                <Cell col={12}>
                                    <Textfield
                                        value={this.state.name}
                                        onChange={(name) => this.setState({name: name.target.value})}
                                        label="Raw Material Name"
                                        floatingLabel
                                    />
                                </Cell>
                                <Cell col={6}>
                                    <Textfield
                                        value={this.state.inStock}
                                        onChange={(inStock) => this.setState({inStock: inStock.target.value})}
                                        label="In Stock"
                                        pattern="-?[0-9]*(\.[0-9]+)?"
                                        error="Input has to be a number."
                                        floatingLabel
                                    />
                                </Cell>
                                <Cell col={6}>
                                    <Textfield
                                        value={this.state.unit}
                                        onChange={(unit) => this.setState({unit: unit.target.value})}
                                        label="Unit"
                                        floatingLabel
                                    />
                                </Cell>
                                <Cell col={12}>
                                    <Button onClick={this.handleAddRawMaterial} style={style.button} raised ripple>Add Raw Material</Button>
                                </Cell>
                            </Grid>
                            :
                            <div></div>
                        }
                    </div>
                    :
                    <div></div>
                }
                    <Cell col={12}>
                        <h4>Raw Materials</h4>
                        <DataTable
                            style={style.dataTable}
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
