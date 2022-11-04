import React from "react";
// import './tournament_single.css';
import cup from './cup.svg';
import trash from './trash.svg';

class Tournament_Box extends React.Component {
    constructor() {
        super();
        this.name = 'Turniej majowy'
        this.place = 'Warszawa'
        this.from = '3 lipca'
        this.to = '4 lipca'
        this.category = 'OPEN'
    }

    render() {
        return (
            <div className="tournamentBox"
                 onClick="window.location.href='../panel_organizatora/edycja turnieju/index.html'; saveIdTournament(${tournament.id});saveIdOrganisator(${tournament.creator});">

                <div className="tournamentIconBox">
                    <img className="tournamentIcon" src={cup} alt=""></img>
                </div>

                <div className="tournamentDataBox">
                    <div className="tournamentData">
                        <h4>{this.name}</h4>
                        {this.place}
                        {this.from} do {this.to}

                        <button className="tournamentOpen">{this.category}</button>
                    </div>
                </div>

                <input type="image" src={trash} className="dots"
                       onClick="tournamentDelete(${tournament.id}); event.stopPropagation();"/>
            </div>
    )
    }
}
export default Tournament_Box;
