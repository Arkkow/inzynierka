// General React imports
import * as React from "react";


// Project specific files
import InfoPanel from "./assets/info_panel";
import RangTick from "../../common/buttons/rang_tick";
import CalendarPhoto from "./assets/calendarPhoto";
import CalendarAdminDropdown from "./features/conditionals/calendar_admin_dropdown";
import TournamentRanked from "./features/conditionals/calendar_tournament_ranked";

// CSS files
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {useEffect} from "react";

export const CalendarCard = (props) => {

    useEffect(() => {
        let showInviteAlert = false
    }, [])

    return (
        <Card style={{ minWidth: '40%', margin: "2%", padding: "2%", borderRadius:"20px", borderColor:"var(--medium_grey)"}}  >
            <Container fluid="lg">
                <Row>
                    <Col sm={2}>
                        <CalendarPhoto {...props}/>
                    </Col>
                    <Col sm={4}>
                        <Row className="justify-content-sm-center">
                            <my_h4 style={{marginBottom:"7px"}}>
                                {props.name} &nbsp;
                                <RangTick {...props}/>
                            </my_h4>
                        </Row>
                        <InfoPanel {...props} />
                    </Col>
                    <Col sm={3} style={{display:"flex", alignItems:"center", justifyContent:"center", }}>
                        {/*TODO to prawie działa na mytournaments is not a function*/}
                        {/*{console.log(props.my_tournament_list)}*/}
                        {/*{console.log(props.id)}*/}

                        {/*{*/}
                        {/*    props.my_tournament_list !== [] && props.my_tournament_list !== undefined?*/}
                        {/*            props.my_tournament_list.filter(e => e.tournament === String(props.id)).length !== 0?*/}
                        {/*                "Masz zaproszenie na ten turniej!": null:null*/}
                        {/*}*/}

                        <TournamentRanked {...props} refreshProps = {props.refreshProps}/>
                    </Col>

                    <Col sm={3} style={{display: "flex",
                        justifyContent: "center",
                        margin: "auto",
                        alignItems: "center"}}>
                        <Row style={{minWidth:"180px"}}>

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