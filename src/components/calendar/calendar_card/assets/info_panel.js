import React from 'react';
import { Bookmark, CalendarCheck, GeoAlt} from "react-bootstrap-icons";
import { Container, Row} from "react-bootstrap";


export const InfoPanel = (props) => {
    return (
        <Container>
            <Row>
                <div><GeoAlt/>&nbsp; {props.place}</div>
            </Row>
            <Row>
                <div>
                    <CalendarCheck/>&nbsp; od {props.from}
                </div>
            </Row>
            <Row>
                <div>
                    <CalendarCheck/>&nbsp; do {props.to}
                </div>
            </Row>
            <Row>
                <div>
                    <Bookmark/> OPEN
                </div>
            </Row>
        </Container>
    );
}

export default InfoPanel;