// General React imports
import * as React from "react";
import { Routes, Route } from "react-router-dom";

// Project specific files
import Header from "./components/common/header";
import Footer from "./components/common/footer";
// Routes
import CalendarRoute from "./routes/calendar_route";
import ProfileRoute from "./routes/profile_route";
import NewTournamentRoute from "./routes/new_tournament";
import EditTournamentRoute from "./routes/edit_tournament";
import NewTemplateRoute from "./routes/new_template.js";
import TournamentRoute from "./routes/tournament_route.js";
import TournamentPlayRoute from "./routes/tournament_play_route.js";

// CSS files
import './styles/index.css';
import './styles/App.css';
import {connect} from "react-redux";


function App(props) {
  return (
      <div>
          <Header />
          <div>
              {console.log(props.view.screen)}
          </div>
          <Routes>
            <Route path="/#" element={<CalendarRoute />} exact={true} />
            <Route path="/calendar" element={<CalendarRoute />} exact={true} />
            <Route path="/profile" element={<ProfileRoute />} exact={true} />
            <Route path="/new_tournament" element={<NewTournamentRoute />} exact={true} />
            <Route path="/edit_tournament" element={<EditTournamentRoute />} exact={true} />
            <Route path="/new_template" element={<NewTemplateRoute />} exact={true} />
            <Route path="/tournament" element={<TournamentRoute />} exact={true} />
            <Route path="/tournamentPlay" element={<TournamentPlayRoute />} exact={true} />
          </Routes>
          <Footer />
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
    return {
        handleDownloadCalendar: () => {
            //    API z kalendarza
            fetch('https://dragonmaster.pl/inz/' + "tournaments", {
                headers: {
                    Authorization: ("Bearer " + "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7")
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
        handleDownloadUser: () => {
            //    API z kalendarza
            fetch('https://dragonmaster.pl/inz/' + "user", {
                headers: {
                    Authorization: ("Bearer " + "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7")
                },
                method: "GET",
            })
                .then((res) => res.json())
                .then( res => {
                        console.log(res)
                        return dispatch({type: "DOWNLOAD_USER", payload: {data: res}});
                    }
                )
                .catch((err) => {console.log(err)});
        },
        handleGOTO: (props) => {
            return dispatch({type: "ROUTE_STATE", payload: {data: props}});
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)