// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import Match_result_popup from "../../../popups/match_result_popup";


export const DrabinkaCard = (props) => {
    return (
        <Card border={"dark"} >
            <Container>
                <Row>
                    <Col sm={1}>
                        {props.id}
                    </Col>
                    <Col sm={9}>
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    {props.inAname1} {props.inAsurname1}
                                </Row>
                                <Row>
                                    {props.inAname2} {props.inAsurname2}
                                </Row>
                            </Col>
                            <Col sm={4}>
                                6 3 6
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <Row>
                                    {props.inBname1} {props.inBsurname1}
                                </Row>
                                <Row>
                                    {props.inBname2} {props.inBsurname2}
                                </Row>
                            </Col>
                            <Col sm={4}>
                                6 3 6
                            </Col>
                        </Row>
                    </Col>
                    <Col sm={2} style={{display: "flex",
                        justifyContent: "center",
                        margin: "auto",
                        alignItems: "center"}}>
                        <Match_result_popup/>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default DrabinkaCard;