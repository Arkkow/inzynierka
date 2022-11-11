import React from "react";
import TournamentForm from "../tournament_form/tournament_form";
import "../page_with_title/page_with_title.css";


function TitlePage() {
    return (
        <div className="background">
            <page_title>Dodawanie turnieju</page_title>
            <TournamentForm />
        </div>
    );
}

export default TitlePage;