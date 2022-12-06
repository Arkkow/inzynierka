// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';

// CSS files
import {Container, Row, Col, Form} from "react-bootstrap";


export const ZapisyCard = (props) => {
    return (
        <Card border={"dark"} style={{ width: '95%', margin: "auto", marginTop: "1%", marginBottom: "1%", padding: "2%"}} >
            <Container fluid="md">
                {/*{console.log("HIIII")}*/}
                {/*{console.log(props.id)}*/}
                <Row>
                    <Col sm={1}>
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            1.
                            {props.id}
                            {/*{props.tournament_list.id}*/}
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