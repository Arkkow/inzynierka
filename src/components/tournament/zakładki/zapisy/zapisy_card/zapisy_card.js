// General React imports
import * as React from 'react';

// Project specific files
import ZapisyConditionals from "./zapisy_conditionals/zapisy_conditionals";


// CSS files
import {Container, Row, Col} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import {postRegistrationApprove} from "../../../../api/tournament/tournament_registration_api";



export const ZapisyCard = (props) => {
    // Struktura propów:
    // props.   - players content
    // props.user
    // props.view
    // props

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
                                    <h5>{props.name2} &nbsp; {props.surname2}</h5>
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
                                            console.log(props.calendar_list.id)
                                            // postRegistrationApprove(String(props.id)).then(r =>console.log(r)).then(() => props.handleDownloadPlayers(props.id))
                                        }
                                        }>A</Button>:
                                null
                            }
                        </Row>
                    </Col>
                    <ZapisyConditionals {...props}/>
                </Row>
            </Container>
        </Card>
    );
}

export default ZapisyCard;