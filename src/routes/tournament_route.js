// General React imports
import * as React from "react";

// Project specific files

// CSS files
import "../styles/index.css";
import "../styles/App.css";
import TournamentContent from "../components/Tournament/informacje/tournament_content";
import TournamentHeader from "../components/Tournament/navbar/tournament_header";


export default function TournamentRoute() {
    return (
        <div style={{minHeight: "94vh"}}>
            <TournamentHeader/>
            <TournamentContent/>
        </div>
    );
}
