import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../styles/App.css"


function NewTournament_popup() {
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
                STWÓRZ NOWY TURNIEJ
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#EBEBEB",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <my_h4>
                        W jaki sposób chcesz stworzyć nowy turniej?</my_h4>
                    <Form style={{width: "100%"}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div className="form-group col-md-4" style={{width:"100%", marginTop:"5%"}}>
                                <select id="inputState" className="form-select">
                                    <option selected>Nowy turniej</option>
                                    <option>W oparciu o szablon</option>
                                    <option>W oparciu o turniej z przeszłości</option>
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
                        DALEJ
                    </Button>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default NewTournament_popup;




