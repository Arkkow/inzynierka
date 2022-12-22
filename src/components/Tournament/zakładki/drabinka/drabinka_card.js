// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import Match_result_popup from "../../../popups/match_result_popup/match_result_popup";
import {CheckCircleFill, XCircleFill} from "react-bootstrap-icons";


export const DrabinkaCard = (props) => {
    return (
        <Card border={"dark"}>
            <Container>
                <Row>
                    <Col sm={1} style={{ padding: 0, margin: "auto"}}>
                        {props.id}
                    </Col>
                    <Col sm={8}>
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    &nbsp; {props.inA} {props.inAname1} {props.inAsurname1}
                                </Row>
                                <Row>
                                    &nbsp; {props.inA} {props.inAname2} {props.inAsurname2}
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
                                    &nbsp; {props.inB} {props.inBname1} {props.inBsurname1}
                                </Row>
                                <Row>
                                    &nbsp; {props.inB} {props.inBname2} {props.inBsurname2}
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
                        <Match_result_popup {...props}/>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default DrabinkaCard;