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
import TournamentRanked from "./conditionals/calendar_tournament_ranked";
import CalendarInvitation from "./conditionals/calendar_invitation";

export const CalendarCard = (props) => {
    return (
        <Card style={{ minWidth: '40%', margin: "2%", padding: "2%", borderRadius:"20px", borderColor:"var(--medium_grey)"}} >
            <Container fluid="lg">
                <Row>
                    <Col sm={2}>
                        <CalendarPhoto {...props}/>
                    </Col>
                    <Col sm={4}>
                        <Row className="justify-content-sm-center">
                            <h5>
                                {props.name} &nbsp;
                                <RangTick {...props}/>
                            </h5>
                        </Row>
                        <InfoPanel {...props} />
                    </Col>
                    <Col sm={3}>
                        <CalendarInvitation {...props}/>
                        <TournamentRanked {...props}/>
                    </Col>

                    <Col sm={3} style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "auto",
                        alignItems: "center"
                    }}>
                        {/*jak dam to co z drugiej kolumny i wszystko w jednym row to bedzie git*/}
                        <Row style={{backgroundColor:"red"}}>
                            <CalendarAdminDropdown {...props}/>
                        </Row>
                        <Row>
                            <Button
                                style={{
                                    fontFamily: "Montserrat",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    lineHeight: "25px",
                                    color: "white",
                                    borderRadius: "15px",
                                    paddingBottom:"7px",
                                    paddingTop:"7px",
                                    width:"100%"
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