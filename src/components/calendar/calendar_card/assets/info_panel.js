import React from 'react';
import { Bookmark, CalendarCheck, GeoAlt} from "react-bootstrap-icons";
import { Container, Row} from "react-bootstrap";


export const InfoPanel = (props) => {
    return (
        <Container>
            <Row style={{marginBottom:"5px"}}>
                <big_para style={{display:"flex", alignItems:"center", fontSize:"17px"}}><GeoAlt/>&nbsp; {props.place}</big_para>
            </Row>
            <Row style={{marginBottom:"5px"}}>
                <big_para style={{display:"flex", alignItems:"center", fontSize:"17px"}}><CalendarCheck/>&nbsp; od {props.from}</big_para>
            </Row>
            <Row style={{marginBottom:"5px"}}>
                <big_para style={{display:"flex", alignItems:"center", fontSize:"17px"}}>
                    <CalendarCheck/>&nbsp; do {props.to}
                </big_para>
            </Row>
            <Row>
                <big_para style={{display:"flex", alignItems:"center", fontSize:"17px"}}>
                    <Bookmark/>&nbsp; OPEN
                </big_para>
            </Row>
        </Container>
    );
}

export default InfoPanel;