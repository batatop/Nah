import React from "react";
import createReactClass from 'create-react-class';
import { Redirect } from 'react-router-dom'
import { Grid, Cell, Textfield, Button } from 'react-mdl'
import { base } from '../../config/constants'

var New = createReactClass({
    componentWillMount() {
        this.setState({
            name: '',
            afilliated: '',
            amount: '',
            details: '',
            rawMaterial: [],
            progress: 0
        });
    },

    handleAddProduct() {
        base.push('products', {
            data: {
                name: this.state.name,
                afilliated: this.state.afilliated,
                amount: this.state.amount,
                details: this.state.details,
                rawMaterial: this.state.rawMaterial
            },
            then(err){
                if(!err){
                    console.log('added');
                }
            }
        });
    },

    render() {
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
                    <Textfield
                        onChange={(afilliated) => this.setState({afilliated: afilliated.target.value})}
                        label="Afilliated Person"
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
