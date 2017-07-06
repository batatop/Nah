import React from "react";
import createReactClass from "create-react-class";
import { Grid, Cell, List, ListItem, ListItemContent, Textfield, Button } from "react-mdl";
import { base, firebaseAuth } from "../../config/constants";
import { authStaff } from '../../helpers/auth';
import { style } from '../../css/styles.js';

var Staff= createReactClass({
    componentWillMount: function() {
        var currentUser = firebaseAuth().currentUser.uid;
        this.setState({
            staffs: [],
            company: "",
            staffHierarcy: 2,
            hierarchy: ""
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
                    company: user[0].company,
                    hierarchy: user[0].hierarchy
                });
            }
        });
    },

    handleSubmit: function(event) {
        event.preventDefault();
        authStaff(this.state.email, this.state.pw, this.state.name, this.state.lastName, this.state.company, this.state.staffHierarcy)
            .catch((e) => this.setState({registerError: e.message}));
    },

    mapListView: function() {
        var listView = this.state.staffs.map(function(staff, i) {
            return (
                <ListItem key={"StaffList_"+i} twoLine>
                    <ListItemContent
                        avatar="person"
                        subtitle={"Hierarchy: "+staff.info.hierarchy}
                    >
                        {staff.info.name+" "+staff.info.lastName}
                    </ListItemContent>
                </ListItem>
            );
        });
        return listView;
    },

    render: function() {
        return (
            <Grid>
                <Cell col={12}>
                    <h1>Staff</h1>
                </Cell>
                {
                    this.state.hierarchy === 1
                    ?
                    <form onSubmit={this.handleSubmit}>
                        <Cell col={12}>
                            <Textfield
                                onChange={(staffHierarcy) => this.setState({staffHierarcy: staffHierarcy.target.value})}
                                pattern="-?[0-9]*(\.[0-9]+)?"
                                error="Input is not a number!"
                                label="Hierarchy"
                                floatingLabel
                            />
                        </Cell>
                        <Cell col={12}>
                            <Textfield
                                onChange={(name) => this.setState({name: name.target.value})}
                                label="Name"
                                floatingLabel
                            />
                            <Textfield
                                onChange={(lastName) => this.setState({lastName: lastName.target.value})}
                                label="Last Name"
                                floatingLabel
                            />
                        </Cell>
                        <Cell col={12}>
                            <Textfield
                                onChange={(email) => this.setState({email: email.target.value})}
                                label="E-mail"
                                floatingLabel
                            />
                        </Cell>
                        <Cell col={12}>
                            <Textfield
                                onChange={(pw) => this.setState({pw: pw.target.value})}
                                label="Password"
                                type="password"
                                floatingLabel
                            />
                        </Cell>
                        {
                            this.state.registerError &&
                            <Cell col={12} style={style.alert} role="alert">
                                <span>Error:</span>
                                &nbsp;{this.state.registerError}
                            </Cell>
                        }
                        <Cell col={12}>
                            <Button type="submit" raised ripple>Register Staff Member</Button>
                        </Cell>
                    </form>
                    :
                    <div></div>
                }
                <Cell>
                    <List>
                        {this.mapListView()}
                    </List>
                </Cell>
            </Grid>
        );
    }
});

export default Staff;
