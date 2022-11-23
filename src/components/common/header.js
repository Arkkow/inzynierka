import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PFP_LOGO from "../../assets/PFP_LOGO.png";
import Login_popup from "../popups/login_popup";
import { Dropdown, NavDropdown } from "react-bootstrap";
import Logout from "./Buttons/log_out";
import UserName from "../profile/userName";

function Header(props) {
  if (localStorage.getItem("token") == null) {
    return (
        // ponizej uzytkownicy do dodania dla admnina
        // <Nav.Link href="#" style={{paddingLeft:"50px", paddingRight:"30px"}}><my_h4>Użytkownicy</my_h4></Nav.Link>
      <Navbar expand="lg" style={{ boxShadow: "0px 2px 5px #999" }}>
        <a className="navbar-brand" href="calendar">
          <img
            src={PFP_LOGO}
            height="60px"
            alt="logo"
            style={{ marginLeft: "10%" }}
          />
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav
            className="ml-auto"
            style={{ paddingLeft: "30%", paddingRight: "2%" }}
          >
            <Nav.Link
              href="calendar"
              style={{ paddingLeft: "50px", paddingRight: "30px" }}
            >
              <my_h4>Kalendarz turniejów</my_h4>
            </Nav.Link>
            <Nav.Link
              href="#"
              style={{ paddingLeft: "50px", paddingRight: "30px" }}
            >
              <my_h4>Ranking</my_h4>
            </Nav.Link>
            {/*<Nav.Link href="profile" style={{paddingLeft:"50px", paddingRight:"30px"}}><my_h4>Profil</my_h4></Nav.Link>*/}
          </Nav>
          <Login_popup />
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar expand="lg" style={{ boxShadow: "0px 2px 5px #999" }}>
        <a className="navbar-brand" href="calendar">
          <img
            src={PFP_LOGO}
            height="60px"
            alt="logo"
            style={{ marginLeft: "10%" }}
          />
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav
            className="ml-auto"
            style={{ paddingLeft: "30%", paddingRight: "2%" }}
          >
            <Nav.Link
              href="calendar"
              style={{ paddingLeft: "50px", paddingRight: "30px" }}
            >
              <my_h4>Kalendarz turniejów</my_h4>
            </Nav.Link>
            <Nav.Link
              href="#"
              style={{ paddingLeft: "50px", paddingRight: "30px" }}
            >
              <my_h4>Ranking</my_h4>
            </Nav.Link>
            {/*<Nav.Link href="profile" style={{paddingLeft:"50px", paddingRight:"30px"}}><my_h4>Profil</my_h4></Nav.Link>*/}
          </Nav>
          <Nav.Link
            href="profile"
            style={{ paddingLeft: "50px", paddingRight: "30px" }}
          >
            <UserName />
          </Nav.Link>

          <Logout />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
// Gdybysmy jednak chcieli dropdowna
// <Dropdown>
//     <Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderRadius: "25px"}}>
//         <my_h4>JM</my_h4>
//     </Dropdown.Toggle>
//     <Dropdown.Menu>
//         <Dropdown.Item href="profile">Mój profil</Dropdown.Item>
//         <Dropdown.Item href="#/action-2">Wyloguj</Dropdown.Item>
//     </Dropdown.Menu>
// </Dropdown>

export default Header;