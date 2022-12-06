// General React imports
import * as React from 'react';

// Project specific files
import Card from 'react-bootstrap/Card';

// CSS files
import {Container, Row, Col} from "react-bootstrap";


export const DrabinkaCard = (props) => {
    return (
        <Card border={"dark"} style={{ width: '95%', margin: "auto", padding: "1%", borderRadius: 0}} >
            <Container fluid="md">
                <Row>
                    <Col sm={8}>
                        <h5>
                            {/*TO JEST ID TURNIEJU, NIE UCZESTNIKÓW*/}
                            User 1: {props.inA}
                            User 2: {props.partner}

                            {/*{props.inA === props.pairs.userid}*/}
                        </h5>
                        <h5>
                            {/*User 2: {props.partner}*/}
                        </h5>
                    </Col>
                    <Col sm={4}>
                        <h5>
                            6 3 6
                        </h5>
                    </Col>
                </Row>
                <Row style={{border: "1px solid black"}}>
                    <Col sm={8}>
                        <h5>

                        </h5>
                        <h5>

                        </h5>
                    </Col>
                    <Col sm={4} >
                        <h5>
                            6 3 6
                        </h5>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}

export default DrabinkaCard;