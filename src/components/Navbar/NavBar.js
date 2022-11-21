import React from 'react';
import Button from 'react-bootstrap/Button';
import Login from './Login/Login';
import './NavBar.css';

function NavBar() {
    return (
        <div className="navBar">
            <Button>Tu bedzie logo</Button>
            <Button>Kalendarz turniejów</Button>
            <Button>Ranking</Button>
            <Button>Kontakt</Button>
            <Login />
        </div>
    )
}

export default NavBar