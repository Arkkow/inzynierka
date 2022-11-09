import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import leo from '../../assets/leo.gif';

export const CalendarCard = (props) => {
    return (
        <Card border={"dark"} style={{ width: '60%', height: '10%'}} >
            <Container>
                <Row>
                    <Col xs={1} md={1}>
                        <Card.Img src={leo} style={{position: "relative", margin: "auto"}}/>
                    </Col>
                    <Col xs={3} md={11}>
                        <Card.Body>
                            <Card.Title>{props.name}</Card.Title>
                            <Card.Text>
                                {props.places} <br/>
                                {props.from} do {props.to}
                            </Card.Text>
                            <Button variant="success" disabled={true}>OPEN</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default CalendarCard;