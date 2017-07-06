import React from "react";
import createReactClass from 'create-react-class';
import { Grid, Cell, Textfield, Button, FABButton, Icon, DataTable, TableHeader } from 'react-mdl'
import { AutoComplete } from "react-mdl-extra";
import { base, firebaseAuth } from '../../config/constants'

var AddProduct = createReactClass({
    componentWillMount() {
        var currentUser = firebaseAuth().currentUser.uid;
        this.setState({
            name: "",
            company: "",
            afilliated: "",
            amount: "",
            details: "",
            productRawMaterialName: "",
            productRawMaterialAmount: 0,
            productRawMaterialUnit: "",
            productRawMaterials: [],
            staffs: [],
            rawMaterials: [],
            progress: 0
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
                base.syncState("rawMaterials", {
                    context: this,
                    asArray: true,
                    state: "rawMaterials",
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

    handleAddProduct() {
        base.push('products', {
            data: {
                info: {
                    name: this.state.name,
                    company: this.state.company,
                    afilliated: this.state.afilliated,
                    amount: this.state.amount,
                    details: this.state.details,
                    rawMaterial: this.state.productRawMaterials
                }
            },
            then(err){
                if(!err){
                    console.log('added');
                }
            }
        });
    },

    handleAddMaterial: function() {
        var valid = true;
        var rawMaterialState = this.state.productRawMaterials;
        var rawMaterial = {
            name: "",
            amount: "",
            unit: ""
        };

        if(this.state.productRawMaterialUnit === "") {
            valid = false;
        }
        if(this.state.productRawMaterialAmount === 0) {
            valid = false;
        }
        if(valid) {
            rawMaterial.name = this.state.productRawMaterialName;
            rawMaterial.amount = this.state.productRawMaterialAmount;
            rawMaterial.unit = this.state.productRawMaterialUnit;
            rawMaterialState.push(rawMaterial);
            this.setState({productRawMaterials: rawMaterialState});
        }
    },

    getStaff: function() {
        var staffList = [];
        for(var i=0; i<this.state.staffs.length; i++) {
            var staff = {
                id: this.state.staffs[i].info.name + " " + this.state.staffs[i].info.lastName,
                name: this.state.staffs[i].info.name + " " + this.state.staffs[i].info.lastName
            };
            staffList.push(staff);
        }
        return staffList;
    },

    getRawMaterial: function() {
        var rawMaterialList = [];
        for(var i=0; i<this.state.rawMaterials.length; i++) {
            var rawMaterial = {
                id: this.state.rawMaterials[i].info.name,
                name: this.state.rawMaterials[i].info.name
            };
            rawMaterialList.push(rawMaterial);
        }
        return rawMaterialList;
    },

    setRawMaterialUnit: function(productRawMaterialName) {
        base.fetch('rawMaterials', {
            context: this,
            asArray: true,
            queries: {
                orderByChild: "info/name",
                equalTo: productRawMaterialName
            },
            then(data){
                if(data[0]) {
                    this.setState({productRawMaterialUnit: data[0].info.unit});
                }
                else {
                    this.setState({productRawMaterialUnit: ""});
                }
            }
        });
    },

    mapRawMaterial: function() {
        var rawMaterialArray = [];
        for(var i=0; i<this.state.productRawMaterials.length; i++){
            var rawMaterial = {
                no: (i+1),
                name: this.state.productRawMaterials[i].name,
                needed: this.state.productRawMaterials[i].amount
            }
            rawMaterialArray.push(rawMaterial);
        }

        return rawMaterialArray;
    },

    render: function() {
        return (
            <Grid>
                <Cell col={12}>
                    <h1>Add Product</h1>
                </Cell>
                <Cell col={12}>
                    <Textfield
                        onChange={(name) => this.setState({name: name.target.value})}
                        label="Product Name"
                        floatingLabel
                    />
                </Cell>
                <Cell col={12}>
                    <AutoComplete
                        value={this.state.afilliated}
                        onChange={(afilliated) => this.setState({afilliated: afilliated})}
                        label="Afilliated Person"
                        items={this.getStaff()}
                        valueIndex={"id"}
                        dataIndex={"name"}
                        floatingLabel
                    />
                </Cell>
                <Cell col={12}>
                    <Textfield
                        onChange={(amount) => this.setState({amount: amount.target.value})}
                        label="Amount"
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input has to be a number."
                        floatingLabel
                    />
                </Cell>
                <Cell col={12}>
                    <Textfield
                        onChange={(details) => this.setState({details: details.target.value})}
                        label="Details"
                        floatingLabel
                    />
                </Cell>
                <Cell col={5}>
                    <AutoComplete
                        value={this.state.productRawMaterialName}
                        onChange={(productRawMaterialName) => {
                            this.setRawMaterialUnit(productRawMaterialName);
                            this.setState({productRawMaterialName: productRawMaterialName});
                        }}
                        label="Raw Materials"
                        items={this.getRawMaterial()}
                        valueIndex={"id"}
                        dataIndex={"name"}
                        floatingLabel
                    />
                </Cell>
                <Cell col={5}>
                    <Textfield
                        onChange={(productRawMaterialAmount) => this.setState({productRawMaterialAmount: productRawMaterialAmount.target.value})}
                        label="Needed"
                        pattern="-?[0-9]*(\.[0-9]+)?"
                        error="Input has to be a number."
                        floatingLabel
                    />
                </Cell>
                <Cell col={1}>
                    <h5>{this.state.productRawMaterialUnit}</h5>
                </Cell>
                <Cell col={1}>
                    <FABButton
                        onClick={this.handleAddMaterial}
                        ripple
                    >
                        <Icon name="add" />
                    </FABButton>
                </Cell>
                <Cell col={12}>
                    {
                        this.state.productRawMaterials.length !== 0
                        ?
                        <div>
                            <DataTable
                                shadow={2}
                                rows={this.mapRawMaterial()}
                            >
                                <TableHeader name="no" tooltip="Row number.">No.</TableHeader>
                                <TableHeader name="name" tooltip="Raw material name.">Name</TableHeader>
                                <TableHeader name="needed" tooltip="Needed amount of the raw material.">Needed</TableHeader>
                            </DataTable>
                        </div>
                        :
                        <div></div>
                    }
                </Cell>
                <Cell col={12}>
                    <Button onClick={this.handleAddProduct} raised ripple>Add Product</Button>
                </Cell>
            </Grid>
        );
    }
});

export default AddProduct;
