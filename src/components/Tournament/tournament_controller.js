// General React imports
import * as React from 'react';
import {useEffect} from "react";

// Project specific files
import TournamentInfo from "./zakładki/tournament_informacje";
import TournamentNavbar from "./common/tournament_navbar";
import Calendar_invitation from "../calendar/calendar_card/conditionals/calendar_invitation";
import Drabinka from "./zakładki/drabinka/drabinka";
import Zapisy from "./zakładki/zapisy/zapisy";

// CSS files
import {Container, Row, Col} from "react-bootstrap";



export const Tournament_controller = (props) => {
    const id = window.location.href.split('?')[1].split('=')[1]

    useEffect(() =>
        {
            props.handleDownloadCalendarCard(id);
            props.handleDownloadLadders(id);
            props.handleDownloadPlayers(id);
            props.handleDownloadUser();
        }, [])

    return (
        <Container fluid="true" style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
            <Row className="justify-content-md-center" >
                <Col sm={6} style={{paddingLeft: 0, paddingRight:0}}>
                    <TournamentNavbar {...props}/>

                    {
                        props.view.tournament_tab === "info"?
                            <TournamentInfo {...props}/>:
                        props.view.tournament_tab === "zapisy"?
                            <Zapisy {...props} user = {props.user}/>:
                        props.view.tournament_tab === "wyniki"?
                            <Drabinka {...props}/>:
                            props.view.tournament_tab === "Zaproszenia na turniej"?
                                <Calendar_invitation {...props}/>:
                            null
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default Tournament_controller;
