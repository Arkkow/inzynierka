// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';
import PaymentMethod_popup from '../../../../../popups/payment_method_popup.js';

// CSS files
import {Container, Row, Col, Form} from "react-bootstrap";
import {
    postPayedUsingCash,
    postRegistrationApprove,
} from "../../../../../api/api";
import Button from "react-bootstrap/Button";
import ZapisyConditionals from "./features/zapisy_conditionals/zapisy_conditionals";


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
                    <ZapisyConditionals {...props}/>
                </Row>
            </Container>
        </Card>
    );
}

export default ZapisyCard;