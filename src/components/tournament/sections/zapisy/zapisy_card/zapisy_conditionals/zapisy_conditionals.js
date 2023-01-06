// General React imports
import * as React from 'react';

// Project specific files
import PaymentMethod_popup from '../../../../../common/popups/payment_method_popup.js';
import {postPayedUsingCash} from "../../../../../../api/user_interaction/payment_api";
import {CalendarInvitation} from "../../../../../calendar/calendar_card/features/conditionals/calendar_invitation";

// CSS files
import {Container, Row, Col, Form} from "react-bootstrap";



export const ZapisyConditionals = (props) => {

    return (
        <Col sm={4}>
            <Container>
                <Row>
                    <Form>
                        {/** Button "Użytkownik zaprosił cię do gry" **/}
                        <CalendarInvitation{...props} tournamentID = {props.tournamentID} refreshProps = {props.refreshProps}/>

                        {/** Slider "1 Zapis opłacony" **/}
                        {
                            // Jeżeli zapis jest opłacony masz cały proces
                            props.paymentstatus === "DONE" && props.paymentstatus2 === "DONE"?"Zapis zatwierdzony":
                                props.partnerAcceptance === 0 && props.partner !== props.user.id? "Czeka na akceptację partnera/rki":
                                    props.partnerAcceptance === 0 && props.partner === props.user.id? null:
                                    // Jeżeli jesteś adminem lub właścicielem turnieju
                                    (props.user.role === "2" && props.creator === props.user.id) || props.user.role === '3'?
                                        props.paymentstatus === "NOTSTARTED"?null:
                                        props.paymentstatus === "DONE"?
                                            <Form.Check type="switch" defaultChecked="true" disabled={true} label="Zapis 1. opłacony" reverse/>:
                                            <Form.Check type="switch" label="Zapis 1. opłacony" reverse disabled={props.paymenttype !== "cash"}
                                                        onClick={() => {
                                                            postPayedUsingCash({
                                                                "id": String(props.id) ,
                                                                "ownerOrInvited": "owner"
                                                            }).then(r =>console.log(r));
                                                        }
                                                        }/>:null

                        }
                        {/** Slider "Zapis 2 opłacony" **/}
                        {props.paymentstatus === "DONE" && props.paymentstatus2 === "DONE"?null:
                            props.partnerAcceptance === 0? null:
                            (props.user.role === "2" && props.creator === props.user.id) || props.user.role === '3'?
                                props.paymentstatus2 === "NOTSTARTED"?null:
                                props.paymentstatus2 === "DONE"?
                                    <Form.Check type="switch" defaultChecked="true" disabled={props.paymenttype === "cash"} label="Zapis 2 opłacony" reverse/>:
                                    <Form.Check type="switch" disabled={props.paymenttype2 !== "cash"} label="Zapis 2 opłacony" reverse
                                                onClick={() => {
                                                    postPayedUsingCash({
                                                        "id": String(props.id) ,
                                                        "ownerOrInvited": "invited"
                                                    }).then(r =>console.log(r));
                                                }
                                                }/>
                                :null
                        }

                        {/** Komunikaty dla zawodników **/}
                        {/*Nie może być, bo uruchamia się przed akceptacją zaproszenia*/}
                        {/*|| props.paymentstatus2 === "NOTSTARTED"*/}
                        {props.userid === props.user.id && (props.paymentstatus2 === "PENDING" )?"Oczekuje na płatność partnera":null}
                        {props.partner === props.user.id && (props.paymentstatus === "PENDING")?"Oczekuje na płatność partnera":null}
                    </Form>

                </Row>

                {/** Button "Płatność" **/}
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
    );
}

export default ZapisyConditionals;