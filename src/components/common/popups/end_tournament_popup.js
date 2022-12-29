import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/App.css"
import {Col, Row} from "react-bootstrap";

function pointsForTournamentsClassicLadder(numberOfPairGames, rang, numberOfPairs){
    if (rang == "Master" && numberOfPairs == "8")
    {
        if (numberOfPairGames == 1){
            return 50
        }
        else if (numberOfPairGames == 2){
            return 125
        }
        else if (numberOfPairGames == 3){
            return 250
        }
        else if (numberOfPairGames == 4){
            return 500
        }
    }
    else if (rang == "Master" && numberOfPairs == "16")
    {
        if (numberOfPairGames == 1){
            return 50
        }
        else if (numberOfPairGames == 2){
            return 125
        }
        else if (numberOfPairGames == 3){
            return 250
        }
        else if (numberOfPairGames == 4){
            return 500
        }
        else if (numberOfPairGames == 5){
            return 1000
        }
    }
   else if (rang == "CHALLANGER" && numberOfPairs == "8")
    {
        if (numberOfPairGames == 1){
            return 25
        }
        else if (numberOfPairGames == 2){
            return 50
        }
        else if (numberOfPairGames == 3){
            return 125
        }
        else if (numberOfPairGames == 4){
            return 250
        }
    }
    else if (rang == "CHALLANGER" && numberOfPairs == "16")
    {
        if (numberOfPairGames == 1){
            return 25
        }
        else if (numberOfPairGames == 2){
            return 50
        }
        else if (numberOfPairGames == 3){
            return 125
        }
        else if (numberOfPairGames == 4){
            return 250
        }
        else if (numberOfPairGames == 5){
            return 500
        }
    }
}

function pointsForTournamentsLadderOfPlace(place, rang, numberOfPairs){
    if (rang == "Master" && numberOfPairs == "8")
    {
        if (place == 1){
            return 500
        }
        else if (place == 2){
            return 400
        }
        else if (place == 3){
            return 300
        }
        else if (place == 4){
            return 200
        }
        else if (place == 5){
            return 150
        }
        else if (place == 6){
            return 100
        }
        else if (place == 7){
            return 50
        }
        else if (place == 8){
            return 25
        }
    }
    else if (rang == "Master" && numberOfPairs == "16")
    {
        if (place == 1){
            return 1000
        }
        else if (place == 2){
            return 900
        }
        else if (place == 3){
            return 800
        }
        else if (place == 4){
            return 700
        }
        else if (place == 5){
            return 600
        }
        else if (place == 6){
            return 500
        }
        else if (place == 7){
            return 450
        }
        else if (place == 8){
            return 400
        }
        else if (place == 9){
            return 350
        }
        else if (place == 10){
            return 300
        }
        else if (place == 11){
            return 250
        }
        else if (place == 12){
            return 200
        }
        else if (place == 13){
            return 150
        }
        else if (place == 14){
            return 100
        }
        else if (place == 15){
            return 50
        }
        else if (place == 16){
            return 25
        }
    }
    else if (rang == "CHALLENGER" && numberOfPairs == "8")
    {
        if (place == 1){
            return 250
        }
        else if (place == 2){
            return 200
        }
        else if (place == 3){
            return 150
        }
        else if (place == 4){
            return 100
        }
        else if (place == 5){
            return 75
        }
        else if (place == 6){
            return 50
        }
        else if (place == 7){
            return 24
        }
        else if (place == 8){
            return 10
        }
    }
    else if (rang == "CHALLENGER" && numberOfPairs == "16")
    {
        if (place == 1){
            return 500
        }
        else if (place == 2){
            return 450
        }
        else if (place == 3){
            return 400
        }
        else if (place == 4){
            return 350
        }
        else if (place == 5){
            return 300
        }
        else if (place == 6){
            return 250
        }
        else if (place == 7){
            return 225
        }
        else if (place == 8){
            return 200
        }
        else if (place == 9){
            return 175
        }
        else if (place == 10){
            return 150
        }
        else if (place == 11){
            return 125
        }
        else if (place == 12){
            return 100
        }
        else if (place == 13){
            return 75
        }
        else if (place == 14){
            return 50
        }
        else if (place == 15){
            return 25
        }
        else if (place == 16){
            return 10
        }
    }
}


function EndTournament_popup(props) {
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
                ZAKOŃCZ TURNIEJ
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <my_h4>Przydzielanie punktów do rankingu</my_h4>
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#EBEBEB"
                }}>
                    <Row style={{backgroundColor:"white", borderRadius:"15px", paddingLeft:"10px", marginLeft:"10px", marginRight:"10px"}}>
                    <Col className="col-9" style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                        <my_h4>Jarosław Cebulszczykiewicz</my_h4> {/*tu bedzie imie i nazwisko zawodnika z turnieju*/}
                        <my_h4>Cebulak Jarosławiecki</my_h4>
                    </Col>
                    <Col className="col-3">
                        <input style={{width:"80px", marginTop:"10px", marginBottom:"10px", borderRadius:"15px"}} type="number" className="form-control" id="exampleFormControlInput1" defaultValue="0"></input>
                    </Col>
                    </Row>
                    <Row style={{marginTop:"10px", backgroundColor:"white", borderRadius:"15px", paddingLeft:"10px", marginLeft:"10px", marginRight:"10px"}}>
                        <Col className="col-9" style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                            <my_h4>Jarosław Cebulszczykiewicz</my_h4> {/*tu bedzie imie i nazwisko zawodnika z turnieju*/}
                            <my_h4>Cebulak Jarosławiecki</my_h4>
                        </Col>
                        <Col className="col-3">
                            <input style={{width:"80px", marginTop:"10px", marginBottom:"10px", borderRadius:"15px"}} type="number" className="form-control" id="exampleFormControlInput1" defaultValue="0"></input>
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




