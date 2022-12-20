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
                fontFamily: "Montserrat",
                fontWeight: "600",
                fontSize: "18px",
                lineHeight: "25px",
                color: "white",
                borderRadius: "15px",
                paddingBottom:"1%",
                paddingTop:"1%",
                paddingRight:"15px",
                paddingLeft:"15px"
            }} variant="success" onClick={handleShow}>
                WYNIK
            </Button>
            <Modal show={show} onHide={handleClose} className="modal-lg">
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
                        <Col className="col-6" style={{marginLeft:"20px", marginTop:"25px"}}>
                            <Row style={{backgroundColor:"white", paddingLeft:"10px", borderRadius:"10px", color:"#007C36", height:"48px",  marginRight:"5px"}}>
                                <Row>
                                    <paragraph_sb style={{paddingTop:"4px"}}>ADAM KOWALSKI
                                    </paragraph_sb>
                                    </Row>
                                <Row>
                                    <paragraph_sb>
                                    BARTOSZ NOWAK
                                    </paragraph_sb>
                                </Row>
                            </Row>
                            <Row style={{backgroundColor:"white", marginTop:"20px", color:"#007C36", paddingLeft:"10px", borderRadius:"10px", height:"48px",  marginRight:"5px"}}>
                                <Row><paragraph_sb style={{paddingTop:"4px"}}>CEZARY PECKERT</paragraph_sb></Row>
                                <Row><paragraph_sb>DARIUSZ DAREMSKI</paragraph_sb></Row>
                            </Row>
                        </Col>
                        {/*KOLUMNA 2*/}
                        <Col /*style={{backgroundColor:"darkgrey"}}*/>
                            <paragraph_sb style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",
                                paddingTop:"4px",
                                color: "var(--black)"}}>
                                ZWYCIĘZCA
                            </paragraph_sb>
                            <div>
                            <div className="form-check"
                                 style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",
                                     backgroundColor:"white",
                                     borderRadius:"10px",
                                 marginTop:"4px",
                                     height:"48px",
                                     borderStyle:"solid",
                                     borderColor:"#CED4DA",
                                     borderWidth:"thin"
                                 }}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                       id="flexRadioDefault1"></input>
                            </div>
                            <div className="form-check"
                                 style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center", backgroundColor:"white", height:"48px", borderRadius:"10px", marginTop:"20px",
                                     borderStyle:"solid",
                                     borderColor:"#CED4DA",
                                     borderWidth:"thin"}}>
                                <input className="form-check-input" type="radio" name="flexRadioDefault"
                                       id="flexRadioDefault2" checked></input>
                            </div>
                            </div>
                        </Col>
                        {/*KOLUMNA 3*/}
                        <Col /*style={{backgroundColor:"lightgrey"}}*/>
                            <paragraph_sb style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",
                                paddingTop:"4px",
                                color: "var(--black)"}}>
                                SET 1
                            </paragraph_sb>
                            <Form style={{marginTop:"4px"}}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <div
                                         style={{
                                             display: "flex",
                                        justifyContent: "center",
                                        margin: "auto",
                                        alignItems: "center",}}>
                                        <select id="inputState" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
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
                            <Form style={{marginTop:"20px"}}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <div
                                        style={{
                                            marginTop:"20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            margin: "auto",
                                            alignItems: "center"}}>
                                        <select id="inputState" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
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
                            <paragraph_sb style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",
                                paddingTop:"4px",
                                color: "var(--black)"}}>
                                SET 2
                            </paragraph_sb>
                            <Form style={{marginTop:"4px"}}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            margin: "auto",
                                            alignItems: "center",}}>
                                        <select id="inputState" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
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
                            <Form style={{marginTop:"20px"}}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <div
                                        style={{
                                            marginTop:"20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            margin: "auto",
                                            alignItems: "center"}}>
                                        <select id="inputState" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
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
                        {/*KOLUMNA 5*/}
                        <Col style={{marginRight:"10px"}}>
                            <paragraph_sb style={{display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",
                                paddingTop:"4px",
                                color: "var(--black)"}}>
                                SET 3
                            </paragraph_sb>
                            <Form style={{marginTop:"4px"}}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            margin: "auto",
                                            alignItems: "center",}}>
                                        <select id="inputState" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
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
                            <Form style={{marginTop:"20px"}}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <div
                                        style={{
                                            marginTop:"20px",
                                            display: "flex",
                                            justifyContent: "center",
                                            margin: "auto",
                                            alignItems: "center"}}>
                                        <select id="inputState" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
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
                    </Row>

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
                        marginTop: "10px"
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




