import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PFP_LOGO from "../../assets/PFP_LOGO.png";
import {getUser, getUserById, getUsersAdmin, putRegistration} from "../api/api";
import "../../styles/App.css";

function T_registration_popup() {

    const [userId, setId] = useState({"fetched":false,data:[]});
    const [ifExist, checkIfExist] = useState({"fetched":false,data:[]});
    if(userId.fetched === false){
        getUser().then((dane)=>{setId({"fetched":true,data:dane});})
    }

  const [show, setShow] = useState(false);
  const id_tournament = window.location.href.split('?')[1].split('=')[1];
  console.log(id_tournament + "dupa")

    console.log(getUserById("12341234124"))

  const id = useRef(null);

    const checkIfIdIsValid =  () => {
        getUserById(id.current.value).then((dane)=>{checkIfExist({"fetched":true,data:dane});})
        console.log(ifExist.data)
    if (userId.data.id == id.current.value) {
      alert("Nie mozesz wyslac zaproszenia do siebie!");
    } else if (ifExist == false) {
      alert("Uzytkownik o podanym id nie istnieje!");
    } else {
        const sendInvitation = () => {putRegistration({
            tournament: id_tournament,
            partner: id.current.value,
        })
        setShow(false)};
      sendInvitation();
    }


  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        style={{
            height: "15vh",
            width: "40vh" ,
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
      </Button>
      <Modal show={show} onHide={handleClose}>
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
