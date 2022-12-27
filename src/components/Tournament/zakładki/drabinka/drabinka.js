// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';

// CSS files
import { Row, Col } from "react-bootstrap";
import DrabinkaCard from "./drabinka_card";
import "./x.css";


export const Drabinka = (props) => {

    let tournament_tree = {}
    let to_push = {}

    // for (let i=0;i<4;i++){
    //     console.log(props.ladders_list.ladders.filter((e) => e.round_number[0] === "1"))
    //     tournament_tree.append(props.ladders_list.ladders.filter((e) => e.round_number[0] === "1"))
    // }

    return (
        <>
            {/*{to_push = props.ladders_list.ladders.filter((e) => e.round_number[0] === "1")}*/}
            {/*{console.log(to_push)}*/}
            {/*<End_tournament_popup/>*/}
            {/*<LadderAdmin/>*/}
            <Row>
                <Col sm={2}>
                    <Button onClick={ () => {
                        // to_push = props.ladders_list.ladders.filter((e) => e.round_number[0] === "1")
                        console.log("Hi")
                        console.log(props.ladders_list.ladders[0])
                        // console.log(to_push)
                        // console.log(tournament_tree)


                        tournament_tree[1] = to_push
                        console.log("Hi")
                        console.log(to_push)
                        console.log(tournament_tree[1])


                        // tournament_tree[1].push(props.ladders_list.ladders.filter((e) => e.round_number[0] === "1"))
                        // tournament_tree.append(props.ladders_list.ladders.filter((e) => e.round_number[0] === "1"))
                        // console.log(tournament_tree)

                        // props.ladders_list.ladders.filter((e) => e.round_number[0] === "1")

                        // for (let i=0;i<4;i++){
                        //     console.log(props.ladders_list.ladders.filter((e) => e.round_number[0] === "1"))
                        //     tournament_tree.append(props.ladders_list.ladders.filter((e) => e.round_number[0] === "1"))
                        // }
                    }
                    }>
                        xD
                    </Button>
                </Col>
            </Row>

            <Row>
                <Col sm={4}>
                    <Row>
                        <Button variant="success"
                                style={{background: "green", width: "50%", justifyContent:"center", display:"flex", margin: "auto", cursor:"default"}}>
                            PIERWSZA RUNDA
                        </Button>
                    </Row>

                        {props.ladders_list.ladders[1].length === 0 ?
                            <h5>no results available</h5> :
                            props.ladders_list.ladders[1].map((card)=>(
                                <DrabinkaCard {...card} tournamentID = {props.calendar_list.id} role = {props.user.role}/>
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

                        {props.ladders_list.ladders[2].length === 0 ?
                            <h5>no results available</h5> :
                            props.ladders_list.ladders[2].map((card)=>(
                                <DrabinkaCard {...card} tournamentID = {props.calendar_list.id} role = {props.user.role}/>
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

                        {props.ladders_list.ladders[3].length === 0 ?
                            <h5>no results available</h5> :
                            props.ladders_list.ladders[3].map((card)=>(
                                <DrabinkaCard {...card} tournamentID = {props.calendar_list.id} role = {props.user.role}/>
                            ))
                        }

                    </Col>

                </Row>
        </>
    );
}

export default Drabinka;