import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/App.css"
import {Col, Row} from "react-bootstrap";



function EndTournament_popup(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let winnerID = 0

    if(props.ladders_list.ladders["ALL"].filter((e)=>e.round_number === "1WW").length !== 0) {
        winnerID = (props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1WW")[0].winner === "A" ? (props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1WW")[0].inA) : (props.ladders_list.ladders["ALL"].filter((e) => e.round_number === "1WW")[0].inB));
    }
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
                        <Row style={{backgroundColor:"white", borderRadius:"15px", paddingLeft:"10px", marginLeft:"10px", marginRight:"10px", border:"solid"}}>
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
                                       defaultValue={props.ladders_list.ladders["ALL"].filter((e) =>
                                           e.inA === String(card.id) ||  e.inB === String(card.id)).length +
                                           (card.id == winnerID ? 1 : 0)
                                }>
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


export default EndTournament_popup;




