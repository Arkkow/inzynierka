import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';


async function loginUser(credentials) {
    return fetch('https://dragonmaster.pl/inz/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setToken }) {

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return (
        <Popup trigger={<Button> Zaloguj </Button>}
            modal>
            <div className="loginIn__Window">
                <h3>Logowanie</h3>
                <form onSubmit={handleSubmit} className="loginIn__Form">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control placeholder="Tutaj wpisz email lub nick" onChange={e => setUserName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Tutaj wpisz hasło" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button block size="lg" type="submit">
                        Submit
                    </Button>
                    <Button id="register">Zajerestruj</Button>
                </form>
            </div>
        </Popup>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};
