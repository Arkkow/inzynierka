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
        <Card border={"dark"} style={{ width: '95%', margin: "auto", marginTop: "1%", marginBottom: "1%", padding: "2%"}} >
            <Container fluid="md">
                <Row>
                    <Col sm={1}>
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            {props.id}
                        </div>
                    </Col>
                    <Col sm={4}>
                        <Container>
                            <Row>
                                <Col>
                                    <h5>
                                        {props.name1} {props.surname1}
                                    </h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>{props.name2} {props.surname2}</h5>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col sm={2}>
                        <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                            SR: {props.rankingsum}
                        </div>
                    </Col>
                    <Col sm={1}>
                        <Row>
                            {/** Button akceptacji zapisu **/}
                            {
                                // Jeżeli para się zgodziła
                                (props.approval === "0" && props.partnerAcceptance === 1) &&
                                // Jeżeli jesteś organizatorem tego turnieju lub adminem
                                ((props.user.role === "2" && props.creator === props.user.id) || props.user.role === "3") &&
                                // Jeżeli liczba zaakceptowanych par jest mniejsza niż max
                                props.isFull === false?

                                <Button variant="warning"
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
                                        }>A</Button>:
                                null
                            }
                        </Row>
                    </Col>
                    <ZapisyConditionals {...props} tournamentID = {props.id} refreshProps = {props.refreshProps}/>
                </Row>
            </Container>
        </Card>
    );
}

export default ZapisyCard;