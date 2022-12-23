import Button from "react-bootstrap/Button";
import {putLadder} from "../../../../../api/tournament/ladders_api";
import * as React from "react";

export const SetRounds = (props) => {

    let ready_list_next = props.ladders_list.ladders;

    return (
        <Button variant="secondary"
                style={{float: "right"}}
                disabled={props.accepted_difference !== 0 || props.ladders_length === 0}
                onClick={() => {

                    // FOR ALL ROUNDS >=2
                    // for (let round = 2; round <= Math.log2( props.places ); round ++) {

                    // GET proper ladders to PUT further (so from previous round)
                    // getladders to props, and then from props to ready_list_next

                    props.handleDownloadLadders(props.tournament.id)

                    ready_list_next = props.ladders_list.ladders
                        .filter((e) => e.round_number === String(props.current_round-1)).sort();
                    console.log(ready_list_next);


                    // PUT wszystkie drabinki główne
                    for (let i = 0; i < props.places/(2**(props.current_round-1)); i += 2) {
                        putLadder(
                            {
                                "tournamentid": String(props.tournament.id),
                                "inAtype": "W",
                                "inA": String(ready_list_next[i].id),
                                "inBtype": "W",
                                "inB": String(ready_list_next[i + 1].id),
                                "round": String(props.current_round)
                            }
                        )
                        .then(r => console.log(r))

                        // PUT drabinki przegranych
                        if (props.tournament.typeOfLadder === "DRABINKA KLASYCZNA") {
                            putLadder(
                                {
                                    "tournamentid": String(props.tournament.id),
                                    "inAtype": "L",
                                    "inA": String(ready_list_next[i].id),
                                    "inBtype": "L",
                                    "inB": String(ready_list_next[i + 1].id),
                                    "round": String(props.current_round)
                                }
                            )
                                .then(r => console.log(r))
                        }

                    }
                }
                }>
            {props.text}
        </Button>
    )
}
export default SetRounds