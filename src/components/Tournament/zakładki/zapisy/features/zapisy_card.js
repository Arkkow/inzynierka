// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';

// CSS files
import {Container, Row, Col, Form} from "react-bootstrap";
import { postAcceptProposal, postPayForRegistration, postTournaments } from "../../../../api/api";
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
                {/*{console.log("HIIII")}*/}
                {/*{console.log(props.id)}*/}
                <Row>
                    <Col sm={1}>
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            {props.id}
                        </div>
                    </Col>
                    <Col sm={5}>
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
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            SR: {props.rankingsum}
                        </div>
                    </Col>
                    <Col sm={4}>
                        <Container>
                            <Row>
                                <Form>
                                    {props.paymentstatus === "DONE"?
                                    <Form.Check type="switch" defaultChecked="true" disabled={true} label="Zapis opłacony" reverse/>:
                                    <Form.Check type="switch" label="Zapis opłacony" reverse/>
                                    }

                                    {props.paymentstatus2 === "DONE"?
                                        <Form.Check type="switch" defaultChecked="true" disabled={true} label="Zapis opłacony" reverse/>:
                                        <Form.Check type="switch" label="Zapis opłacony" reverse onClick={() => props.PostPayedUsingCash(props.id)}/>
                                    }
                                </Form>
                            </Row>
                            <Row>
                                {/*TODO POST POD BUTTON - SPRÓBOWAĆ WPIĄĆ SIĘ Z API*/}
                                {/*TEST {props.pairs_list.id}*/}
                                <Button onClick={() => postPayForRegistration(props.id)}>SUBMIT POST PAYMENT</Button>
                                {/*{postTournaments(props.id)}*/}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default ZapisyCard;