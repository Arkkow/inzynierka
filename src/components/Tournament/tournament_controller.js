// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';

// CSS files
import {Container, Row, Col } from "react-bootstrap";
import TournamentNavbar from "./navbar/tournament_navbar";
import {useEffect} from "react";


export const Tournament_controller = (props) => {
    const id = window.location.href.split('?')[1].split('=')[1]

    useEffect(() => {props.handleDownloadCalendarCard(id)}, [])


    return (
        <Container fluid style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
            <Row className="justify-content-md-center" >
                <Col sm={6} style={{paddingLeft: 0, paddingRight:0}}>
                    <Container>
                        <Row fluid style={{backgroundColor: "transparent"}}>
                            <Col sm={10} >
                                <TournamentNavbar/>
                            </Col>
                        </Row>
                        <Container style={{background: "white"}}>
                            <Row style={{borderBottom: "1px solid black", paddingLeft: "5%", paddingRight: "5%", marginTop: "0.25%", paddingTop: "0.5%"}}>

                                <h3>{props.calendar_list.name}</h3>

                            </Row>
                            <Row style={{borderBottom: "1px solid black", paddingLeft: "5%", paddingRight: "5%"}}>
                                <h4>{props.calendar_list.place}</h4>
                            </Row>
                            <Row style={{paddingLeft: "5%", paddingRight: "5%"}}>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Od</h5>
                                    <div>
                                        {props.calendar_list.from}
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Do</h5>
                                    <div>
                                        {props.calendar_list.to}
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Wpisowe</h5>
                                    <div>
                                        {props.calendar_list.entryFee} zł/os
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Ranga</h5>
                                    <div>
                                        {props.calendar_list.rang}
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>System turniejowy</h5>
                                    <div>
                                        {props.calendar_list.typeOfLadder}
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Kategorie</h5>
                                    <div>
                                        <Button variant="success" disabled="true" style={{paddingTop: "0", paddingBottom: "0", marginTop: "1%"}}>OPEN</Button>
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Zapisy do</h5>
                                    <div>
                                        {props.calendar_list.entriesTo}
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Czy rankingowy</h5>
                                    <div>
                                        TODO czy rankingowy
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Dyrektor turnieju</h5>
                                    <div>
                                        <div>{props.calendar_list.director}</div>
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Dodatkowe informacje</h5>
                                    <div>
                                        {props.calendar_list.additionalInformations}
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Tournament_controller;
