import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/App.css"
import {Col, Row} from "react-bootstrap";
import {endTournament} from "../../../api/tournament/tournament_CRUD_api";


function EndUnrankedTournament_popup() {
    const [show, setShow] = useState(false);
    const id_tournament = window.location.href.split('?')[1].split('=')[1];
    const handleClose = () => setShow(false);
    const handleEndTournament = () => {
        endTournament({id: id_tournament}).then(setShow(false))
            .then((result) => result.error ? alert("Coś poszło nie tak. Skontaktuj się z administracją.") :  window.location.href="calendar")
        }
    const handleShow = () => setShow(true);

    return (
        <>
            <Button style={{
                fontFamily: 'Montserrat',
                fontWeight: "600",
                fontSize: "18px",
                lineHeight: "25px",
                color: "white",
                borderRadius: "15px",
                paddingBottom: "5%",
                paddingTop: "5%",
                whiteSpace: "nowrap",
                textAlign: "center",
                backgroundColor:"#D99D00",
                borderWidth:"0"
            }} variant="success" onClick={handleShow}>
                ZAKOŃCZ TURNIEJ
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <my_h4>Kończenie turnieju</my_h4>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#EBEBEB", display:"flex", alignItems:"center", flexDirection:"column"
                }}>
                    <Row>
                        <my_h4>Czy na pewno chcesz zakończyć turniej?</my_h4>

                    </Row>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <Button style={{
                            fontFamily: 'Montserrat',
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "25px",
                            color: "white",
                            borderRadius: "13px",
                            display: "flex",
                            justifyContent: "center",
                            margin: "auto",
                            alignItems: "center",
                            marginTop:"20px", marginRight:"20px"
                        }} variant="success" onClick={handleEndTournament}>
                            Tak
                        </Button>
                        <Button style={{
                            fontFamily: 'Montserrat',
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "25px",
                            color: "white",
                            borderRadius: "13px",
                            display: "flex",
                            justifyContent: "center",
                            margin: "auto",
                            alignItems: "center",
                            marginTop:"20px"
                        }} variant="success" onClick={handleClose}>
                            Nie
                        </Button>
                    </div>



                </Modal.Body>
                <Modal.Footer style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default EndUnrankedTournament_popup;




