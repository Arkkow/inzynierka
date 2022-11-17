import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PFP_LOGO from "../../assets/PFP_LOGO.png";
import Register_popup from "./register_popup";
import "../../styles/App.css";

function Login_popup() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [isSended, setIsSended] = useState(false);
  const [response, setResponse] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const username = useRef(null);
  const password = useRef(null);

  const handleClick = () => {
    fetch("https://dragonmaster.pl/inz/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsSended(true);
          setResponse(result);
          localStorage.setItem("token", JSON.stringify(result));
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
        onClick={handleShow}
      >
        LOGOWANIE
      </Button>
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
            Logowanie
          </h2>
          <Form style={{ width: "100%" }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Tutaj wpisz e-mail lub nick"
                ref={username}
                autoFocus
              />
              <Form.Control
                type="password"
                placeholder="Tutaj wpisz hasło"
                ref={password}
                autoFocus
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
            onClick={handleClick}
          >
            ZALOGUJ
          </Button>
        </Modal.Body>
        <Modal.Footer
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <paragraph>
            Nie masz konta?
            <paragraph
              style={{ textDecoration: "underline", marginLeft: "3px" }}
            >
              <Register_popup />
            </paragraph>
          </paragraph>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login_popup;
