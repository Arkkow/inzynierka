// General React imports
import * as React from "react";

// Project specific files

// CSS files
import "../styles/index.css";
import "../styles/App.css";
import {Tournament_controller} from "../components/Tournament/tournament_controller";
import TournamentHeader from "../components/Tournament/tournament_header";
import {connect} from "react-redux";
import {getladders, getRegistrations, getTournamentById} from "../components/api/api";


function TournamentRoute(props) {
    return (
        <div style={{minHeight: "94vh"}}>
            <TournamentHeader {...props}/>
            <Tournament_controller {...props}/>
        </div>
    );
}


// Przypisanie do Calendar_controller.props stanów
const mapStateToProps = (state) => {
    return {
        calendar_list: state.calendar_content.data,
        user: state.user_content.data,
        view: state.view_content.data,
        pairs_list: state.pairs_content.data,
        ladders_list: state.ladders_content.data,
    }
}

//Wywołanie zmiany stanu (obsługa w store)
// Przekazanie data z API do stanu Calendar_controller
const mapDispatchToProps = (dispatch) => {
    const id = window.location.href.split('?')[1].split('=')[1]
    return {

        // DOWNLOAD_CALENDAR

        handleDownloadCalendarCard: (id) => {
            //    API z kalendarza
            getTournamentById(id)
                .then( res => {
                        return dispatch({type: "DOWNLOAD_CALENDAR", payload: {data: res}});
                    }
                )
                .catch((err) => {console.log(err)});
        },

        // TOURNAMENT_VIEW
        handleGOTO: (tab) => {

            return dispatch({type: "TOURNAMENT_VIEW", payload: {data: tab}});
        },

        // DOWNLOAD_LADDERS
        handleDownloadLadders: (tournament_id) => {
            //    API z kalendarza
            getladders(tournament_id)
                .then( res => {
                        return dispatch({type: "DOWNLOAD_LADDERS", payload: {data: res}});
                    }
                )
                .catch((err) => {console.log(err)});
        },

        // DOWNLOAD_PAIRS
        handleDownloadPlayers: (tournament_id) => {
            //    API z kalendarza
            getRegistrations(id)
                .then( res => {
                        return dispatch({type: "DOWNLOAD_PAIRS", payload: {data: res}});
                    }
                )
                .catch((err) => {console.log(err)});
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(TournamentRoute)