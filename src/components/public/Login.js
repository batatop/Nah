import React from "react";
import createReactClass from "create-react-class";
import { login, resetPassword } from "../../helpers/auth";
import { Grid, Cell, Textfield, Button } from "react-mdl";
import { style } from "../../css/styles.js";

var Login = createReactClass({
    componentWillMount: function() {
        this.setState({
            loginMessage: null,
            email: "",
            pw: ""
        });
    },

    handleSubmit: function(e) {
        e.preventDefault()
        login(this.state.email, this.state.pw)
            .catch((error) => {
                this.setState({loginMessage: "Invalid username/password."})
            })
    },

    resetPassword: function() {
        resetPassword(this.state.email)
            .then(() => this.setState({loginMessage: `Password reset email sent to ${this.state.email}.`}))
                .catch((error) => this.setState({loginMessage: "Email address not found."}))
    },

    render: function() {
        return (
            <Grid>
                <Cell col={12}>
                    <h1>Login</h1>
                </Cell>
                <form onSubmit={this.handleSubmit}>
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
                        this.state.loginMessage &&
                        <Cell col={12} style={style.alert} role="alert">
                            <span>Error:</span>
                            &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword}>Forgot Password?</a>
                        </Cell>
                    }
                    <Cell col={12}>
                        <Button type="submit" style={style.button} raised ripple>Login</Button>
                    </Cell>
                </form>
            </Grid>
        )
    }
});

export default Login;
