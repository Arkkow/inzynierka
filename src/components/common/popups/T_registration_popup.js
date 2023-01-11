import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PFP_LOGO from "../../../assets/PFP_LOGO.png";
import "../../../styles/App.css";
import { getUser, getUserById } from "../../../api/user_interaction/user_api";
import { putRegistration } from "../../../api/tournament/tournament_registration_api";
import {getTournamentById} from "../../../api/api";

function T_registration_popup(props) {
    const id_tournament = window.location.href.split("?")[1].split("=")[1];
    // document.getElementById("forms").addEventListener('keypress', );
  const [userId, setId] = useState([]);
  const [tournamentInfo, setTournamentInfo] = useState([]);

  useEffect(() => {
    getUser().then((response) => setId(response.id));
    getTournamentById(id_tournament).then((response) => setTournamentInfo(response))
  }, []);

  const [show, setShow] = useState(false);

  const id = useRef(null);

  const checkIfIdIsValid = async () => {
    console.log(id.current.value);
    await getUserById(id.current.value).then((dane) => {
      if (!dane) {
        return alert("Uzytkownik o podanym id nie istnieje!");
      }

      if (String(userId) === id.current.value) {
        alert("Nie mozesz wyslac zaproszenia do siebie!");
      } else {
        const sendInvitation = () => {
          putRegistration({
            tournament: id_tournament,
            partner: id.current.value,
          }).then(() => window.location.reload());
          setShow(false);
        };
        sendInvitation();
      }
    });
  };

  const renderSwitch = (id) => {
      switch(id) {
          case 1:
              return  <Button
                  style={{
                      height: "15vh",
                      width: "40vh",
                      borderRadius: "20px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "34px",
                      lineHeight: "41.45px",
                      color: "white",
                      paddingRight: "1.5%",
                      paddingLeft: "1.5%",
                      paddingBottom: "0.5%",
                      paddingTop: "0.5%",
                      marginRight: "1%",
                  }}
                  variant="success"
                  onClick={handleShow}
              >
                  ZAPISZ SIĘ!
              </Button>;
          case 2:
              return <Button
                  style={{
                      backgroundColor: "gray",
                      borderColor: "gray",
                      height: "15vh",
                      width: "40vh",
                      borderRadius: "20px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "24px",
                      lineHeight: "41.45px",
                      color: "white",
                      paddingRight: "1.5%",
                      paddingLeft: "1.5%",
                      paddingBottom: "0.5%",
                      paddingTop: "0.5%",
                      marginRight: "1%",
                  }}
                  variant="success"
              >
                  Zapisy zakończone.
              </Button>;
          case 3:
              return <Button
                  style={{
                      backgroundColor: "gray",
                      borderColor: "gray",
                      height: "15vh",
                      width: "40vh",
                      borderRadius: "20px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "24px",
                      lineHeight: "41.45px",
                      color: "white",
                      paddingRight: "1.5%",
                      paddingLeft: "1.5%",
                      paddingBottom: "0.5%",
                      paddingTop: "0.5%",
                      marginRight: "1%",
                  }}
                  variant="success"
              >
                  Turniej zakończył się. Zapisywanie się na turniej nie jest możliwe.
              </Button>;
          default:
              return <Button
                  style={{
                      height: "15vh",
                      width: "40vh",
                      borderRadius: "20px",
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      fontSize: "34px",
                      lineHeight: "41.45px",
                      color: "white",
                      paddingRight: "1.5%",
                      paddingLeft: "1.5%",
                      paddingBottom: "0.5%",
                      paddingTop: "0.5%",
                      marginRight: "1%",
                  }}
                  variant="success"
                  onClick={handleShow}
              >
                  ZAPISZ SIĘ!
              </Button>;}
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        // 👇 Get input value
      checkIfIdIsValid();
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        {props.role === "default" || localStorage.getItem("token") === null ? (
        <Button
          style={{
            backgroundColor: "gray",
            borderColor: "gray",
            height: "15vh",
            width: "40vh",
            borderRadius: "20px",
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "24px",
            lineHeight: "41.45px",
            color: "white",
            paddingRight: "1.5%",
            paddingLeft: "1.5%",
            paddingBottom: "0.5%",
            paddingTop: "0.5%",
            marginRight: "1%",
          }}
          variant="success"
        >
          {"ABY ZAPISAĆ SIĘ NA TURNIEJ MUSISZ BYĆ ZALOGOWANY"}
        </Button>
      ) : renderSwitch(tournamentInfo.state)}
      <Modal show={show} onHide={handleClose} onKeyDown={handleKeyDown}>
        <Modal.Header closeButton>
          <img
            src={PFP_LOGO}
            style={{ marginLeft: "auto", height: "8vh" }}
            alt="LOGO"
          />
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#EBEBEB",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              color: "var(--black)",
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "28px",
              lineHeight: "42px",
              textAlign: "center",
            }}
          >
            Zapisy na turniej
          </h2>
          <Form style={{ width: "100%" }} id={"forms"}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="ID partnera (znajdzie je w swoim profilu)"
                autoFocus
                ref={id}
              />

            </Form.Group>
          </Form>
          <Button
            style={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "25px",
              color: "white",
              borderRadius: "13px",
            }}
            variant="success"
            onClick={checkIfIdIsValid}
          >
            WYŚLIJ ZGŁOSZENIE
          </Button>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Modal.Footer>
      </Modal>
    </>
  );
}

export default T_registration_popup;
