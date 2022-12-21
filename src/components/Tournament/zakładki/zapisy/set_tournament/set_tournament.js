// General React imports
import * as React from "react";

// Project specific files
import {getladders, putLadder} from "../../../../api/tournament/ladders_api";

// CSS files
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";
import {closeRegistrations} from "../../../../api/tournament/tournament_registration_api";
import {startTournament} from "../../../../api/tournament/tournament_CRUD_api";

export const SetTournament = (props) => {

    let ready_list = props.pairs_list.pairs.filter( (e) =>
        e.paymentstatus === "DONE" && e.paymentstatus2 === "DONE" );

    let accepted_count = props.pairs_list.pairs.filter( (e) =>
        e.approval === "1");

    let accepted_difference = props.places - ready_list.length;

    return (
        <Row fluid="true" style={{backgroundColor: "transparent", marginTop: "2%", marginBottom: "2%", margin: "auto"}}>

            {/** Zaakceptowanych par: **/}
            <Col sm={5} style={{padding: 0}}>
                <Button variant="outline-light" style={{ float: "right"}}>
                    Zaakceptowanych par: {accepted_count.length} / {props.places}
                </Button>
            </Col>

            {/** Gotowych par: **/}
            <Col sm={4}>
                <Button variant="outline-light" style={{ float: "right"}}>
                    Gotowych par: {ready_list.length}
                </Button>
            </Col>

            {/** Załóż turniej: **/}
            <Col sm={3}>
                <Button variant="secondary"
                        style={{float: "right"}}
                        disabled={accepted_difference !== 0 || props.ladders_length !== 0}
                        onClick={() => {
                            ready_list.sort(() => Math.random() - 0.5)
                            for (let i = 0; i < props.places; i += 2) {
                                putLadder
                                // console.log
                                (
                                    {
                                        "tournamentid": String(props.tournamentID),
                                        "inAtype": "R",
                                        "inA": String(ready_list[i].id),
                                        "inBtype": "R",
                                        "inB": String(ready_list[i + 1].id),
                                        "round": "1"
                                    }
                                )
                                    .then(r => console.log(r))
                            }
                            // startTournament(props.calendar_list.id).then(r => console.log(r))
                            //     .then(() => closeRegistrations(props.calendar_list.id).then(r => console.log(r)))
                        }
                        }>
                    Załóż turniej
                </Button>
            </Col>

            {/*/!** Załóż II rundę: **!/*/}
            {/*<Col sm={3}>*/}
            {/*    <Button variant="secondary"*/}
            {/*            style={{float: "right"}}*/}
            {/*            disabled={accepted_difference !== 0 || props.ladders_length === 0}*/}
            {/*            onClick={() => {*/}
            {/*                getladders(props.tournamentID)*/}
            {/*                    .then(() => {*/}
            {/*                        ready_list = props.pairs_list.pairs*/}
            {/*                            .filter( (e) => e.paymentstatus === "DONE" && e.paymentstatus2 === "DONE" )*/}
            {/*                            .filter((e) => e.round_number === "2");*/}
            {/*                })*/}
            {/*                ready_list.sort(() => Math.random() - 0.5)*/}
            {/*                for (let i = 0; i < props.places; i += 2) {*/}
            {/*                    // putLadder*/}
            {/*                        console.log*/}
            {/*                        (*/}
            {/*                            {*/}
            {/*                                "tournamentid": String(props.tournamentID),*/}
            {/*                                "inAtype": "R",*/}
            {/*                                "inA": String(ready_list[i].id),*/}
            {/*                                "inBtype": "R",*/}
            {/*                                "inB": String(ready_list[i + 1].id),*/}
            {/*                                "round": "1"*/}
            {/*                            }*/}
            {/*                        )*/}
            {/*                        // .then(r => console.log(r))*/}
            {/*                }*/}
            {/*            }*/}
            {/*            }>*/}
            {/*        Załóż II rundę*/}
            {/*    </Button>*/}
            {/*</Col>*/}
        </Row>

    )
}
export default SetTournament;