// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';

// CSS files
import {Container, Row, Col, ButtonGroup} from "react-bootstrap";
import {useEffect} from "react";
import TournamentInfo from "./zakładki/tournament_informacje";
import TournamentNavbar from "./common/tournament_navbar";


export const Tournament_controller = (props) => {
    const id = window.location.href.split('?')[1].split('=')[1]

    useEffect(() => {props.handleDownloadCalendarCard(id)}, [])

    return (
        <Container fluid style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
            <Row className="justify-content-md-center" >
                <Col sm={6} style={{paddingLeft: 0, paddingRight:0}}>
                    <TournamentNavbar/>
                    <TournamentInfo {...props}/>

                </Col>
            </Row>
        </Container>
    );
}

export default Tournament_controller;
