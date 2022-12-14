// General React imports
import * as React from "react";
import {connect} from "react-redux";


// Project specific files
import { getTournamentById} from "../components/api/api";
import {getUser} from "../components/api/user_interaction/user_api";
import {getladders} from "../components/api/tournament/ladders_api";
import {getRegistrations} from "../components/api/tournament/tournament_registration_api";
import {Tournament_controller} from "../components/Tournament/tournament_controller";
import TournamentHeader from "../components/Tournament/tournament_header";

// CSS files
import "../styles/index.css";
import "../styles/App.css";




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

        handleDownloadUser: () => {
            //    API z kalendarza
            getUser()
              .then( res => {
                    console.log(res)
                    return dispatch({type: "DOWNLOAD_USER", payload: {data: res}});
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
        handleDownloadPlayers: (id) => {
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