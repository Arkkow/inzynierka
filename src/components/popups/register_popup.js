import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PFP_LOGO from "../../assets/PFP_LOGO.png";
import "../../styles/App.css";
import LoginPopupForRegister from "./login_popup_for_register";

const Register_popup = () => {
  const [error, setError] = useState(null);
  const [isSended, setIsSended] = useState(false);
  const [response, setResponse] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const username = useRef(null);
  const surname = useRef(null);
  const name = useRef(null);
  const mail = useRef(null);
  const phone = useRef(null);
  const password = useRef(null);
  const handleClick = () => {
    fetch("https://dragonmaster.pl/inz/user/create", {
      method: "PUT",
      body: JSON.stringify({
        name: name.current.value,
        username: username.current.value,
        surname: surname.current.value,
        mail: mail.current.value,
        phone: phone.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsSended(true);
          setResponse(result);
          console.log(result);
          alert("Mozna się zalogować");
          setShow(false);
        },
        (error) => {
          setIsSended(true);
          setError(error);
        }
      );
    if (error) {
      alert("Coś poszło nie tak: " + error.message);
    }
  };

  return (
    <>
      {/*/!*Ten button tylko do testów, bo normalnie rejestracja nie ma buttona, przenosi cie tam tekst z logowania*!/*/}
      <paragraph
        style={{
          textDecoration: "underline",
          marginLeft: "3px",
          cursor: "pointer",
        }}
        onClick={handleShow}
      >
        Zarejestruj się
      </paragraph>
      {/* <Button
        style={{
          fontFamily: "Montserrat",
          fontWeight: "600",
          fontSize: "18px",
          lineHeight: "25px",
          color: "white",
          borderRadius: "40px",
          padding: "1%",
          paddingBottom: "0.5%",
          paddingTop: "0.5%",
        }}
        variant="success"
        onClick={handleShow}
      >
        REJESTRACJA
      </Button> */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <img src={PFP_LOGO} style={{ marginLeft: "auto" }} alt="LOGO" />
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
            Rejestracja
          </h2>
          <Form style={{ width: "100%" }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Imię"
                ref={name}
                autoFocus
              />
              <Form.Control
                style={{ marginTop: "1%" }}
                type="text"
                placeholder="Nazwisko"
                ref={surname}
                autoFocus
              />
              <Form.Control
                style={{ marginTop: "1%" }}
                type="text"
                placeholder="Login"
                ref={username}
                autoFocus
              />
              <Form.Control
                style={{ marginTop: "1%" }}
                type="email"
                placeholder="Email"
                ref={mail}
                autoFocus
              />
              <Form.Control
                style={{ marginTop: "1%" }}
                type="tel"
                placeholder="Telefon"
                ref={phone}
                autoFocus
              />
              <Form.Control
                style={{ marginTop: "1%" }}
                type="password"
                placeholder="Hasło"
                ref={password}
                autoFocus
              />
              <Form.Control
                style={{ marginTop: "1%" }}
                type="password"
                placeholder="Potwierdź hasło"
                autoFocus
              />
            </Form.Group>
          </Form>
          <Button
            type="submit"
            style={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "25px",
              color: "white",
              borderRadius: "13px",
            }}
            variant="success"
            onClick={handleClick}
          >
            ZAREJESTRUJ
          </Button>
          <h6
            style={{
              fontFamily: "Montserrat",
              fontWeight: "400",
              fontSize: "10px",
              lineHeight: "12px",
              color: "828282",
              marginTop: "3%",
              marginBottom: "0%",
            }}
          >
            Rejestrując się wyrażasz zgodę na przetwarzanie danych osobowych
          </h6>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <paragraph>
            Masz już konto?
            <paragraph
              style={{
                textDecoration: "underline",
                marginLeft: "3px",
                cursor: "pointer",
              }}
            >
              <LoginPopupForRegister />
            </paragraph>
          </paragraph>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register_popup;
