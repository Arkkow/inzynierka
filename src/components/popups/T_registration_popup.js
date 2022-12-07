import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PFP_LOGO from "../../assets/PFP_LOGO.png";
import { getUser, getUserById, putRegistration } from "../api/api";
import "../../styles/App.css";

function T_registration_popup () {
  const [show, setShow] = useState(false);
  const userData = getUser();
  let testId = "0";

  const id = useRef(null);

  const checkIfIdIsValid = async () => {
    const sendInvitation = putRegistration({
      tournament: "41042",
      partner: id.current.value,
    });

    const userId = await userData;
    const userChecker = getUserById(id.current.value);
    const otherUserId = await userChecker;
    getUserById(id.current.value);

    // <Register  {...props}/>

    if (userId.id == id.current.value) {
      alert("Nie mozesz wyslac zaproszenia do siebie!");
    } else if (otherUserId == null) {
      alert("Uzytkownik o podanym id nie istnieje!");
    } else {
      let partnerId = id.current.value;
      console.log(partnerId);
      sendInvitation();
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        ZAPISZ SIĘ NA TURNIEJ
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
            Zapisy na turniej
          </h2>
          <Form style={{ width: "100%" }}>
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
