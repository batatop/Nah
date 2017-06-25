import React, { Component } from 'react'
import { auth } from '../../helpers/auth'
import { Grid, Cell, Textfield, Button } from 'react-mdl'
import { style } from '../../css/styles.js'

function setErrorMsg(error) {
    return {
        registerError: error.message
    }
}

export default class Register extends Component {
    state = { registerError: null }
    email = {
        value: ""
    }
    pw = {
        value: ""
    }
    handleSubmit = (e) => {
        e.preventDefault()
        auth(this.email.value, this.pw.value)
        .catch(e => this.setState(setErrorMsg(e)))
    }
    render () {
        return (
            <Grid>
                <Cell col={12}>
                    <h1>Register</h1>
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
}
