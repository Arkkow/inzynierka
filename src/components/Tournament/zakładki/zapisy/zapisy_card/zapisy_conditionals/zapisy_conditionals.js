// General React imports
import * as React from 'react';

// Project specific files
import PaymentMethod_popup from '../../../../../popups/payment_method_popup.js';
import {postRegistrationApprove} from "../../../../../api/tournament/tournament_registration_api";
import {postPayedUsingCash} from "../../../../../api/user_interaction/payment_api";

// CSS files
import {Container, Row, Col, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";



export const ZapisyConditionals = (props) => {
    // Struktura propów:
    // props.   - players content
    // props.user
    // props.view
    // props

    return (
        <>
            <Col sm={1}>
                <Row>
                    {/*TODO do usunięcia*/}
                    {props.paymentstatus}
                    {props.paymenttype}
                    {"\n" + (props.paymentstatus !== "DONE" && props.paymenttype === "CASH")}


                    {props.approval === "0" && props.partnerAcceptance === "1" && (props.user.role === "2" || props.user.role === "3")?
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

                            <Form.Check disabled={(props.paymentstatus === "DONE" || props.paymenttype !== "CASH")} defaultChecked={props.paymentstatus === "DONE"}/>


                            {props.user.role === "2" || props.user.role === '3'?
                                props.paymentstatus2 === "DONE"?
                                    <Form.Check type="switch" defaultChecked="true" disabled={props.paymenttype === "CASH"} label="Zapis 2 opłacony" reverse/>:
                                    <Form.Check type="switch" label="Zapis 2 opłacony" reverse
                                                onClick={() => {
                                                    postPayedUsingCash({
                                                        "id": String(props.id) ,
                                                        "ownerOrInvited": "invited"
                                                    }).then(r =>console.log(r));
                                                }
                                                }/>
                                :null
                            }

                            {props.paymentstatus === "DONE" && props.paymentstatus2 === "DONE"?"Zapis zatwierdzony":null}
                            {props.userid === props.user.id && props.paymentstatus2 === "PENDING"?"Oczekuje na płatność partnera":null}
                            {props.partner === props.user.id && props.paymentstatus === "PENDING"?"Oczekuje na płatność partnera":null}
                        </Form>
                    </Row>
                    {
                        props.approval==="1" &&
                        (
                            (props.userid === props.user.id && props.paymentstatus !=="DONE" && props.paymentstatus !=="PENDING") ||
                            (props.partner === props.user.id&& props.paymentstatus2 !=="DONE" && props.paymentstatus2 !=="PENDING")) ?
                                <Row>
                                    <div>
                                        <PaymentMethod_popup rid ={props.id} />
                                    </div>
                                </Row>:
                                null
                    }
                </Container>
            </Col>
    </>
    );
}

export default ZapisyConditionals;