// General React imports
import * as React from "react";


// Project specific files

// CSS files
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import "../styles/App.css";
import SingleCard from "../components/single_card/single_card";
import Register_popup from "../components/popups/register_popup"
import NewTournament_popup from "../components/popups/new_tournament_type";
import TemplateSelect_popup from "../components/popups/template_select";
import PastTournamentSelect_popup from "../components/popups/past_tournament_select";

export default function CalendarRoute() {
  return (
          <div>
      <h2>Calendar</h2>
      <SingleCard />
              <Register_popup/>
              <NewTournament_popup/>
              <TemplateSelect_popup/>
              <PastTournamentSelect_popup/>

    </div>
  );
}
