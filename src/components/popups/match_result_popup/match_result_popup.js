import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/App.css"
import {Col, ModalFooter, Row} from "react-bootstrap";
import {getElement} from "bootstrap/js/src/util";
import {postLadder} from "../../api/tournament/ladders_api";
import ResultsInput from "./result_dropdowns";
import WinnerInput from "./winner_input";


function MatchResult_popup(props) {
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

            <Modal show={show} onHide={handleClose} className="modal-lg" backdrop="static">
                <Modal.Header closeButton >
                    <my_h4>Wynik meczu</my_h4>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#EBEBEB",
                    alignItems: "center"
                }}>
                    <Row>
                        {/** KOLUMNA 1 **/}
                        <Col className="col-6" style={{marginLeft:"20px", marginTop:"25px"}}>
                            <Row style={{backgroundColor:"white", paddingLeft:"10px", borderRadius:"10px", color:"#007C36", height:"48px",  marginRight:"5px"}}>
                                <Row>
                                    <paragraph_sb style={{paddingTop:"4px"}}>{props.inAname1} {props.inAsurname1}
                                    </paragraph_sb>
                                    </Row>
                                <Row>
                                    <paragraph_sb>
                                        {props.inAname2} {props.inAsurname2}
                                    </paragraph_sb>
                                </Row>
                            </Row>
                            <Row style={{backgroundColor:"white", marginTop:"20px", color:"#007C36", paddingLeft:"10px", borderRadius:"10px", height:"48px",  marginRight:"5px"}}>
                                <Row><paragraph_sb style={{paddingTop:"4px"}}>{props.inBname1} {props.inBsurname1}</paragraph_sb></Row>
                                <Row><paragraph_sb>{props.inBname2} {props.inBsurname2}</paragraph_sb></Row>
                            </Row>
                        </Col>

                        <WinnerInput/>
                        <ResultsInput/>
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
                    }} variant="success" onClick={() => {
                        postLadder(
                            {
                                // handleClose(),
                                "id": String(props.id),
                                "inAtype": props.inAtype,
                                "inA": String(props.inA),
                                "inBtype": props.inBtype,
                                "inB": String(props.inB),
                                "round": props.round_number,
                                "winner": document.getElementById("flexRadioDefault1").checked ?
                                    "A" : "B",
                                "scores":
                                    document.getElementById("set1A").value +
                                    document.getElementById("set2A").value +
                                    document.getElementById("set3A").value +
                                    document.getElementById("set1B").value +
                                    document.getElementById("set2B").value +
                                    document.getElementById("set3B").value,
                            }
                        ).then(r => console.log(r));

                        handleClose()
                    }
                    }>ZATWIERDŹ</Button>
                </Modal.Body>

                <ModalFooter/>
            </Modal>
        </>
    );
}


export default MatchResult_popup;
