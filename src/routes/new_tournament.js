// General React imports
import * as React from "react";

// Project specific files

// CSS files
import "../styles/index.css";
import "../styles/App.css";
import TitlePage from "../components/new_tournament/page_with_title/page_with_title";
import TournamentForm from "../components/new_tournament/tournament_form/tournament_form";

export default function NewTournamentRoute() {
  return (
    <div>
        <TitlePage></TitlePage>
    </div>
  );
}
