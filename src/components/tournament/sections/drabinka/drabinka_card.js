// General React imports
import * as React from 'react';
import {useEffect, useState} from "react";

// Project specific files
import Match_result_popup from "../../../common/popups/match_result_popup/match_result_popup";
import {getLaddersSolved} from "../../../../api/tournament/ladders_api";

// CSS files
import Card from 'react-bootstrap/Card';
import {Container, Row, Col} from "react-bootstrap";
import {CheckCircleFill, XCircleFill} from "react-bootstrap-icons";


export const DrabinkaCard = (props) => {

    useEffect(() =>
    {
        getLaddersSolved(props.id).then((r) => {
            setCard(r);
        });
    }, [ props.id ])

    let round_counted = 1;

    for ( let i=0; i < props.round_number.length; i++ ){
        let adder = props.places/(2**i)
        if(props.round_number[i] === "L"){
            round_counted += adder
        }
    };

    const [card, setCard] = useState('');

    return (
        <Card style={{marginBottom:"20px", border:"solid var(--medium_grey) 1px", borderColor:"var(--medium_grey)"}}>
            <Container>
                <Row style={{paddingLeft: "10px"}}>
                    <Col sm={8}>

                        <Row>
                            <Col sm={8} style={{marginTop:"10px", marginBottom:"10px"}}>
                                <Row>
                                   <paragraph_sb>{card.inAname1}&nbsp;{card.inAsurname1}</paragraph_sb>
                                </Row>
                                <Row>
                                    <paragraph_sb>{card.inAname2}&nbsp;{card.inAsurname2}</paragraph_sb>
                                </Row>
                            </Col>
                            <Col sm={4} style={{marginTop:"5px", marginBottom:"10px", display:"flex", alignItems:"center", fontFamily:"'Montserrat', serif", fontStyle:"normal",
                            fontWeight:"600", fontSize:"14px", lineHeight:"17px"}}>
                                {props.winner === "A"? <CheckCircleFill color={"green"}/>:null}
                                {props.winner === "B"? <XCircleFill color={"red"}/>:null}&nbsp;&nbsp;

                                {props.scores.length === 6?
                                    props.scores[0] + " " + props.scores[1] + " " + props.scores[2]
                                    :null}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8} style={{marginTop:"10px", marginBottom:"10px"}}>
                                <Row>
                                    <paragraph_sb>{card.inBname1}&nbsp;{card.inBsurname1}</paragraph_sb>
                                </Row>
                                <Row>
                                    <paragraph_sb>{card.inBname2}&nbsp;{card.inBsurname2}</paragraph_sb>
                                </Row>
                            </Col>
                            <Col sm={4} style={{marginTop:"5px", marginBottom:"10px", display:"flex", alignItems:"center", fontFamily:"'Montserrat', serif", fontStyle:"normal",
                                fontWeight:"600", fontSize:"14px", lineHeight:"17px"}}>
                                {props.winner === "B"? <CheckCircleFill color={"green"}/>:null}
                                {props.winner === "A"? <XCircleFill color={"red"}/>:null}&nbsp;&nbsp;

                                {props.scores.length === 6?
                                    props.scores[3] + " " + props.scores[4] + " " + props.scores[5]
                                    :null}
                            </Col>
                        </Row>
                    </Col>

                    <Col sm={4} style={{display: "flex",
                        justifyContent: "center",
                        margin: "auto",
                        alignItems: "center"}}>
                        {(props.role === "2" || props.role === "3") && (card.inAname1 !== "N/A" && card.inBname1 !== "N/A")?
                            <Match_result_popup {...card} refreshProps = {() => props.refreshProps({...props}, props.id)}/>
                        :null}
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default DrabinkaCard;