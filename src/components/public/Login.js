import React, { Component } from 'react'
import { login, resetPassword } from '../../helpers/auth'
import { Grid, Cell, Textfield, Button } from 'react-mdl'
import { style } from '../../css/styles.js'

function setErrorMsg(error) {
    return {
        loginMessage: error
    }
}

export default class Login extends Component {
    state = { loginMessage: null }
    email = {
        value: ""
    }
    pw = {
        value: ""
    }
    handleSubmit = (e) => {
        e.preventDefault()
        login(this.email.value, this.pw.value)
            .catch((error) => {
                this.setState(setErrorMsg('Invalid username/password.'))
            })
    }
    resetPassword = () => {
        resetPassword(this.email.value)
            .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.email.value}.`)))
                .catch((error) => this.setState(setErrorMsg(`Email address not found.`)))
    }
    render () {
        return (
            <Grid>
                <Cell col={12}>
                    <h1>Login</h1>
                </Cell>
                <form onSubmit={this.handleSubmit}>
                    <Cell col={12}>
                        <Textfield
                            onChange={(email) => this.email = email.target}
                            label="E-mail..."
                            floatingLabel
                        />
                    </Cell>
                    <Cell col={12}>
                        <Textfield
                            onChange={(pw) => this.pw = pw.target}
                            label="Password..."
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
                        <Button type="submit" raised ripple>Login</Button>
                    </Cell>
                </form>
            </Grid>
        )
    }
}
