// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import DrabinkaCard from "./drabinka_card";
import "./x.css";
import CalendarCard from "../../../calendar/calendar_card";
import ZapisyCard from "../zapisy/features/zapisy_card";


export const Drabinka = (props) => {
    return (
        <Container fluid style={{background: "#188FA7", paddingTop: "1%"}}>
            <Row>
                <Col sm={6}>
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
                <Col sm={6}>
                    <Button variant="success" style={{background: "green", minWidth: "50%", justifyContent:"center", display:"flex", margin: "auto", cursor:"default"}}>DRUGA RUNDA</Button>
                    <Row className={"round-2"}>
                        <DrabinkaCard/>
                    </Row>
                    <Row className={"round-2"}>
                        <DrabinkaCard/>
                    </Row>
                    <Row className={"round-2"}>
                        <DrabinkaCard/>
                    </Row>
                    <Row className={"round-2"}>
                        <DrabinkaCard/>
                    </Row>
                </Col>
                {/*<Col sm={3}>*/}
                {/*    <Button variant="success" style={{background: "green", minWidth: "50%", justifyContent:"center", display:"flex", margin: "auto", cursor:"default"}}>TRZECIA RUNDA</Button>*/}
                {/*</Col>*/}
                {/*<Col sm={3}>*/}
                {/*    <Button variant="success" style={{background: "green", minWidth: "50%", justifyContent:"center", display:"flex", margin: "auto", cursor:"default"}}>CZWARTA RUNDA</Button>*/}
                {/*</Col>*/}
            </Row>
        </Container>
    );
}

export default Drabinka;