// General React imports
import * as React from "react";

// Project specific files
import CalNav from "../components/calendar/calendar_navbar/calendar_navbar.js";

// CSS files
import "../styles/index.css";
import "../styles/App.css";
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

export default function NotFound() {
    setTimeout(window.location.href="calendar", 5000)

    return (
        <Container fluid="true" style={{background: "#689F82", minHeight: "94vh", paddingTop: "2%"}}>
            <div>
            <h1>Przepraszamy ale taka strona nie istnieje.</h1>
            </div>
            <Row className="justify-content-md-center">
            </Row>
        </Container>

);
}
