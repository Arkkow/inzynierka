// General React imports
import * as React from "react";
import { Routes, Route } from "react-router-dom";

// Project specific files
import CalendarRoute from "./routes/calendar_route";
import ProfileRoute from "./routes/profile_route";
import Header from "./components/constant/header";
import Footer from "./components/constant/footer";
import NewTournamentRoute from "./routes/new_tournament";
import EditTournamentRoute from "./routes/edit_tournament";
import UserName from "./components/profile/userName.js";
import NewTemplateRoute from "./routes/new_template.js";

// CSS files
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/App.css';
import TournamentRoute from "./routes/tournament_route.js";
import TournamentPlayRoute from "./routes/tournament_play_route.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import "./styles/App.css";


function App() {
  return (
      <div>
          <Header />
          <Routes>
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
