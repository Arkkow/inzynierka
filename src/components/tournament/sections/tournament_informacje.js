// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import {Col, Container, Row} from "react-bootstrap";

export const TournamentInfo = (props) => {

    return (
        <Col lg={6}>
            <Container style={{background: "white", borderRadius:"10px 10px 10px 10px", marginBottom: "20px"}}>
                <Row style={{borderBottom: "1px solid var(--medium_grey)", paddingLeft: "5%", paddingRight: "5%", paddingTop: "1.5%", paddingBottom:"1.5%"}}>
                    <my_h2>{props.calendar_list.name}</my_h2>
                </Row>
                <Row style={{borderBottom: "1px solid var(--medium_grey)", paddingLeft: "5%", paddingRight: "5%", paddingTop: "1%", paddingBottom:"1%"}}>
                    <my_h3>{props.calendar_list.place}</my_h3>
                </Row>
                <Row style={{paddingLeft: "5%", paddingRight: "5%", marginTop:"2%"}}>
                    <div style={{marginBottom: "1%"}}>
                        <big_para_sb style={{marginBottom:"0"}}> Od: </big_para_sb>
                        <div>
                            <big_para> {props.calendar_list.from} </big_para>
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <big_para_sb style={{marginBottom:"0"}}> Do: </big_para_sb>
                        <div>
                            <big_para> {props.calendar_list.to} </big_para>
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <big_para_sb style={{marginBottom:"0"}}> Wpisowe: </big_para_sb>
                        <div>
                            <big_para> {props.calendar_list.entryFee} zł/os </big_para>
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <big_para_sb style={{marginBottom:"0"}}> Ranga: </big_para_sb>
                        <div>
                            <big_para>{props.calendar_list.rang}</big_para>
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <big_para_sb style={{marginBottom:"0"}}> System turniejowy: </big_para_sb>
                        <div>
                            <big_para> {props.calendar_list.typeOfLadder} </big_para>
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <big_para_sb style={{marginBottom:"0"}}> Kategorie: </big_para_sb>
                        <div>
                            <big_para> OPEN </big_para>
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <big_para_sb style={{marginBottom:"0"}}> Zapisy do: </big_para_sb>
                        <div>
                            <big_para>{props.calendar_list.entriesTo}</big_para>
                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <big_para_sb style={{marginBottom:"0"}}> Czy rankingowy: </big_para_sb>
                        <div>

                            {props.calendar_list.approved === 3?
                            <big_para>NIE</big_para>:
                                props.calendar_list.approved === 2?
                                    <big_para>TAK</big_para>:
                                    props.calendar_list.approved === 1?
                                        <big_para>OCZEKUJE NA ZGODĘ ADMINISTRATORA</big_para>:
                                        props.calendar_list.approved === 0?
                                            <big_para>NIE</big_para>:
                                            null
                            }

                        </div>
                    </div>
                    <div style={{marginBottom: "1%"}}>
                        <big_para_sb style={{marginBottom:"0"}}> Dyrektor turnieju: </big_para_sb>
                        <div>
                            <big_para> {props.calendar_list.director} </big_para>
                        </div>
                        <div>
                            <big_para> {props.calendar_list.phone} </big_para>
                        </div>
                    </div>
                    <div style={{marginBottom: "3%"}}>
                        <big_para_sb style={{marginBottom:"0"}}> Dodatkowe informacje: </big_para_sb>
                        <div>
                            <big_para> {props.calendar_list.additionalInformations} </big_para>
                        </div>
                    </div>
                </Row>
            </Container>
        </Col>
    );
}

export default TournamentInfo;