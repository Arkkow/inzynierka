// General React imports
import * as React from "react";
import {useState} from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

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

// import { mapStateToProps, mapDispatchToProps } from "./components/calendar/calendar_controller"

// CSS files
import './styles/index.css';
import './styles/App.css';
import Button from "react-bootstrap/Button";
import * as props from "./components/redux/states/states";
import { Calendar_controller } from "./components/calendar/calendar_controller";


function App() {
  return (
      <div>
          <Header/>
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

export default App;

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App)