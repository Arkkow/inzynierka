import {pointsForTournamentsClassicLadder} from '../../tournament/pointsCalculator';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/App.css"
import {Col, Row} from "react-bootstrap";

function End_tournament_places_popup(props) {
    const [show, setShow] = useState(false);

    let rang = String(props.calendar_list.rang);
    let places = String(props.calendar_list.places);

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
                                       type="number" className="form-control" id="exampleFormControlInput1"
                                       defaultValue={0}>

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
                    }} variant="success" onClick={handleClose}>
                        ZAKOŃCZ TURNIEJ
                    </Button>
                </Modal.Body>
                <Modal.Footer style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default End_tournament_places_popup;



