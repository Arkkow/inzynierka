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

    let ready_list_next = props.ladders_list.ladders;

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
                        // disabled={accepted_difference !== 0 || props.ladders_length !== 0}
                        onClick={() => {
                            console.log("RAZ");
                            ready_list.sort(() => Math.random() - 0.5);
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
                            };

                            console.log("DWA");


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
                <Button variant="secondary"
                        style={{float: "right"}}
                        disabled={accepted_difference !== 0 || props.ladders_length === 0}
                        onClick={() => {

                            // FOR ALL ROUNDS >=2
                            for (let round = 2; round <= Math.log2( props.places ); round ++) {

                                // GET proper ladders to PUT further (so from previous round)
                                // getladders to props, and then from props to ready_list_next

                                props.handleDownloadLadders(props.tournamentID);

                                ready_list_next = props.ladders_list.ladders
                                    .filter((e) => e.round_number === String(round-1));
                                console.log(ready_list_next);


                                // PUT all ladders in round
                                for (let i = 0; i < props.places/(2**(round-1)); i += 2) {
                                    console.log("cycle: " + i);
                                    putLadder
                                    // console.log
                                        (
                                            {
                                                "tournamentid": String(props.tournamentID),
                                                "inAtype": "W",
                                                "inA": String(ready_list_next[i].id),
                                                "inBtype": "W",
                                                "inB": String(ready_list_next[i + 1].id),
                                                "round": String(round)
                                            }
                                        )
                                        .then(r => console.log(r))
                                }
                                setTimeout(1000);
                            };
                        }
                        }>
                    Załóż II rundę
                </Button>
            </Col>
        </Row>

    )
}
export default SetTournament;