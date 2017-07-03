import React from "react";
import createReactClass from 'create-react-class';
import { Grid, Cell, Textfield, Button } from 'react-mdl'
import { AutoComplete } from "react-mdl-extra";
import { base, firebaseAuth } from '../../config/constants'

var New = createReactClass({
    componentWillMount() {
        var currentUser = firebaseAuth().currentUser.uid;
        this.setState({
            name: "",
            company: "",
            afilliated: "",
            amount: "",
            details: "",
            rawMaterial: [],
            staffs: [],
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
                    rawMaterial: this.state.rawMaterial
                }
            },
            then(err){
                if(!err){
                    console.log('added');
                }
            }
        });
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

    render: function() {
        return (
            <Grid>
                <Cell col={12}>
                    <h1>New</h1>
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
                <Cell col={12}>
                    <Textfield
                        onChange={(rawMaterial) => {
                            var rawMaterialObjects = [];
                            var rawMaterialArray = rawMaterial.target.value.split('\n');
                            for(var i=0; i<rawMaterialArray.length; i++){
                                var singleRawMaterial = rawMaterialArray[i].split(' ');
                                var singleRawMaterialObject = {
                                    name: singleRawMaterial[0],
                                    amount: singleRawMaterial[1]
                                }
                                rawMaterialObjects.push(singleRawMaterialObject);
                            }
                            this.setState({rawMaterial: rawMaterialObjects});
                        }}
                        label="Raw Materials"
                        rows={3}
                        floatingLabel
                    />
                </Cell>
                <Cell col={12}>
                    <Button onClick={this.handleAddProduct} raised ripple>Add Product</Button>
                </Cell>
            </Grid>
        );
    }
});

export default New;
