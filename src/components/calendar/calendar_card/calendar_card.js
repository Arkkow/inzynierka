// General React imports
import * as React from "react";


// Project specific files
import InfoPanel from "./assets/info_panel";
import RangTick from "../../common/buttons/rang_tick";


// CSS files
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CalendarPhoto from "./assets/calendarPhoto";
import CalendarAdminDropdown from "./features/conditionals/calendar_admin_dropdown";
import TournamentRanked from "./features/conditionals/calendar_tournament_ranked";
import CalendarInvitation from "./features/conditionals/calendar_invitation";

export const CalendarCard = (props) => {
    return (
        <Card style={{ minWidth: '40%', margin: "2%", padding: "2%", borderRadius:"20px", borderColor:"var(--medium_grey)"}}  >
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

                    <Col sm={3} style={{display: "flex",
                        justifyContent: "center",
                        margin: "auto",
                        alignItems: "center"}}>
                        <Row style={{width:"100%"}}>

                            <CalendarAdminDropdown {...props}/>
                            <Row style={{display:"flex", justifyContent:"end"}}>
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

                        </Row>

                    </Col>
                </Row>
            </Container>
        </Card>
    )
}

export default CalendarCard;