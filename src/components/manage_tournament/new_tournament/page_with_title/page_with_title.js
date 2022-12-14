import React from "react";
import TournamentForm from "./tournament_form/tournament_form";
import "./page_with_title.css";


function TitlePage() {
    return (
        <div className="background">

            <page_title>Dodawanie turnieju</page_title>
            <TournamentForm />
            <div style={{width: "100%", minHeight:"8vh", textAlign: "left", paddingTop:"1%", paddingLeft:"0.5%"}}>
                <paragraph>Masz jakiś problem lub coś nie działa tak jak powinno?</paragraph><br/>
                <paragraph>Skontaktuj się z nami - padeltournamentsystems@gmail.com</paragraph>
            </div>
        </div>
    );
}

export default TitlePage;