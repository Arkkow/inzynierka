// General React imports
import * as React from "react";

// Project specific files
import Calendar_controller from "../components/calendar/calendar_controller";
import CalendarNavbar from "../components/calendar/calendarNavbar/calendar_navbar";

// CSS files
import "../styles/index.css";
import "../styles/App.css";


export default function CalendarRoute() {
  return (
    <div style={{
        background: "#c2d1b8",
        minHeight:"94vh"
    }}>
        <div>
            <CalendarNavbar/>
            <Calendar_controller />
        </div>
    </div>
  );
}
