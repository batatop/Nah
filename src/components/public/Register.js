import React from 'react';
import createReactClass from 'create-react-class';
import { saveUser } from '../../helpers/auth';
import { Grid, Cell, Textfield, Button } from 'react-mdl';
import { style } from '../../css/styles.js';

var Register = createReactClass({
    componentWillMount: function() {
        this.setState({
            registerError: null,
            email: "",
            pw: "",
            company: "",
            name: "",
            lastName: "",
            hierarchy: 1
        });
    },

    handleSubmit: function(event) {
        event.preventDefault();
        saveUser(this.state.email, this.state.pw, this.state.name, this.state.lastName, this.state.company, this.state.hierarchy)
            .catch((e) => this.setState({registerError: e.message}));
    },

    render: function() {
        return (
            <Grid>
                <Cell col={12}>
                    <h1>Register</h1>
                </Cell>
                <form onSubmit={this.handleSubmit}>
                    <Cell col={12}>
                        <Textfield
                            onChange={(company) => this.setState({company: company.target.value})}
                            label="Company"
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
                        <Button type="submit" raised ripple>Register</Button>
                    </Cell>
                </form>
            </Grid>
        )
    }
});

export default Register;
