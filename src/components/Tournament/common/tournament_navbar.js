// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';


// CSS files
import { ButtonGroup} from "react-bootstrap";
import {useState} from "react";
import {getPendingApprovals} from "../../api/api";


export const TournamentNavbar = (props) => {
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
        </ButtonGroup>
    );
}

export default TournamentNavbar;