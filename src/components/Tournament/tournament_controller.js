// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import {useEffect} from "react";
import TournamentInfo from "./zakładki/tournament_informacje";
import TournamentNavbar from "./common/tournament_navbar";
import Drabinka from "./zakładki/drabinka/drabinka";
import Zapisy from "./zakładki/zapisy/zapisy";


export const Tournament_controller = (props) => {
    const id = window.location.href.split('?')[1].split('=')[1]

    useEffect(() =>
        {
            props.handleDownloadCalendarCard(id);
            props.handleDownloadLadders(id);
            props.handleDownloadPlayers(id);
        }, [])

    return (
        <Container fluid style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
            <Row className="justify-content-md-center" >
                <Col sm={6} style={{paddingLeft: 0, paddingRight:0}}>
                    <TournamentNavbar {...props}/>

                    {
                        props.view.tournament_tab === "info"?
                            <TournamentInfo {...props}/>:
                        props.view.tournament_tab === "zapisy"?
                            <Zapisy {...props}/>:
                        props.view.tournament_tab === "wyniki"?
                            <Drabinka {...props}/>:
                            null
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default Tournament_controller;
