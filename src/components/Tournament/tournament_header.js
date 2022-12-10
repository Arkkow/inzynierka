// General React imports
import * as React from 'react';

// Project specific files
import {Container, Row, Col} from "react-bootstrap";
import T_registration_popup from "../popups/T_registration_popup";

// CSS files
import { GeoAlt, CalendarCheck } from "react-bootstrap-icons";
import cup_logo from "../../assets/cup.svg";


export const TournamentHeader = (props) => {

    return (
        <Container fluid="true" style={{background: "#99D17B", minHeight: "30vh", paddingTop: "2%", paddingBottom: "3%"}}>
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
                                <h1>{props.calendar_list.name}</h1>
                            </Col>
                        </Row>
                        <Row>
                            <h2><GeoAlt size={40}/>&nbsp; {props.calendar_list.place}</h2>
                        </Row>
                        <Row>
                            <h3>
                                <CalendarCheck size={30}/>&nbsp; od {props.calendar_list.from}
                            </h3>
                        </Row>
                        <Row>
                            <h3>
                                <CalendarCheck size={30}/>&nbsp; do {props.calendar_list.to}
                            </h3>
                        </Row>
                    </Container>
                </Col>
                <Col sm={4} style={{ }}>
                    <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                        <T_registration_popup/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default TournamentHeader;