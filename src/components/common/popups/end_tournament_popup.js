import {pointsForTournamentsClassicLadder} from '../../tournament/sections/drabinka/functions/pointsCalculator';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/App.css"
import {Col, Row} from "react-bootstrap";
import {endTournament} from "../../../api/tournament/tournament_CRUD_api";

function EndTournament_popup(props) {
    const [show, setShow] = useState(false);
    const id_tournament = window.location.href.split('?')[1].split('=')[1];

    let rang = String(props.calendar_list.rang);
    let places = String(props.calendar_list.places);

    let winnerID = 0

    if(props.ladders_list.ladders["ALL"].filter((e)=>e.round_number === "1WW").length !== 0) {
        winnerID = (props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1WW")[0].winner === "A" ? (props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1WW")[0].inA) : (props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1WW")[0].inB));
    }
    else if(props.ladders_list.ladders["ALL"].filter((e)=>e.round_number === "1WWW").length !== 0) {
        winnerID = (props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1WWW")[0].winner === "A" ? (props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1WWW")[0].inA) : (props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1WWW")[0].inB));
    }

    let point = props.pairs_list.pairs["DONE"].map((card) => (pointsForTournamentsClassicLadder((props.ladders_list.ladders["ALL"].filter((e) =>
            e.inA === String(card.id) ||
            e.inB === String(card.id)).length +  (card.id === winnerID ? 1 : 0)), rang, places)))


    const handleCloseAndSendPoints = () => {
        const inputs = document.getElementsByTagName('input')
        const finalResults = [];
        for (let idx = 0; idx < inputs.length; ++idx) {
            finalResults.push({ rid: inputs[idx].id, points: inputs[idx].value })
        }
        const toAPI = { id: String(id_tournament), results: finalResults}
        console.log({ toAPI});
        endTournament(toAPI).then(setShow(false))
    }
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    // TODO zrobic dla 16 par, dla 8 juz dziala zliczanie
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
                ZAKOŃCZ TURNIEJ
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <my_h4>Przydzielanie punktów do rankingu</my_h4>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#EBEBEB"
                }}>

                    {props.pairs_list.pairs["DONE"].map((card) => (
                        <Row style={{backgroundColor:"white", borderRadius:"15px", paddingLeft:"10px", marginLeft:"10px", marginRight:"10px", border:"solid"}} key={card.id}>
                            <Col sm={9} style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                Id Pary {card.id}
                                <br/>
                                {card.name1} {/*tu bedzie imie i nazwisko zawodnika z turnieju*/}
                                {card.surname1}
                                <br/>
                                {card.name2} {/*tu bedzie imie i nazwisko zawodnika z turnieju*/}
                                {card.surname2}
                            </Col>
                            <Col className="col-3">

                                <input style={{width:"80px", marginTop:"10px", marginBottom:"10px", borderRadius:"15px"}}
                                       type="number"
                                       className="form-control"
                                       id={card.id}
                                        // defaultValue={Math.floor(Math.random() * 250)}
                                       defaultValue=
                                           {pointsForTournamentsClassicLadder((props.ladders_list.ladders["ALL"].filter((e) =>
                                               e.inA === String(card.id) ||
                                               e.inB === String(card.id)).length +  (card.id == winnerID ? 1 : 0)), rang, places)
                                    }
                >


                                </input>

                            </Col>
                        </Row>


                    ))}



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
                    }} variant="success" onClick={handleCloseAndSendPoints}>
                        ZAKOŃCZ TURNIEJ
                    </Button>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default EndTournament_popup;




