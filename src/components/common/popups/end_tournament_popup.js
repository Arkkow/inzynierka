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
                paddingRight: "10%",
                paddingLeft: "10%",
                paddingBottom: "5%",
                paddingTop: "5%",
                marginRight: "1%",
                whiteSpace: "nowrap",
                textAlign: "center",
                backgroundColor:"#f9a620",
                borderWidth:"0"
            }} variant="success" onClick={handleShow}>
                ZAKO??CZ TURNIEJ
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <my_h4>Przydzielanie punkt??w do rankingu</my_h4>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#EBEBEB"
                }}>

                    {props.pairs_list.pairs["DONE"].map((card) => (
                        <Row style={{backgroundColor:"white", borderRadius:"15px", paddingLeft:"10px", marginLeft:"10px",
                            marginRight:"10px",  marginBottom:"10px", border:"solid var(--medium_grey) 1px", borderColor:"var(--medium_grey)"}} key={card.id}>
                            <Col sm={9} style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                                <my_h4_nosb style={{marginBottom:"5px", marginTop:"10px"}}> {/*tu bedzie imie i nazwisko zawodnika z turnieju*/}
                                    {`${card.name1} ${card.surname1}`}
                                </my_h4_nosb>
                                <my_h4_nosb style={{marginBottom:"10px"}}> {/*tu bedzie imie i nazwisko zawodnika z turnieju*/}
                                    {`${card.name2} ${card.surname2}`}
                                </my_h4_nosb>
                            </Col>
                            <Col className="col-3" style={{display:"flex", alignItems:"center"}}>

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
                        ZAKO??CZ TURNIEJ
                    </Button>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default EndTournament_popup;




