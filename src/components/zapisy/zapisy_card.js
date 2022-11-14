// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GeoAlt, CalendarCheck } from "react-bootstrap-icons";

// CSS files
import cup_logo from "../../assets/cup.svg";
import {Container, Row, Col, Form, FormCheck} from "react-bootstrap";


export const ZapisyCard = (props) => {
    return (
        <Card border={"dark"} style={{ width: '95%', margin: "auto", marginTop: "1%", marginBottom: "1%", padding: "2%"}} >
            <Container fluid="md">
                <Row>
                    <Col sm={1}>
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            1.
                        </div>
                    </Col>
                    <Col sm={5}>
                        <Container>
                            <Row>
                                <Col>
                                    <h5>Adam Kowalski</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Adam Kowalski</h5>
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
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default ZapisyCard;