// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GeoAlt, CalendarCheck } from "react-bootstrap-icons";

// CSS files
import cup_logo from "../../../assets/cup.svg";
import {Container, Row, Col, Form} from "react-bootstrap";


export const DrabinkaCard = (props) => {
    return (
        <Card border={"dark"} style={{ width: '95%', margin: "auto", padding: "1%", borderRadius: 0}} >
            <Container fluid="md">
                <Row>
                    <Col sm={8}>
                        <h5>
                            Adam Kowalski 1
                        </h5>
                        <h5>
                            Paweł Iksiński 17
                        </h5>
                    </Col>
                    <Col sm={4}>
                        <h5>
                            6 3 6
                        </h5>
                    </Col>
                </Row>
                <Row style={{border: "1px solid black"}}>
                    <Col sm={8}>
                        <h5>
                            Artur Kowalski 3
                        </h5>
                        <h5>
                            Maciek Bezkitu 10
                        </h5>
                    </Col>
                    <Col sm={4} >
                        <h5>
                            6 3 6
                        </h5>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default DrabinkaCard;