// General React imports
import * as React from "react";

// Project specific files
import {putLadder} from "../../../../api/tournament/ladders_api";

// CSS files
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";
import SetRounds from "./set_rounds/set_rounds";

export const SetTournament = (props) => {

    let ready_list = props.pairs_list.pairs["DONE"];

    let accepted_count = props.pairs_list.pairs["ALL"].filter( (e) =>
        e.approval === "1");

    let accepted_difference = props.places - ready_list.length;

    return (
        <>
            {props.user.role === "3"?
            <>
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
                </Row>
                <Row>

                    {/** Załóż turniej: **/}
                    <Col sm={3}>
                        <Button variant="secondary"
                                style={{float: "right"}}
                                // disabled={accepted_difference !== 0 || props.ladders_length !== 0}
                                onClick={() => {
                                    ready_list.sort(() => Math.random() - 0.5);
                                    for (let i = 0; i < props.places; i += 2) {
                                        putLadder(
                                            {
                                                "tournamentid": String(props.tournament.id),
                                                "inAtype": "R",
                                                "inA": String(ready_list[i].id),
                                                "inBtype": "R",
                                                "inB": String(ready_list[i + 1].id),
                                                "round": "1"
                                            }
                                        )
                                            .then(r => console.log(r))
                                    };


                                    /** TU PRZEKLEJ RUNDY 2+ **/

                                }

                                    // startTournament(props.calendar_list.id).then(r => console.log(r))
                                    //     .then(() => closeRegistrations(props.calendar_list.id).then(r => console.log(r)))

                                }>
                            Załóż turniej
                        </Button>
                    </Col>

                    {/** Załóż II rundę: **/}
                    <Col sm={3}>
                        <SetRounds {...props} accepted_difference={accepted_difference} current_round = {2} text={"Załóż II rundę"} tournament = {props.tournament}/>
                    </Col>
                    {/** Załóż III rundę: **/}
                    <Col sm={3}>
                        <SetRounds {...props} accepted_difference={accepted_difference} current_round = {3} text={"Załóż III rundę"} tournament = {props.tournament}/>
                    </Col>
                </Row>
            </> :null}
        </>
    )
}
export default SetTournament;