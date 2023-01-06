import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PFP_LOGO from "../../../assets/PFP_LOGO.png";
import "../../../styles/App.css";
import {getUser, getUserById} from "../../../api/user_interaction/user_api";
import {putRegistration} from "../../../api/tournament/tournament_registration_api";

function T_registration_popup(props) {

    const [userId, setId] = useState([]);
    const [ifExist, checkIfExist] = useState([]);

    if(userId.fetched === false){
        getUser().then((dane)=>{setId(dane)})
    }

    const [show, setShow] = useState(false);
    const id_tournament = window.location.href.split('?')[1].split('=')[1];

    const id = useRef(null);

    const checkIfIdIsValid =  () => {
        getUserById(id.current.value).then((dane)=>{checkIfExist({dane});})
        console.log(ifExist)
        if (String(props.id) === id.current.value) {
            alert("Nie mozesz wyslac zaproszenia do siebie!");
        } else if (ifExist.length == 0 || ifExist.dane === null) {
            alert("Uzytkownik o podanym id nie istnieje!");
        } else {
            const sendInvitation = () => {putRegistration({
                tournament: id_tournament,
                partner: id.current.value,
            }).then(() => window.location.reload(false))
                setShow(false)};
            sendInvitation();
        }


    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {props.role === "default" || localStorage.getItem("token") === null ?
                <Button
                    style={{
                        backgroundColor: "gray",
                        borderColor: "gray",
                        height: "15vh",
                        width: "40vh" ,
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
                </Button>:
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

            }
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
