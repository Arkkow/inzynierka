import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Popup from 'reactjs-popup';

const registerUser = () => {
    <Popup trigger={<button className="button">Open Modal</button>} modal>
        <span>Modal content</span>
    </Popup>
};

class Register extends Component {

    handleSubmit = event => {
        event.preventDefault();
        console.log(event.target.username.value);
        console.log(event.target.password.value);
        this.registerUser(event.target.username.value, event.target.password.value);
    }

    registerUser(username, password) {
        fetch('https://dragonmaster.pl/inz/user/create', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(function (response) {
            if (response.status === 200) {
                console.log("User registered");
            } else {
                console.log("User not registered");
            }
        }).catch(function (error) {
            console.log("Error")
        })
    }

    render() {
        return <div className="Register">
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="username" size="lg">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" name="username" />
                </Form.Group>

                <Form.Group controlId="password" size="lg">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" />
                </Form.Group>

                <Button size="lg" type="submit">Register</Button>
            </Form>
        </div >
    }
}

export default Registration;
