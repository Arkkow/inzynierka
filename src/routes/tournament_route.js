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
import {Col, Form, Row} from "react-bootstrap";
import TournamentContent from "../components/Tournament/informacje/tournament_content";
import TournamentHeader from "../components/Tournament/navbar/tournament_header";
import Button from "react-bootstrap/Button";
import Zapisy from "../components/Tournament/zapisy/zapisy";
import Drabinka from "../components/Tournament/drabinka/drabinka";


export default function TournamentRoute() {
    return (
        <div style={{minHeight: "94vh"}}>
            <TournamentHeader/>
            <TournamentContent/>
            {/*<Zapisy/>*/}
            {/*<Drabinka/>*/}
        </div>
    );
}