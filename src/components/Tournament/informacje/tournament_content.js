// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GeoAlt, CalendarCheck } from "react-bootstrap-icons";

// CSS files
import cup_logo from "../../../assets/cup.svg";
import {Container, Row, Col, Form, ButtonGroup} from "react-bootstrap";
import TournamentNavbar from "../navbar/tournament_navbar";


export const TournamentContent = (props) => {
    return (
        <Container fluid style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
            <Row className="justify-content-md-center" >
                <Col sm={6} style={{paddingLeft: 0, paddingRight:0}}>
                    <Container>
                        <Row fluid style={{backgroundColor: "transparent"}}>
                            <Col sm={10} >
                                <TournamentNavbar/>
                            </Col>
                        </Row>
                        <Container style={{background: "white"}}>
                            <Row style={{borderBottom: "1px solid black", paddingLeft: "5%", paddingRight: "5%", marginTop: "0.25%", paddingTop: "0.5%"}}>
                                <h3>Turniej majowy 2022</h3>
                            </Row>
                            <Row style={{borderBottom: "1px solid black", paddingLeft: "5%", paddingRight: "5%"}}>
                                <h4>Propadel, Warszawa</h4>
                            </Row>
                            <Row style={{paddingLeft: "5%", paddingRight: "5%"}}>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Od</h5>
                                    <div>
                                        28/05/2022
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Do</h5>
                                    <div>
                                        29/05/2022
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Wpisowe</h5>
                                    <div>
                                        80 zł/os
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Ranga</h5>
                                    <div>
                                        CHALLENGER
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>System turniejowy</h5>
                                    <div>
                                        Drabinka klasyczna
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Kategorie</h5>
                                    <div>
                                        <Button variant="success" disabled="true" style={{paddingTop: "0", paddingBottom: "0", marginTop: "1%"}}>OPEN</Button>
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>System turniejowy</h5>
                                    <div>
                                        Drabinka klasyczna
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Zapisy do</h5>
                                    <div>
                                        29/04/2022
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Czy rankingowy</h5>
                                    <div>
                                        TAK
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Dyrektor turnieju</h5>
                                    <div>
                                        <div>Adam Kowalski</div>
                                        <div>+00 123456789</div>
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Dodatkowe informacje</h5>
                                    <div>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cum sociis natoque penatibus et magnis dis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Leo urna molestie at elementum eu facilisis sed. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Vitae congue mauris rhoncus aenean vel elit scelerisque. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Quisque sagittis purus sit amet volutpat. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Morbi quis commodo odio aenean sed adipiscing diam donec.
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default TournamentContent;