import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../styles/App.css"
import PFP_LOGO from "../../assets/PFP_LOGO.png";


function PaymentMethod_popup() {
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
                PŁATNOŚĆ
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <img src={PFP_LOGO} style={{ marginLeft: "auto", height:"8vh"}} alt="LOGO" />
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#EBEBEB",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <paragraph>
                        Wybierz metodę płatności</paragraph>
                    <Form style={{width: "100%"}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div className="form-group col-md-4" style={{width:"100%", marginTop:"3%"}}>
                                <select id="inputState" className="form-select">
                                    <option selected>Płatność online kryptowalutą</option>
                                    <option>Samodzielnie u organizatora</option>
                                </select>
                            </div>
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
                        POTWIERDŹ
                    </Button>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default PaymentMethod_popup;




