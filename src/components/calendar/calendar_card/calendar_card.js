// General React imports
import * as React from "react";


// Project specific files
import InfoPanel from "../../common/info_panel";
import RangTick from "../../common/Buttons/rang_tick";


// CSS files
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CalendarPhoto from "./assets/calendarPhoto";
import CalendarInvitation from "./conditionals/calendar_invitation";
import CalendarAdminDropdown from "./conditionals/calendar_admin_dropdown";

export const CalendarCard = (props) => {

    return (
        <Card border={"dark"} style={{ minWidth: '40%', margin: "2%", padding: "2%"}} >
            <Container fluid="md">
                <Row>
                    <Col sm={2}>
                        <CalendarPhoto/>
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
                    <Col sm={2}>
                    {/*    TODO przerobić request na turniej czy rankingowy*/}
                    </Col>
                    <Col sm={3}>
                        <CalendarAdminDropdown {...props}/>
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