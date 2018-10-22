import React, { Component } from 'react'
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const SIGN_UP_MUTATION = gql`
    mutation SIGN_UP_MUTATION($email: String!, $name: String!, $password: String!){
        signUp(email: $email, name: $name, password: $password){
            id
            email
            name
        }    
    }
`;

export default class SignUp extends Component {
    state = {
        name:       '',
        email:      '',
        password:   ''
    }

    saveToState = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
        <Mutation mutation={SIGN_UP_MUTATION} variables={this.state}>
            {(signUp, {error, loading}) => {
                return (
                    <Form method='post' onSubmit={ async (e) => {
                        e.preventDefault();
                        await signUp();
                        this.setState({name: '', email: '', password: ''})
                    }}>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <h2>Sign Up for an Account</h2>
                            <ErrorMessage error={error}/>
                            <label htmlFor="email">
                                Email
                                <input type='email' name='email' placeholder='email' value={this.state.email} onChange={this.saveToState}/>
                            </label>
                            <label htmlFor="name">
                                Name
                                <input type='text' name='name' placeholder='name' value={this.state.name} onChange={this.saveToState}/>
                            </label>
                            <label htmlFor="password">
                                Password
                                <input type='password' name='password' placeholder='password' value={this.state.password} onChange={this.saveToState}/>
                            </label>
                            <button type='submit'>Sign Up!</button>
                        </fieldset>
                    </Form>
                )
            }}

        </Mutation>
        )
  }
}
