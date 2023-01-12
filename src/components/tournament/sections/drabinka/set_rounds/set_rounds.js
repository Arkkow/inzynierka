import Button from "react-bootstrap/Button";
import {putLadder} from "../../../../../api/tournament/ladders_api";
import * as React from "react";

export function SetRounds(props) {

    let ready_list_next = props.ladders_list.ladders[props.current_round-1].sort();

    console.log(ready_list_next)
    console.log(props.tournament.id)
    let num_of_matches = 0;

    // num_of_matches = props.places;

    if(props.tournament.typeOfLadder === "DRABINKA O MIEJSCA"){
        num_of_matches = props.places/2;
    }else {
        num_of_matches = props.places/(2**(props.current_round-1))
    }

    return (
        <>
        <Button variant="secondary"
                style={{float: "right"}}
                disabled={props.accepted_difference !== 0 || props.ladders_length === 0 || props.isEmpty === true || props.ladders_list.ladders[props.current_round].length !== 0}
                onClick={async () => {

                    // FOR ALL ROUNDS >=2
                    // for (let round = 2; round <= Math.log2( props.places ); round ++) {

                    // GET proper ladders to PUT further (so from previous round)
                    // getladders to props, and then from props to ready_list_next

                    await props.handleDownloadLadders(props.tournament.id)

                    // PUT wszystkie drabinki główne
                    for (let i = 0; i < num_of_matches; i += 2) {
                        await putLadder(
                            // console.log(
                            {
                                "tournamentid": String(props.tournament.id),
                                "inAtype": "W",
                                "inA": String(ready_list_next[i].id),
                                "inBtype": "W",
                                "inB": String(ready_list_next[i + 1].id),
                                "round": String(ready_list_next[i].round_number + "W")
                            }
                        )
                            .then(r => console.log(r))
                    } // Koniec for

                    console.log("hi!!!")
                    console.log(props.tournament.typeOfLadder === "DRABINKA O MIEJSCA")

                    if (props.tournament.typeOfLadder === "DRABINKA O MIEJSCA") {
                        // PUT wszystkie drabinki przegranych
                        for (let i = 0; i < num_of_matches; i += 2) {
                            await putLadder(
                                {
                                    "tournamentid": String(props.tournament.id),
                                    "inAtype": "L",
                                    "inA": String(ready_list_next[i].id),
                                    "inBtype": "L",
                                    "inB": String(ready_list_next[i + 1].id),
                                    "round": String(ready_list_next[i].round_number + "L")
                                }
                            )
                                .then(r => console.log(r))
                        } // Koniec for
                    }
                } //Koniec funkcji "OnClick"
                }>
            {props.text}
        </Button>
        </>
    )
}
export default SetRounds