// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';

// CSS files
import { Row, Col } from "react-bootstrap";
import DrabinkaCard from "./drabinka_card";
import "./x.css";


export const Drabinka = (props) => {
    return (
        <>
            {/*<End_tournament_popup/>*/}
            {/*<LadderAdmin/>*/}

            <Row>
                <Col sm={4}>
                    <Row>
                        <Button variant="success"
                                style={{background: "green", width: "50%", justifyContent:"center", display:"flex", margin: "auto", cursor:"default"}}>
                            PIERWSZA RUNDA
                        </Button>
                    </Row>

                        {props.ladders_list.ladders.filter((e) => e.round_number === "1").length === 0 ?
                            <h5>no results available</h5> :
                            props.ladders_list.ladders.filter((e) => e.round_number === "1").map((card)=>(
                                <DrabinkaCard {...card} tournamentID = {props.calendar_list.id}/>
                            ))
                        }
                    </Col>
                    <Col sm={4}>
                        <Row>
                            <Button variant="success"
                                    style={{background: "green", width: "50%", justifyContent:"center", display:"flex", margin: "auto", cursor:"default"}}
                                    onClick={() => console.log("hi!")}
                            >
                                DRUGA RUNDA
                            </Button>
                        </Row>

                        {props.ladders_list.ladders.filter((e) => e.round_number === "2").length === 0 ?
                            <h5>no results available</h5> :
                            props.ladders_list.ladders.filter((e) => e.round_number === "2").map((card)=>(
                                <DrabinkaCard {...card} tournamentID = {props.calendar_list.id}/>
                            ))
                        }

                    </Col>
                    <Col sm={4}>
                        <Row>
                            <Button variant="success"
                                    style={{background: "green", width: "50%", justifyContent:"center", display:"flex", margin: "auto", cursor:"default"}}
                                    onClick={() => console.log("hi!")}
                            >
                                TRZECIA RUNDA
                            </Button>
                        </Row>

                        {props.ladders_list.ladders.filter((e) => e.round_number === "3").length === 0 ?
                            <h5>no results available</h5> :
                            props.ladders_list.ladders.filter((e) => e.round_number === "3").map((card)=>(
                                <DrabinkaCard {...card} tournamentID = {props.calendar_list.id}/>
                            ))
                        }

                    </Col>

                </Row>
        </>
    );
}

export default Drabinka;