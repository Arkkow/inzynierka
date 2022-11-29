// General React imports
import * as React from "react";

// Project specific files

// CSS files
import "../styles/index.css";
import "../styles/App.css";
import TournamentContent from "../components/Tournament/tournament_controller";
import TournamentHeader from "../components/Tournament/navbar/tournament_header";
import {connect} from "react-redux";


function TournamentRoute(props) {
    return (
        <div style={{minHeight: "94vh"}}>
            <TournamentHeader {...props}/>
            <TournamentContent {...props}/>
        </div>
    );
}


// Przypisanie do Calendar_controller.props stanów
const mapStateToProps = (state) => {
    return {
        calendar_list: state.calendar_content.data,
        user: state.user_content.data,
        view: state.view_content.data
    }
}

//Wywołanie zmiany stanu (obsługa w store)
// Przekazanie data z API do stanu Calendar_controller
const mapDispatchToProps = (dispatch) => {
    const id = window.location.href.split('?')[1].split('=')[1]
    return {

        handleDownloadCalendarCard: (id) => {
            //    API z kalendarza
            fetch('https://dragonmaster.pl/inz/' + "tournament" + "?id=" + id, {
                headers: {
                    Authorization: ("Bearer " + "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7"),
                },
                method: "GET",
            })
                .then((res) => res.json())
                .then( res => {
                        return dispatch({type: "DOWNLOAD_CALENDAR", payload: {data: res}});
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