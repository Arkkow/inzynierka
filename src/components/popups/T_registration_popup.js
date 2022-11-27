import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PFP_LOGO from '../../assets/PFP_LOGO.png';
import "../../styles/App.css"


function T_registration_popup() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
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
                paddingRight: "1.5%",
                paddingLeft: "1.5%",
                paddingBottom: "0.5%",
                paddingTop: "0.5%",
                marginRight: "1%"
            }} variant="success" onClick={handleShow}>
                ZAPISZ SIĘ NA TURNIEJ
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <img src={PFP_LOGO} style={{marginLeft: "auto"}} alt="LOGO"/>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#EBEBEB",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <h2 style={{
                        color: "var(--black)",
                        fontFamily: 'Montserrat',
                        fontWeight: "600",
                        fontSize: "28px",
                        lineHeight: "42px",
                        textAlign: "center"
                    }}>
                        Zapisy na turniej</h2>
                    <Form style={{width: "100%"}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="ID partnera (znajdzie je w swoim profilu)"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                    <Button style={{
                        fontFamily: 'Montserrat',
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "25px",
                        color: "white",
                        borderRadius: "13px"
                    }} variant="success" onClick={handleClose}>
                        WYŚLIJ ZGŁOSZENIE
                    </Button>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default T_registration_popup;
