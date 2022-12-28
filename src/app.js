// General React imports
import * as React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Project specific files
import Header from "./components/common/header";
import Login_popup from "./components/common/popups/login_popup";
import Register_popup from "./components/common/popups/register_popup";
import T_registration_popup from "./components/common/popups/T_registration_popup";

// Routes
import CalendarRoute from "./routes/calendar_route";
import ProfileRoute from "./routes/profile_route";
import NewTournamentRoute from "./routes/new_tournament";
import EditTournamentRoute from "./routes/edit_tournament";
import NewTemplateRoute from "./routes/new_template.js";
import TournamentRoute from "./routes/tournament_route.js";
import AdminUsers from "./routes/adminUsers.js";
import RankingRoute from "./routes/ranking_route.js";
import Drabinka from "./routes/drabinka_route.js";
import TokenRoute from "./routes/token_route";

// CSS files
import "./styles/index.css";
import "./styles/App.css";

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
      <div>
          <Header
              isLoginOpen={isLoginOpen}
              setIsLoginOpen={setIsLoginOpen}
              isRegisterOpen={isRegisterOpen}
              setIsRegisterOpen={setIsRegisterOpen}
          />
          <Routes>
              <Route path="/" element={<Navigate to="calendar" />} />
              <Route
                  path="tournamentRegistration"
                  element={<T_registration_popup />}
                  exact={true}
              />
              <Route path="/#" element={<CalendarRoute />} exact={true} />
              <Route path="/calendar" element={<CalendarRoute />} exact={true} />
              <Route path="/profile" element={<ProfileRoute />} exact={true} />
              <Route path="/verifymail" element={<TokenRoute/>} exact={true}/>
              <Route
                  path="/new_tournament"
                  element={<NewTournamentRoute />}
                  exact={true}
              />
              <Route
                  path="/edit_tournament"
                  element={<EditTournamentRoute />}
                  exact={true}
              />
              <Route
                  path="/new_template"
                  element={<NewTemplateRoute />}
                  exact={true}
              />
              <Route
                  path="/drabinka"
                  element={<Drabinka />}
                  exact={true}
              />
              <Route path="/tournament" element={<TournamentRoute />} exact={true} />
              <Route path="/AdminUsers" element={<AdminUsers />} exact={true} />
              <Route path="/Ranking" element={<RankingRoute />} exact={true} />
          </Routes>
          <Login_popup
              isLoginOpen={isLoginOpen}
              setIsLoginOpen={setIsLoginOpen}
              setIsRegisterOpen={setIsRegisterOpen}
          />
          <Register_popup
              isRegisterOpen={isRegisterOpen}
              setIsLoginOpen={setIsLoginOpen}
              setIsRegisterOpen={setIsRegisterOpen}
          />
          <Footer />
      </div>
  );
}

export default App;
