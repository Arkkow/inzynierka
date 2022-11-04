import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import cat from './img.png';

function BasicExample() {
    return (
        <Card border={"dark"} style={{ width: '80%', height: '10%'}} >
            <Container>
                <Row>
                    <Col xs={1} md={1}>
                        <Card.Img src={cat} style={{position: "relative", margin: "auto"}}/>
                        {/*text-align: center;*/}
                        {/*display: block;*/}
                        {/*justify-content: center;*/}
                        {/*align-items: center;*/}
                        {/*margin: auto;*/}
                        {/*width: 100%;*/}
                    </Col>
                    <Col xs={3} md={11}>
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default BasicExample;