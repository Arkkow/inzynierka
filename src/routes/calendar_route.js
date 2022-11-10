// General React imports
import * as React from "react";

// Project specific files

// CSS files
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import "../styles/App.css";
import SingleCard from "../components/single_card/single_card";

export default function CalendarRoute() {
  return (
          <div>
      <h2>Calendar</h2>
      <SingleCard />
    </div>
  );
}
