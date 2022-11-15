import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PFP_LOGO from '../../assets/PFP_LOGO.png';

function Popup() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button style={{fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "25px", color: "white", borderRadius: "40px", padding: "1%", paddingBottom: "0.5%", paddingTop: "0.5%"}} variant="success" onClick={handleShow}>
                LOGOWANIE
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <img src={PFP_LOGO} />
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "#EBEBEB"}}>
                    <h2 style={{color: "var(--black)", fontFamily: 'Montserrat',fontWeight: "600", fontSize: "28px", lineHeight: "42px", textAlign: "center"}}>
                        Logowanie</h2>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                type="text"
                                placeholder="Tutaj wpisz e-mail lub nick"
                                autoFocus
                            />
                            <Form.Control
                                type="password"
                                placeholder="Tutaj wpisz hasło"
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "25px", color: "white", marginLeft: "auto", marginRight: "auto"}} variant="success" onClick={handleClose}>
                        ZALOGUJ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Popup;