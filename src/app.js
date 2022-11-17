// General React imports
import * as React from 'react';
import { Routes, Route } from "react-router-dom";

// Project specific files
import CalendarRoute from "./routes/calendar_route";
import ProfileRoute from "./routes/profile_route";
import Header from "./components/constant/header";
import Footer from "./components/constant/footer";
import NewTournamentRoute from "./routes/new_tournament";
import EditTournamentRoute from "./routes/edit_tournament";
import NewTemplateRoute from "./routes/new_template";
import UserName from "./components/profile/userName";

// CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/App.css';



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
          </Routes>
          <Footer />
      </div>
  );
}

export default App;
