// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {GeoAlt, CalendarCheck, CheckCircleFill, CheckCircle} from "react-bootstrap-icons";

// CSS files
import cup_logo from "../../assets/cup.svg";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import RangTick from "../common/Buttons/rang_tick";
import InfoPanel from "../common/info_panel";


export const CalendarCard = (props) => {
    console.log("Kartka z kalendarza")
    console.log(props)
    return (
        <Card border={"dark"} style={{ minWidth: '40%', margin: "2%", padding: "2%"}} >
            <Container fluid="md">
                <Row>
                    <Col sm={2}>
                        {/*{props.view.screen === 'calendar' ? <h2>YES</h2>:<h2>NO</h2>}*/}
                          <div style={{
                              display: "flex",
                              justifyContent: "center",
                              margin: "auto",
                              height: "100%",
                              alignItems: "center"
                          }}>
                              <img src={cup_logo} alt={""} />
                          </div>
                    </Col>
                    <Col sm={5}>
                        <Row className="justify-content-md-center">
                            <h5>
                                {props.name} &nbsp;
                                <RangTick {...props}/>
                            </h5>
                        </Row>

                        <InfoPanel {...props}/>
                    </Col>
                    <Col sm={2}>
                        {props.user.role === '2' ?
                        <Card.Text>
                            <div style={{ textAlign: "center"}}>
                                Użytkownik zaprosił cię do gry w tym turnieju
                            </div>
                            <div style={{textAlign: "center"}}>
                                <Button variant="success" style={{margin: "5%"}}>TAK</Button>
                                <Button variant="danger" style={{margin: "5%"}}>NIE</Button>
                            </div>
                        </Card.Text>
                            :null
                        }
                    </Col>
                    <Col sm={3} >
                        <Row>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary">
                                ...
                            </Dropdown.Toggle>

                            <Dropdown.Menu variant="secondary">
                                <Dropdown.Item>
                                    Action 1
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    Action 2
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        </Row>
                        <br/>
                        <Row>
                            <Button href={"tournament"+"?id="+props.id} >Informacje</Button>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default CalendarCard;