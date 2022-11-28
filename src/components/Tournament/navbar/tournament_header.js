// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GeoAlt, CalendarCheck } from "react-bootstrap-icons";

// CSS files
import cup_logo from "../../../assets/cup.svg";
import {Container, Row, Col} from "react-bootstrap";


export const TournamentHeader = (props) => {
    console.log("HEADER")
    console.log(props)
    return (
        <Container fluid style={{background: "#99D17B", minHeight: "30vh", paddingTop: "2%", paddingBottom: "3%"}}>
            <Row>
                <Col sm={3}>
                    <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                        <img src={cup_logo} alt={""} style={{height: "100%", width: "auto", maxWidth: "40vh"}}/>
                    </div>
                </Col>
                <Col sm={5}>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col>
                                <h1>Turniej majowy</h1>
                            </Col>
                        </Row>
                        <Row>
                            <h2><GeoAlt size={40}/>&nbsp; Propadel, Warszawa</h2>
                        </Row>
                        <Row>
                            <h3>
                                <CalendarCheck size={30}/>&nbsp; od 13/05/2022
                            </h3>
                        </Row>
                        <Row>
                            <h3>
                                <CalendarCheck size={30}/>&nbsp; do 15/05/2022
                            </h3>
                        </Row>
                    </Container>
                </Col>
                <Col sm={4} style={{ }}>
                    <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                        <Button variant="success" style={{height: "15vh", width: "30vh" , borderRadius: "100px"}}><h2>ZAPISZ SIĘ</h2></Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default TournamentHeader;