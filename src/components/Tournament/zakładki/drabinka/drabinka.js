// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import DrabinkaCard from "./drabinka_card";
import "./x.css";


export const Drabinka = (props) => {
    return (
        <Container fluid="true" style={{background: "#188FA7", paddingTop: "1%"}}>
            <Row>
                <Col sm={12}>
                    <Row>
                        <Button variant="success" style={{background: "green", width: "50%", justifyContent:"center", display:"flex", margin: "auto", cursor:"default"}}>PIERWSZA RUNDA</Button>
                    </Row>

                    {props.ladders_list.ladders.length === 0 ?
                        <h5>no results available</h5> :
                        props.ladders_list.ladders.map((card)=>(
                            <DrabinkaCard {...card}/>
                        ))
                    }
                </Col>
            </Row>
        </Container>
    );
}

export default Drabinka;