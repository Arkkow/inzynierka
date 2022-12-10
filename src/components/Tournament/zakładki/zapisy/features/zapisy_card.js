// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';
import PaymentMethod_popup from '../../../../popups/payment_method_popup.js';

// CSS files
import {Container, Row, Col, Form} from "react-bootstrap";
import {
    postPayedUsingCash,
    postRegistrationApprove,
} from "../../../../api/api";
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
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            SR: {props.rankingsum}
                        </div>
                    </Col>
                    <Col sm={1}>
                        <Row>
                            {props.approval === "0" && (props.user.role === "2" || props.user.role === "3")?
                                <Button onClick={() => {
                                    postRegistrationApprove(String(props.id)).then(r =>console.log(r))
                                }
                                }>A</Button>:
                                null
                            }
                        </Row>
                    </Col>
                    <Col sm={4}>
                        <Container>
                            <Row>
                                <Form>
                                    {props.user.role === "2" || props.user.role === '3'?
                                        props.paymentstatus === "DONE"?
                                          <Form.Check type="switch" defaultChecked="true" disabled={true} label="Zapis 1. opłacony" reverse/>:
                                          <Form.Check type="switch" label="Zapis 1. opłacony" reverse
                                                      onClick={() => {
                                                          postPayedUsingCash({
                                                              "id": String(props.id) ,
                                                              "ownerOrInvited": "owner"
                                                          }).then(r =>console.log(r));
                                                      }
                                                      }/>:null
                                    }

                                    {props.user.role === "2" || props.user.role === '3'?
                                    props.paymentstatus2 === "DONE"?
                                        <Form.Check type="switch" defaultChecked="true" disabled={true} label="Zapis 2 opłacony" reverse/>:
                                        <Form.Check type="switch" label="Zapis 2 opłacony" reverse
                                                    onClick={() => {
                                                        postPayedUsingCash({
                                                            "id": String(props.id) ,
                                                            "ownerOrInvited": "invited"
                                                        }).then(r =>console.log(r));
                                                    }
                                        }/>:null
                                    }

                                    {props.paymentstatus === "DONE" && props.paymentstatus2 === "DONE"?"Zapis zatwierdzony":null}
                                    {props.userid === props.user.id && props.paymentstatus2 === "PENDING"?"Oczekuje na płatność partnera":null}
                                    {props.partner === props.user.id && props.paymentstatus === "PENDING"?"Oczekuje na płatność partnera":null}
                                </Form>
                            </Row>
                            {props.approval==="1" &&((props.userid === props.user.id && props.paymentstatus !=="DONE" && props.paymentstatus !=="PENDING") || (props.partner === props.user.id&& props.paymentstatus2 !=="DONE" && props.paymentstatus2 !=="PENDING")) ?
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