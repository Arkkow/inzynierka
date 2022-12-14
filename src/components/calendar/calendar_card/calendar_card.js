// General React imports
import * as React from "react";


// Project specific files
import InfoPanel from "../../common/info_panel";
import RangTick from "../../common/Buttons/rang_tick";


// CSS files
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CalendarPhoto from "./assets/calendarPhoto";
import CalendarAdminDropdown from "./conditionals/calendar_admin_dropdown";
import TournamentRanked from "./conditionals/tournament_ranked";
import {CalendarInvitation2} from "./conditionals/calendar_invitation_checker";
import CalendarInvitation from "./conditionals/calendar_invitation";

export const CalendarCard = (props) => {
    return (
        <Card style={{ minWidth: '40%', margin: "2%", padding: "2%", borderRadius:"20px", borderColor:"var(--medium_grey)"}} >
            <Container fluid="md">
                <Row>
                    <Col sm={2}>
                        <CalendarPhoto {...props}/>
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
                    <CalendarInvitation {...props}/>
                    <Col sm={4}>
                        <TournamentRanked {...props}/>
                        <CalendarInvitation2{...props}/>
                    </Col>
                    <Col sm={3}>
                        <CalendarAdminDropdown {...props}/>
                          <br/>
                          <Row>
                                  <Button
                                      style={{
                                          fontFamily: "Montserrat",
                                          fontWeight: "600",
                                          fontSize: "18px",
                                          lineHeight: "25px",
                                          color: "white",
                                          borderRadius: "15px",
                                          paddingBottom:"3%",
                                          paddingTop:"3%",
                                          width:"80%"
                                      }}
                                      variant="success"
                                      href={"tournament"+"?id="+props.id}
                                  >INFORMACJE</Button>
                          </Row>
                      </Col>
                </Row>
            </Container>
        </Card>
    )
}

export default CalendarCard;