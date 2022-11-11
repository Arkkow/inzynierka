// General React imports
import * as React from 'react';
import { Routes, Route } from "react-router-dom";

// Project specific files
import CalendarRoute from "./routes/calendar_route";
import ProfileRoute from "./routes/profile_route";
import Header from "./components/constant/header";
import Footer from "./components/constant/footer";

// CSS files
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/App.css';
import NewTournamentRoute from "./routes/new_tournament";

function App() {
  return (
      <div>
          <Header />
          <Routes>
              <Route path="/calendar" element={<CalendarRoute />} exact={true} />
              <Route path="/profile" element={<ProfileRoute />} exact={true} />
              <Route path="/new_tournament" element={<NewTournamentRoute />} exact={true} />
          </Routes>
          <Footer />
      </div>
  );
}

export default App;
