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


function App() {
  return (
      <div>
          <Header />
          <div>
              TESTOWY DIV DO USUNIĘCIA ASAP
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

export default App;
