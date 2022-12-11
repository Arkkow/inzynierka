// General React imports
import * as React from "react";

// Project specific files
import InfoPanel from "../common/info_panel";
import RangTick from "../common/Buttons/rang_tick";


// CSS files
import cup_logo from "../../assets/cup.svg";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useState} from "react";
import {getPendingApprovals} from "../api/api";
import {postAcceptInvite, postRejectInvite} from "../api/user_interaction/invitation_api";

export const CalendarCard = (props) => {
    const [invitations, setInvitations] = useState({ fetched: false, data: [] });
    if (invitations.fetched === false) {
        getPendingApprovals().then((dane) => {
            setInvitations({ fetched: true, data: dane });
        });
    }

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
                        <InfoPanel {...props} />
                    </Col>
                    {invitations.fetched === false ? null:
                        (
                            invitations.data.map((invitation) => (
                                <Col sm={2}>
                                    {invitation.tournament == props.id ? (
                                        <Card.Text>
                                            <div style={{ textAlign: "center" }}>
                                                Użytkownik {invitation.inviter} cię do gry w tym turnieju
                                            </div>
                                            <div style={{ textAlign: "center" }}>
                                                <Button variant="success" style={{ margin: "5%" }} onClick={() => postAcceptInvite(invitation.id)}>
                                                    TAK
                                                </Button>
                                                <Button variant="danger" style={{ margin: "5%" }} onClick={() => postRejectInvite(invitation.id)}>
                                                    NIE
                                                </Button>
                                            </div>
                                        </Card.Text>
                                    ) : null}
                                </Col>
                            ))
                        )}
                    <Col sm={2}>
                    {/*    TODO przerobić request na turniej czy rankingowy*/}
                    </Col>
                    <Col sm={3}>
                        <Row>
                            {props.user.id === props.creator?
                                <Dropdown>
                                    <Dropdown.Toggle variant="secondary">...</Dropdown.Toggle>
                                    <Dropdown.Menu variant="secondary">
                                        <Dropdown.Item {...props} href={"edit_tournament"+"?id="+props.id}>
                                            Edytuj
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            Action 2
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>:
                                null
                            }
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