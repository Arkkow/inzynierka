// General React imports
import * as React from "react";

// Project specific files
import Calendar_controller from "../components/calendar/calendar_controller";
// import CalendarNavbar from "../components/calendar/calendarNavbar/calendar_navbar";

// CSS files
import "../styles/index.css";
import "../styles/App.css";
// import SingleCard from "../components/single_card/single_card.js";
// import Register_popup from "../components/popups/register_popup"
import NewTournament_popup from "../components/popups/new_tournament_type.js";
import TemplateSelect_popup from "../components/popups/template_select.js";
import PastTournamentSelect_popup from "../components/popups/past_tournament_select.js";
import CalNav from "../components/calendar/calendarNavbar/calNav.js";
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";


export default function CalendarRoute() {
  return (
        <Container fluid style={{background: "#c2d1b8", minHeight: "94vh", paddingTop: "2%"}}>
            <Row className="justify-content-md-center">
                <Col sm="6">
                    <CalNav/>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <NewTournament_popup/>
                <TemplateSelect_popup/>
                <PastTournamentSelect_popup/>
                <Calendar_controller />
                {/*<Calendar_controller />*/}
                {/*<Calendar_controller />*/}
                {/*<Calendar_controller />*/}
                {/*<Calendar_controller />*/}
            </Row>
        </Container>
  );
}
