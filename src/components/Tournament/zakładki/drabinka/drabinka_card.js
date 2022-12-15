// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';

// CSS files
import {Container, Row, Col} from "react-bootstrap";


export const DrabinkaCard = (props) => {
    return (
        <Card border={"dark"} >
            <Container style={{paddingLeft: "30px"}}>
                <Row>
                    hi {props.id} !
                </Row>
                <Row>&nbsp;</Row>
                <Row>
                    <Col sm={8}>
                        <Row>
                            {props.inAname1} {props.inAsurname1}
                        </Row>
                        <Row>
                            {props.inAname2} {props.inAsurname2}
                        </Row>
                    </Col>
                    <Col sm={4}>
                        6 3 6
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <Row>
                            {props.inBname1} {props.inBsurname1}
                        </Row>
                        <Row>
                            {props.inBname2} {props.inBsurname2}
                        </Row>
                    </Col>
                    <Col sm={4}>
                        6 3 6
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default DrabinkaCard;