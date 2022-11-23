// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GeoAlt, CalendarCheck } from "react-bootstrap-icons";

// CSS files
import cup_logo from "../../../assets/cup.svg";
import {Container, Row, Col, Form, ButtonGroup} from "react-bootstrap";
import ZapisyCard from "./features/zapisy_card";


export const Zapisy = (props) => {
    return (
        <Container fluid style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
            <Row className="justify-content-md-center" >
                <Col sm={6} style={{paddingLeft: 0, paddingRight:0}}>
                    <Container>
                        <Row fluid style={{backgroundColor: "transparent", marginTop: "1%", marginBottom: "0.5%"}}>
                            <Col sm={5} style={{padding: 0}}>
                                <ButtonGroup style={{marginTop: "0.25%"}}>
                                    <Button variant="light" style={{border: "1px solid black"}}>Informacje</Button>
                                    <Button variant="light" style={{border: "1px solid black"}}>Zapisy</Button>
                                    <Button variant="light" style={{border: "1px solid black"}}>Wyniki</Button>
                                </ButtonGroup>
                            </Col>
                            <Col sm={4} style={{paddingRight: 0}}>
                                <Button variant="outline-light" style={{ float: "right"}}> Zaakceptowanych par: 8</Button>
                            </Col>
                            <Col sm={3} style={{paddingRight:0}}>
                                <Button variant="secondary" style={{float: "right"}}>Wygeneruj drabinkę</Button>
                            </Col>
                        </Row>
                        <Row style={{background: "white"}}>
                            <ZapisyCard/>
                            <ZapisyCard/>
                            <ZapisyCard/>
                            <ZapisyCard/>
                            <ZapisyCard/>
                            <ZapisyCard/>
                            <ZapisyCard/>
                            <ZapisyCard/>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Zapisy;