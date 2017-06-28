import React from "react";
import createReactClass from "create-react-class";
import { Cell, List, ListItem, ListItemContent } from "react-mdl";
import { base, firebaseAuth } from "../../config/constants";

var Staff= createReactClass({
    componentWillMount: function() {
        var currentUser = firebaseAuth().currentUser.uid;
        this.setState({
            staffs: [],
            company: ""
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
            <Cell col={12}>
                <List>
                    {this.mapListView()}
                </List>
            </Cell>
        );
    }
});

export default Staff;
