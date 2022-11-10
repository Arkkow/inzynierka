// General React imports
import * as React from "react";

// Project specific files

// CSS files
import "../styles/index.css";
import "../styles/App.css";
import background_image from "../assets/leo.gif";
import Calendar_controller from "../components/calendar/calendar_controller";

export default function CalendarRoute() {
  return (
    <div style={{ backgroundImage: `url(${background_image})`, minHeight:"94vh"}}>
      <h2>Calendar</h2>
        <Calendar_controller />
    </div>
  );
}
