// General React imports
import * as React from "react";

// Project specific files
import Calendar_controller from "../components/calendar/calendar_controller";
import CalendarNavbar from "../components/calendar/calendarNavbar/calendar_navbar";

// CSS files
import "../styles/index.css";
import "../styles/App.css";
import CalNav from "../components/calendar/calendarNavbar/calNav";
import Container from "react-bootstrap/Container";
import {Col, Form, Nav, Row} from "react-bootstrap";
import TournamentContent from "../components/Tournament/tournament_controller";
import TournamentHeader from "../components/Tournament/tournament_header";
import Button from "react-bootstrap/Button";
import Zapisy from "../components/Tournament/zapisy/zapisy";
import Drabinka from "../components/Tournament/zakładki/drabinka/drabinka";
import TournamentNavbar from "../components/Tournament/common/tournament_navbar";


export default function TournamentPlayRoute() {
    return (
        <Container fluid style={{background: "#c2d1b8", minHeight: "94vh", padding: "0 1%"}}>
            <TournamentNavbar/>
            <Drabinka/>
        </Container>
    );
}
