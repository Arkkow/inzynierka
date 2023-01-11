// General React imports
import * as React from 'react';

// Project specific files
import ZapisyConditionals from "./zapisy_conditionals/zapisy_conditionals";
import {postRegistrationApprove} from "../../../../../api/tournament/tournament_registration_api";

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

export const ZapisyCard = (props) => {

    return (
        <Card style={{ width: '80%', margin: "auto", marginTop: "1%", marginBottom: "1%", padding: "2%", borderRadius:"20px", borderColor:"var(--dark_grey)"}} >
            <Container fluid="md">
                <Row>
                    <Col sm={4} style={{display:"flex", alignItems:"center"}}>
                        <Container>
                            <Row style={{display:"flex", justifyContent:"center",marginBottom:"7px"}}>
                                <Col>
                                    <big_para_sb>
                                        {props.name1} {props.surname1}
                                    </big_para_sb>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <big_para_sb>{props.name2} {props.surname2}</big_para_sb>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={2}>
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            <paragraph style={{textAlign:"center"}}>RANKING: {props.rankingsum}</paragraph>
                        </div>
                    </Col>
                    {(props.approval === "0" && props.partnerAcceptance === 1)?
                        <Col sm={6} style={{display:"flex", justifyContent:"center"}}>
                            <Row style={{display:"flex", alignItems:"center"}}>
                                {/** Button akceptacji zapisu **/}
                                {
                                    // Jeżeli para się zgodziła
                                    (props.approval === "0" && props.partnerAcceptance === 1) &&
                                    // Jeżeli jesteś organizatorem tego turnieju lub adminem
                                    ((props.user.role === "2" && props.creator === props.user.id) || props.user.role === "3") &&
                                    // Jeżeli liczba zaakceptowanych par jest mniejsza niż max
                                    props.isFull === false?

                                        <Button variant="success" style={{ fontFamily: 'Montserrat',
                                            fontWeight: "600",
                                            fontSize: "18px",
                                            lineHeight: "25px",
                                            color: "white",
                                            borderRadius: "15px",
                                            paddingRight: "13px",
                                            paddingLeft: "13px",
                                            paddingBottom: "6px",
                                            paddingTop: "6px",
                                            // backgroundColor:"#e84c20",
                                            borderWidth:"0"
                                        }}
                                                onClick={() => {
                                                    // console.log(props.handleDownloadPlayers(props.id))
                                                    // console.log(props.tournament.id)
                                                    postRegistrationApprove(String(props.id))
                                                        .catch(err => alert(err))
                                                        .then(r =>console.log(r))
                                                        .then(props.refreshProps)
                                                        .catch(err => alert(err))
                                                        .then(console.log("Zapis zaakceptowany"))
                                                }
                                                }>AKCEPTUJ ZAPIS</Button>:
                                        null
                                }
                            </Row>
                        </Col> : null
                    }

                    {props.state !== 3 && props.state !== 4?
                        <ZapisyConditionals  {...props} tournamentID = {props.id} refreshProps = {props.refreshProps}/>
                        :null}
                </Row>
            </Container>
        </Card>
    );
}

export default ZapisyCard;