// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';


// CSS files
import { ButtonGroup} from "react-bootstrap";
import {useState} from "react";
import {getPendingApprovals} from "../../api/api";


export const TournamentNavbar = (props) => {
    const id = window.location.href.split('?')[1].split('=')[1];
    const [invitations, setInvitations] = useState({ fetched: false, data: [] });
    if (invitations.fetched === false) {
        getPendingApprovals().then((dane) => {
            setInvitations({ fetched: true, data: dane });
        });
    }
    return (
        <ButtonGroup style={{marginTop: "0.25%"}}>

            <Button
                    onClick={() => props.handleGOTO("info")}
                    variant="light"
                    style={{border: "1px solid black"}}>
                Informacje
            </Button>

            <Button
                    onClick={() => props.handleGOTO("zapisy")}
                    variant="light"
                    style={{border: "1px solid black"}}>
                Zapisy
            </Button>

            <Button
                onClick={() => props.handleGOTO("wyniki")}
                variant="light"
                style={{border: "1px solid black"}}>
                Wyniki
            </Button>
            {invitations.fetched === false ? null:
                (
                    invitations.data.slice(0,1).map((invitation) => (invitation.tournament === id ?

            <Button
                onClick={() => props.handleGOTO("Zaproszenia na turniej")}
                variant="light"
                style={{border: "1px solid black"}}>
                Zaproszenia na turniej
            </Button>   : null
                    )))}
        </ButtonGroup>
    );
}

export default TournamentNavbar;