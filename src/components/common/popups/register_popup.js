import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PFP_LOGO from "../../../assets/PFP_LOGO.png";
import "../../../styles/App.css";

const Register_popup = ({
  isRegisterOpen,
  setIsLoginOpen,
  setIsRegisterOpen,
}) => {
  const [error, setError] = useState(null);
  const [isSended, setIsSended] = useState(false);
  const [response, setResponse] = useState([]);
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
          setIsRegisterOpen(false);
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
    <Modal show={isRegisterOpen} onHide={() => setIsRegisterOpen(false)}>
      <Modal.Header closeButton>
        <img src={PFP_LOGO} style={{ marginLeft: "auto", height:"8vh" }} alt="LOGO" />
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
            <Form.Control type="text" placeholder="Imię" ref={name} autoFocus />
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
            onClick={(e) => {
              e.preventDefault();
              setIsLoginOpen(true);
              setIsRegisterOpen(false);
            }}
          >
            Zaloguj się
          </paragraph>
        </paragraph>
      </Modal.Footer>
    </Modal>
  );
};

export default Register_popup;
