// General React imports
import React, { useState } from 'react';

// Project files
import {postLadder} from "../../../../api/tournament/ladders_api";
import ResultsInput from "./result_dropdowns";
import WinnerInput from "./winner_input";

// CSS files
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../../styles/App.css"
import {Col, ModalFooter, Row} from "react-bootstrap";

export function legitScores(scoreboardText) {

    let mainEventScores = [
        Number(scoreboardText[0]) > Number(scoreboardText[3]) &&
        ((Number(scoreboardText[0]) === 7 && Number(scoreboardText[3]) === 6) || Number(scoreboardText[0]) === 6)?"A":
            Number(scoreboardText[0]) < Number(scoreboardText[3]) &&
            ((Number(scoreboardText[0]) === 6 && Number(scoreboardText[3]) === 7) || Number(scoreboardText[3]) === 6)?"B":"ERR",

        Number(scoreboardText[1]) > Number(scoreboardText[4]) &&
        ((Number(scoreboardText[1]) === 7 && Number(scoreboardText[4]) === 6) || Number(scoreboardText[1]) === 6)?"A":
            Number(scoreboardText[1]) < Number(scoreboardText[4]) &&
            ((Number(scoreboardText[1]) === 6 && Number(scoreboardText[4]) === 7) || Number(scoreboardText[4]) === 6)?"B":"ERR",
    ]

    mainEventScores.push(
        // Ostatnia runda
        // Albo jest 0:0, ale tylko jeżeli w poprzednich dwóch rundach wyłoniono zwycięzcę
        Number(scoreboardText[2]) === 0 && Number(scoreboardText[5]) === 0 &&
        (
            (mainEventScores[0] === "A" && mainEventScores[1] === "A") ||
            (mainEventScores[0] === "B" && mainEventScores[1] === "B")
        )? "":
            Number(scoreboardText[2]) > Number(scoreboardText[5]) &&
            ((Number(scoreboardText[2]) === 7 && Number(scoreboardText[5]) === 6) || Number(scoreboardText[2]) === 6)?"A":
                Number(scoreboardText[2]) < Number(scoreboardText[5]) &&
                ((Number(scoreboardText[2]) === 6 && Number(scoreboardText[5]) === 7) || Number(scoreboardText[5]) === 6)?"B":"ERR",
    )

    if (mainEventScores.filter(x => x === "ERR").length !== 0) {
        return "ERROR"
    } else if (mainEventScores.filter(x => x === "A").length > mainEventScores.filter(x => x === "B").length) {
        return "A"
    } else if (mainEventScores.filter(x => x === "A").length < mainEventScores.filter(x => x === "B").length) {
        return "B"
    }
    else return "ERR"
}

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
                borderRadius: "10px",
                paddingBottom:"5px",
                paddingTop:"5px",
                paddingRight:"15px",
                paddingLeft:"15px"
            }} variant="success" onClick={handleShow}>
                PODAJ WYNIK
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
                        let winner = document.getElementById("flexRadioDefault1").checked ?
                            "A" : "B";

                        let scoreboardText = document.getElementById("set1A").value +
                        document.getElementById("set2A").value +
                        document.getElementById("set3A").value +
                        document.getElementById("set1B").value +
                        document.getElementById("set2B").value +
                        document.getElementById("set3B").value

                        if (legitScores(scoreboardText) === winner) {
                            postLadder(
                                {
                                    // handleClose(),
                                    "id": String(props.id),
                                    "inAtype": props.inAtype,
                                    "inA": String(props.inA),
                                    "inBtype": props.inBtype,
                                    "inB": String(props.inB),
                                    "round": props.round_number,
                                    "winner": winner,
                                    "scores": scoreboardText
                                }
                            )
                                .then(r => console.log(r))
                                .then(() => props.refreshProps({...props}, props.id));
                            handleClose()
                        } else {
                            alert("Wprowadzone wyniki są niepoprawne. Upewnij się, że:\n" +
                                " - Nie ma remisów w wynikach setów \n" +
                                " - Wskazany zwycięzca wygrał więcej setów niż przegrany \n" +
                                " - Zwycięzca seta wygrał 7 gemów, jeżeli przeciwnik wygrał 6 lub 6 gemów w innym przypadku")
                        }
                    }
                    }>
                        ZATWIERDŹ
                    </Button>

                </Modal.Body>
                <ModalFooter/>
            </Modal>
        </>
    );
}


export default MatchResult_popup;
