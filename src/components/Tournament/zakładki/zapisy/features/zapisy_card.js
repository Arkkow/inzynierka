// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';
import PaymentMethod_popup from '../../../../popups/payment_method_popup.js';

// CSS files
import {Container, Row, Col, Form} from "react-bootstrap";


export const ZapisyCard = (props) => {
    // Struktura propów:
    // props.   - players content
    return (
        <Card border={"dark"} style={{ width: '95%', margin: "auto", marginTop: "1%", marginBottom: "1%", padding: "2%"}} >
            <Container fluid="md">
                {/*{console.log("HIIII")}*/}
                {/*{console.log(props.id)}*/}
                <Row>
                    <Col sm={1}>
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            1. {props.id}
                        </div>
                    </Col>
                    <Col sm={5}>
                        <Container>
                            <Row>
                                <Col>
                                    <h5>
                                        {props.userid}
                                    </h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>{props.partner}</h5>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={2}>
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            SR: 15
                        </div>
                    </Col>
                    <Col sm={4}>
                        <Container>
                            <Row>
                                <Form>
                                    <Form.Check type="switch" label="Zapis opłacony" reverse/>
                                    <Form.Check type="switch" label="Zapis opłacony" reverse/>
                                </Form>
                            </Row>
                            {props.approval=="1" &&((props.userid == props.user.id && props.paymentstatus !="DONE" && props.paymentstatus !="PENDING") || (props.partner == props.user.id&& props.paymentstatus2 !="DONE" && props.paymentstatus2 !="PENDING")) ?
                                <Row>
                                    <div>
                                        <PaymentMethod_popup rid ={props.id} />
                                    </div>
                                </Row>:
                                null
                            }


                        </Container>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default ZapisyCard;