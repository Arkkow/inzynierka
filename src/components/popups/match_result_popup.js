import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../styles/App.css"
import {Col, ModalFooter, Row} from "react-bootstrap";


function MatchResult_popup() {
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
            }} variant="primary" onClick={handleShow}>
                PODAJ WYNIK MECZU
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <my_h4>Wynik meczu</my_h4>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#EBEBEB",
                    // display: "flex",
                    // flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Row>
                        {/*KOLUMNA 1*/}
                        <Col className="col-5" style={{marginLeft:"20px", marginTop:"25px"}}>
                            <Row style={{backgroundColor:"white", paddingLeft:"5px", borderRadius:"10px"}}>
                                <Row>ADAM KOWALSKI</Row>
                                <Row>BARTOSZ NOWAK</Row>
                            </Row>
                            <Row style={{backgroundColor:"white", marginTop:"20px", paddingLeft:"5px", borderRadius:"10px"}}>
                                <Row>CEZARY PECKERT</Row>
                                <Row>DARIUSZ DAREMSKI</Row>
                            </Row>
                        </Col>
                        {/*KOLUMNA 2*/}
                        <Col>
                            <paragraph style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",
                                paddingTop:"5px"}}>
                                WYG.
                            </paragraph>
                            <div>
                            <div className="form-check"
                                 style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",
                                     backgroundColor:"white",
                                     borderRadius:"10px",
                                 marginTop:"4px", height:"48px"}}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                       id="flexRadioDefault1"></input>
                            </div>
                            <div className="form-check"
                                 style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center", backgroundColor:"white", height:"48px", borderRadius:"10px", marginTop:"20px"}}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                       id="flexRadioDefault2" checked></input>
                            </div>
                            </div>
                        </Col>
                        {/*KOLUMNA 3*/}
                        <Col>
                            <paragraph style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",
                                paddingTop:"5px"}}>
                                SET 1
                            </paragraph>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <div className="form-group col-md-4" style={{width:"40px", marginTop:"3%"}}>
                                        <select id="inputState" className="form-select" style={{}}>
                                            <option selected>0</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                        </select>
                                    </div>
                                </Form.Group>
                            </Form>
                        </Col>
                        {/*KOLUMNA 4*/}
                        <Col>
                            <paragraph style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",
                                paddingTop:"5px"}}>
                                SET 2
                            </paragraph>
                            y
                            y
                        </Col>
                        {/*KOLUMNA 5*/}
                        <Col>
                            <paragraph style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",
                                paddingTop:"5px"}}>
                                SET 3
                            </paragraph>
                            z
                            z
                        </Col>
                    </Row>









                    <Button style={{
                        fontFamily: 'Montserrat',
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "25px",
                        color: "white",
                        borderRadius: "13px",
                        marginTop:"20px"
                    }} variant="success" onClick={handleClose}>
                        ZATWIERDŹ
                    </Button>

                </Modal.Body>
            <ModalFooter>

            </ModalFooter>
            </Modal>
        </>
    );
}


export default MatchResult_popup;




