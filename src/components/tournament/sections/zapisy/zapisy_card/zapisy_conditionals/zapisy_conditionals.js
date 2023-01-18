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

        <Col sm={5} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Container>
                <Row>
                    <Form style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
                        {props.myInvites?
                            <>
                                {/** Button "Użytkownik zaprosił cię do gry" **/}
                                <CalendarInvitation{...props} tournamentID = {props.tournamentID} refreshProps = {props.refreshProps}/>
                            </>
                                :null
                        }
                        {/** Slider "1 Zapis opłacony" **/}
                        {
                            // Jeżeli zapis jest opłacony masz cały proces
                            props.paymentstatus === "DONE" && props.paymentstatus2 === "DONE"?<paragraph_sb>Zapis zatwierdzony</paragraph_sb>:
                                props.partnerAcceptance === 0 && props.partner !== props.user.id? <paragraph_sb>Czeka na akceptację partnera/rki</paragraph_sb>:
                                    props.partnerAcceptance === 0 && props.partner === props.user.id? null:
                                    // Jeżeli jesteś adminem lub właścicielem turnieju
                                    (props.user.role === "2" && props.tournament.creator === props.user.id) || props.user.role === '3'?
                                        props.paymentstatus === "NOTSTARTED"?null:
                                        props.paymentstatus === "DONE"?
                                            <Form.Check type="switch" defaultChecked="true" disabled={true} style={{
                                                color: "black",
                                                fontFamily: "Montserrat",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                fontSize: "14px"

                                            }} label="Zapis 1. opłacony" reverse/>:
                                            <Form.Check type="switch" style={{
                                                color: "black",
                                                fontFamily: "Montserrat",
                                                fontStyle: "normal",
                                                fontWeight: "400",
                                                fontSize: "14px"}}
                                                        label="Zapis 1. opłacony" reverse disabled={props.paymenttype !== "cash"}
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
                            (props.user.role === "2" && props.tournament.creator === props.user.id) || props.user.role === '3'?
                                props.paymentstatus2 === "NOTSTARTED"?null:
                                props.paymentstatus2 === "DONE"?
                                    <Form.Check type="switch" defaultChecked="true" disabled={props.paymenttype === "cash"} style={{
                                        color: "black",
                                        fontFamily: "Montserrat",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        fontSize: "14px"

                                    }} label="Zapis 2. opłacony" reverse/>:
                                    <Form.Check type="switch" disabled={props.paymenttype2 !== "cash"} style={{
                                        color: "black",
                                        fontFamily: "Montserrat",
                                        fontStyle: "normal",
                                        fontWeight: "400",
                                        fontSize: "14px"

                                    }} label="Zapis 2. opłacony" reverse
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
                        {props.userid === props.user.id && (props.paymentstatus2 === "PENDING" )?<paragraph_sb>Oczekuje na płatność partnera/rki</paragraph_sb>:null}
                        {props.partner === props.user.id && (props.paymentstatus === "PENDING" )?<paragraph_sb>Oczekuje na płatność partnera/rki</paragraph_sb>:null}
                    </Form>

                </Row>

                {/** Button "Płatność" **/}
                {
                    props.approval==="1" && props.myInvites &&
                    (
                        (props.userid === props.user.id && props.paymentstatus !=="DONE" && props.paymentstatus !=="PENDING") ||
                        (props.partner === props.user.id && props.paymentstatus2 !=="DONE" && props.paymentstatus2 !=="PENDING")) ?
                            <Row>
                                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                                    <PaymentMethod_popup {...props} rid ={props.id} isOwner={props.userid == props.user.id} />
                                </div>
                            </Row>:
                            null
                }
            </Container>
        </Col>
    );


}

export default ZapisyConditionals;