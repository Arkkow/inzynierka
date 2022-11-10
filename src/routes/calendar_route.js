// General React imports
import * as React from "react";

// Project specific files

// CSS files
// import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import "../styles/App.css";
import Calendar_controller from "../components/calendar/calendar_controller";

export default function CalendarRoute() {
  return (
    <div>
      <h2>Calendar</h2>
        <Calendar_controller />
    </div>
  );
}
