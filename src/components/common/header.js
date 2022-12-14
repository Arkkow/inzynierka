// General react imports
import {useState} from "react";

// Project specific files
import Logout from "./buttons/log_out";
import UserName from "../profile/userName";
import {getUser} from "../../api/user_interaction/user_api";

// CSS files
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import PFP_LOGO from "../../assets/PFP_LOGO.png";
import Button from "react-bootstrap/Button";


function Header({ setIsLoginOpen }) {
    const [userId, setId] = useState({"fetched":false,data:[]});
    if(userId.fetched === false){
        getUser().then((dane)=>{setId({"fetched":true,data:dane});})
    }

  if (localStorage.getItem("token") == null) {
    return (
      // ponizej uzytkownicy do dodania dla admnina
      // <Nav.Link href="#" style={{paddingLeft:"50px", paddingRight:"30px"}}><my_h4>Użytkownicy</my_h4></Nav.Link>
      <Navbar expand="lg" >
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
              href="ranking"
              style={{ paddingLeft: "50px", paddingRight: "30px" }}
            >
              <my_h4>Ranking</my_h4>
            </Nav.Link>
          </Nav>
          <Button
            style={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "25px",
              color: "white",
              borderRadius: "15px",
              paddingRight: "1.5%",
              paddingLeft: "1.5%",
              paddingBottom: "0.5%",
              paddingTop: "0.5%",
              marginRight: "1%",
            }}
            variant="success"
            onClick={() => setIsLoginOpen(true)}
          >
            LOGOWANIE
          </Button>
        </Navbar.Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar expand="lg">
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
              href="ranking"
              style={{ paddingLeft: "50px", paddingRight: "30px" }}
            >
              <my_h4>Ranking</my_h4>
            </Nav.Link>
            <Nav.Link
              href="profile"
              style={{ paddingLeft: "50px", paddingRight: "30px" }}
            >
              <UserName />
            </Nav.Link>
              { userId.data.role === "3" ?<Nav.Link
                  href="AdminUsers"
                  style={{ paddingLeft: "50px", paddingRight: "30px" }}
              >
                  <my_h4>Użytkownicy</my_h4>
              </Nav.Link> : null}

          </Nav>

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
