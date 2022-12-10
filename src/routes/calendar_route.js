// General React imports
import * as React from "react";

// Project specific files
import Calendar_controller from "../components/calendar/calendar_controller";
import CalNav from "../components/calendar/calendarNavbar/calNav.js";

// CSS files
import "../styles/index.css";
import "../styles/App.css";
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";



export default function CalendarRoute() {
  return (
        <Container fluid="true" style={{background: "#c2d1b8", minHeight: "94vh", paddingTop: "2%"}}>
            <Row className="justify-content-md-center">
                <Col sm="6">
                    <CalNav/>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Calendar_controller />
            </Row>
        </Container>
  );
}
