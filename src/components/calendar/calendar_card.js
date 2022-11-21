// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GeoAlt, CalendarCheck, ThreeDotsVertical } from "react-bootstrap-icons";

// CSS files
import cup_logo from "../../assets/cup.svg";
import {Container, Row, Col} from "react-bootstrap";


export const CalendarCard = (props) => {
    return (
        <Card border={"dark"} style={{ minWidth: '40%', margin: "2%", padding: "2%"}} >
            <Container fluid="md">
                <Row>
                    <Col sm={2}>
                          <div style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "auto",
                              height: "100%",
                              alignItems: "center"
                          }}>
                              <img src={cup_logo} alt={""} style={{ minHeight: "50%" }} />
                          </div>

                        {/*<img src={cup_logo} alt={""} style={{ minHeight: "50%" }} />*/}
                    </Col>
                    <Col sm={5}>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col>
                                    <h5>{props.name} {props.user.surname}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <div><GeoAlt/>&nbsp; {props.places}</div>
                            </Row>
                            <Row>
                                <div>
                                <CalendarCheck/>&nbsp; od {props.from}
                                </div>
                            </Row>
                            <Row>
                                <div>
                                    <CalendarCheck/>&nbsp; do {props.to}
                                </div>
                            </Row>
                            <Row>
                                <Col sm="auto">
                                    <Button variant="success" disabled={true}>OPEN</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={4}>
                        {props.user.role === '3' ?
                        <Card.Text>
                            <div style={{ textAlign: "center"}}>
                                Użytkownik zaprosił cię do gry w tym turnieju
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Button variant="success" style={{margin: "5%"}}>TAK</Button>
                                <Button variant="danger" style={{margin: "5%"}}>NIE</Button>
                            </div>
                        </Card.Text>:null}
                    </Col>
                    <Col sm={1} >
                        <ThreeDotsVertical style={{verticalAlign: "top"}}/>
                    </Col>
                </Row>
            </Container>
        </Card>

    );
}

export default CalendarCard;