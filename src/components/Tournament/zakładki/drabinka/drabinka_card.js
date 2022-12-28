// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import Match_result_popup from "../../../popups/match_result_popup/match_result_popup";
import {CheckCircleFill, XCircleFill} from "react-bootstrap-icons";
import {getLaddersSolved} from "../../../api/tournament/ladders_api";
import {useEffect, useState} from "react";


export const DrabinkaCard = (props) => {

    let round_counted = 1;

    for ( let i=0; i < props.round_number.length; i++ ){
        let adder = 16/(2**i)
        if(props.round_number[i] === "L"){
            round_counted += adder
        }
    };

    const [card, setCard] = useState('');

    useEffect(() =>
    {
        getLaddersSolved(props.id).then((r) => {
            setCard(r);
        });
    }, [])

    return (
        <Card border={"dark"}>
            {round_counted} {props.round_number}
            <Container>
                <Row>
                    <Col sm={1} style={{ padding: 0, margin: "auto"}}>
                        {card.id}
                    </Col>
                    <Col sm={8}>
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    {card.inA} {card.inAname1} {card.inAsurname1}
                                </Row>
                                <Row>
                                    &nbsp; {card.inA} {card.inAname2} {card.inAsurname2}
                                </Row>
                            </Col>
                            <Col sm={4}>
                                {props.winner === "A"? <CheckCircleFill color={"green"}/>:null}&nbsp;
                                {props.winner === "B"? <XCircleFill color={"red"}/>:null}&nbsp;

                                {props.scores.length === 6?
                                    props.scores[0] + " " + props.scores[1] + " " + props.scores[2]
                                    :null}
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    &nbsp; {card.inB} {card.inBname1} {card.inBsurname1}
                                </Row>
                                <Row>
                                    &nbsp; {card.inB} {card.inBname2} {card.inBsurname2}
                                </Row>
                            </Col>
                            <Col sm={4}>
                                {props.winner === "B"? <CheckCircleFill color={"green"}/>:null}&nbsp;
                                {props.winner === "A"? <XCircleFill color={"red"}/>:null}&nbsp;

                                {props.scores.length === 6?
                                    props.scores[3] + " " + props.scores[4] + " " + props.scores[5]
                                    :null}
                            </Col>
                        </Row>
                    </Col>

                    <Col sm={3} style={{display: "flex",
                        justifyContent: "center",
                        margin: "auto",
                        alignItems: "center"}}>
                        {props.role === "2" || props.role === "3"?
                        <Match_result_popup {...card}/>
                        :null}
                    </Col>

                </Row>
            </Container>
        </Card>
    );
}

export default DrabinkaCard;