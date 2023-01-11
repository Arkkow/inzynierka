// General React imports
import * as React from "react";

// Project specific files
import Calendar_controller from "../components/calendar/calendar_controller";
import CalNav from "../components/calendar/calendar_navbar/calendar_navbar.js";

// CSS files
import "../styles/index.css";
import "../styles/App.css";
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function CalendarRoute() {
    return (
        <Container fluid="true" style={{background: "#689F82", minHeight: "94vh", paddingTop: "2%"}}>
            <CalNav/>
            <Row className="justify-content-md-center">
                <Calendar_controller />
            </Row>
            <div style={{width: "100%", minHeight:"8vh", textAlign: "left", paddingTop:"1%", paddingLeft:"0.5%"}}>
                <paragraph style={{color:"white"}}>Masz jakiś problem lub coś nie działa tak jak powinno?</paragraph><br/>
                <paragraph style={{color:"white"}}>Skontaktuj się z nami - padeltournamentsystems@gmail.com</paragraph>
            </div>
        </Container>

    );
}
