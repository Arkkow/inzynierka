import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../styles/App.css"
import {ModalFooter, Row} from "react-bootstrap";


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
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>

                    <Row>
                        SET 1
                        SET 2
                    </Row>
                    <Row>
                    <Form style={{width: "90px"}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div className="form-group col-md-4" style={{width:"100%", marginTop:"3%"}}>
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

                    <Form style={{width: "90px"}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div className="form-group col-md-4" style={{width:"100%", marginTop:"3%"}}>
                                <select id="inputState" className="form-select">
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

                        <Form style={{width: "90px"}}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <div className="form-group col-md-4" style={{width:"100%", marginTop:"3%"}}>
                                    <select id="inputState" className="form-select">
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
                    </Row>

                    <Row>
                        <Form style={{width: "90px"}}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <div className="form-group col-md-4" style={{width:"100%", marginTop:"3%"}}>
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

                        <Form style={{width: "90px"}}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <div className="form-group col-md-4" style={{width:"100%", marginTop:"3%"}}>
                                    <select id="inputState" className="form-select">
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

                        <Form style={{width: "90px"}}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <div className="form-group col-md-4" style={{width:"100%", marginTop:"3%"}}>
                                    <select id="inputState" className="form-select">
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
                    </Row>

                    <Button style={{
                        fontFamily: 'Montserrat',
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "25px",
                        color: "white",
                        borderRadius: "13px"
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




