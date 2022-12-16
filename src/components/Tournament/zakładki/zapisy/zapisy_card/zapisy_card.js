// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import ZapisyConditionals from "./zapisy_conditionals/zapisy_conditionals";
import Button from "react-bootstrap/Button";


export const ZapisyCard = (props) => {
    // Struktura propów:
    // props.   - players content
    // props.user
    // props.view
    // props

    return (
        <Card border={"dark"} style={{ width: '95%', margin: "auto", marginTop: "1%", marginBottom: "1%", padding: "2%"}} >
            <Container fluid="md">
                <Row>
                    <Col sm={1}>
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            {props.id}
                        </div>
                    </Col>
                    <Col sm={4}>
                        <Container>
                            <Row>
                                <Col>
                                    <h5>
                                        {props.name1} {props.surname1}
                                    </h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>{props.name2} &nbsp; {props.surname2}</h5>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={2}>
                        {/*TODO  props.handleGOTO is not a function*/}
                        <Button variant="danger" onClick={() => props.handleReadyList()}>
                            SEND NUKES
                        </Button>
                        <Button
                            onClick={() => props.handleGOTO("info")}
                            variant="light"
                            style={{border: "1px solid black"}}>
                            Informacje
                        </Button>
                        {/*<Button variant="danger" onClick={() => props.handleGOTO("info")}>*/}
                        {/*    SEND NUDES*/}
                        {/*</Button>*/}

                        {/*{() => props.handleGOTO("info")}*/}

                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            SR: {props.rankingsum}
                        </div>
                    </Col>
                    <ZapisyConditionals {...props}/>
                </Row>
            </Container>
        </Card>
    );
}

export default ZapisyCard;