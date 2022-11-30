// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GeoAlt, CalendarCheck } from "react-bootstrap-icons";

// CSS files
import cup_logo from "../../../assets/cup.svg";
import {Container, Row, Col, ButtonGroup} from "react-bootstrap";


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