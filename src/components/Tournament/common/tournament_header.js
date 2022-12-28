// General React imports
import * as React from 'react';

// Project specific files
import {Container, Row, Col} from "react-bootstrap";
import T_registration_popup from "../../common/popups/T_registration_popup";

// CSS files
import { GeoAlt, CalendarCheck } from "react-bootstrap-icons";
import cup_logo from "../../../assets/cup.svg";


export const TournamentHeader = (props) => {
    return (
        <Container fluid="true" style={{background: "#0B4D39", minHeight: "30vh", paddingTop: "2%", paddingBottom: "3%", color:"white"}}>
            <Row>
                <Col lg={2} md ={2} style={{marginLeft:"30px", display: "flex", justifyContent: "center", margin: "auto"}}>
                        <img src={(props.calendar_list.hasImage == 0 ?cup_logo:"https://dragonmaster.pl/inz/tournament/image?id="+props.calendar_list.id)} alt={""} style={{height: "240px", width: "240px", borderRadius:"8px"}}/>
                </Col>
                <Col lg={6} md = {9} style={{display:"flex", alignItems:"center"}}>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col>
                                <my_h1>{props.calendar_list.name}</my_h1>
                            </Col>
                        </Row>
                        <Row style={{marginTop:"10px"}}>
                            <my_h3 style={{display:"flex", alignItems:"center"}}><GeoAlt size={30}/>&nbsp; {props.calendar_list.place}</my_h3>
                        </Row>
                        <Row style={{marginTop:"15px"}}>
                            <my_h3 style={{display:"flex", alignItems:"center"}}>
                                <CalendarCheck size={30}/>&nbsp; {props.calendar_list.from} do {props.calendar_list.to}
                            </my_h3>
                        </Row>
                    </Container>
                </Col>
                <Col lg={3} >
                    <div style={{display: "flex", justifyContent: "center", margin: "auto", height: "100%", alignItems: "center"}}>
                        <T_registration_popup role = {props.user.role}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default TournamentHeader;