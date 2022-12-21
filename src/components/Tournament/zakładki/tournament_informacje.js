// General React imports
import * as React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";

// Project specific files

// CSS files

export const TournamentInfo = (props) => {

    return (
        <Col sm={6}>
            <Container style={{background: "white"}}>
                <Row style={{borderBottom: "1px solid black", paddingLeft: "5%", paddingRight: "5%", marginTop: "0.25%", paddingTop: "0.5%"}}>

                    <h3>{props.calendar_list.name}</h3>

                </Row>
                <Row style={{borderBottom: "1px solid black", paddingLeft: "5%", paddingRight: "5%"}}>
                    <h4>{props.calendar_list.place}</h4>
                </Row>
                <Row style={{paddingLeft: "5%", paddingRight: "5%"}}>
                    <div style={{marginBottom: "1%"}}>
                        <h5 style={{marginBottom:"0"}}>Od</h5>
                        <div>
                            {props.calendar_list.from}
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <h5 style={{marginBottom:"0"}}>Do</h5>
                        <div>
                            {props.calendar_list.to}
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <h5 style={{marginBottom:"0"}}>Wpisowe</h5>
                        <div>
                            {props.calendar_list.entryFee} zł/os
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <h5 style={{marginBottom:"0"}}>Ranga</h5>
                        <div>
                            {props.calendar_list.rang}
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <h5 style={{marginBottom:"0"}}>System turniejowy</h5>
                        <div>
                            {props.calendar_list.typeOfLadder}
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <h5 style={{marginBottom:"0"}}>Kategorie</h5>
                        <div>
                            <Button variant="success" disabled={true} style={{paddingTop: "0", paddingBottom: "0", marginTop: "1%"}}>OPEN</Button>
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <h5 style={{marginBottom:"0"}}>Zapisy do</h5>
                        <div>
                            {props.calendar_list.entriesTo}
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <h5 style={{marginBottom:"0"}}>Czy rankingowy</h5>
                        <div>
                            {props.calendar_list.approved === 3?
                            "NIE":
                                props.calendar_list.approved === 2?
                                    "TAK":
                                    props.calendar_list.approved === 1?
                                        "OCZEKUJE NA ZGODĘ ADMINISTRATORA":
                                        props.calendar_list.approved === 0?
                                            "NIE":
                                            null
                            }
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <h5 style={{marginBottom:"0"}}>Dyrektor turnieju</h5>
                        <div>
                            <div>{props.calendar_list.director}</div>
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <h5 style={{marginBottom:"0"}}>Dodatkowe informacje</h5>
                        <div>
                            {props.calendar_list.additionalInformations}
                        </div>
                    </div>
                </Row>
            </Container>
        </Col>
    );
}

export default TournamentInfo;