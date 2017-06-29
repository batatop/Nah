import React from "react";
import createReactClass from "create-react-class";
import { Grid, Cell, List, ListItem, ListItemContent, Textfield } from "react-mdl";
import { base, firebaseAuth } from "../../config/constants";

var Staff= createReactClass({
    componentWillMount: function() {
        var currentUser = firebaseAuth().currentUser.uid;
        this.setState({
            staffs: [],
            company: "",
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
                    <Cell col={12}>
                        <Textfield
                            onChange={(name) => this.setState({name: name.target.value})}
                            label="Product Name"
                            floatingLabel
                        />
                    </Cell>
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
