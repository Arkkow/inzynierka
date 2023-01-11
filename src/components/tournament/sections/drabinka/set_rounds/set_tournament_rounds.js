// General React imports
import * as React from "react";
import {useEffect} from "react";

// Project specific files

// CSS files
import Button from "react-bootstrap/Button";
import {ButtonGroup, Col} from "react-bootstrap";
import {putLadder} from "../../../../../api/tournament/ladders_api";
import SetRounds from "./set_rounds";

export const SetTournamentRounds = (props) => {

    useEffect(() => {
        props.handleDownloadPlayers(props.tournament.id)

    },[])

    let accepted_difference = props.places - props.pairs_list.pairs["DONE"].length;

    function prepareTournamentRound(props, places, pairs_list_done, round, inputType) {
        // console.log(pairs_list_done)
        // for (let i = 0; i < places; i += 2){
        pairs_list_done.sort(() => Math.random() - 0.5);
        for (let i = 0; i < places; i += 2) {
            putLadder(
                {
                    "tournamentid": String(props.tournament.id),
                    "inAtype": inputType,
                    "inA": String(pairs_list_done[i].id),
                    "inBtype": inputType,
                    "inB": String(pairs_list_done[i + 1].id),
                    "round": String(round)
                }
            )
                .catch(err => console.log(err))
                .then(r => console.log(r))
        }
        // }
        return 0
    }

    return (
        <>
            {props.user.role === "3"?
                /** Załóż turniej: **/
                <Col sm={4}>
                    {/** Warunek przejścia do kolejnej fazy turnieju **/}
                    <ButtonGroup>
                        <Button variant="secondary"
                                style={{float: "right"}}
                                disabled={accepted_difference !== 0 || props.ladders_length !== 0}
                                onClick={ () =>
                                    prepareTournamentRound({...props},
                                        props.places, props.pairs_list.pairs["DONE"], 1, "R")
                                }>
                            Wygeneruj I rundę
                        </Button>

                        <SetRounds {...props} accepted_difference={accepted_difference} current_round = {2}
                                   text={"Wygeneruj II rundę"} tournament = {props.tournament}
                                   isEmpty = {props.ladders_list.ladders[1].length === 0}/>

                        <SetRounds {...props} accepted_difference={accepted_difference} current_round = {3}
                                   text={"Wygeneruj III rundę"} tournament = {props.tournament}
                                   isEmpty = {props.ladders_list.ladders[2].length === 0}/>

                        {props.places === 16?
                                <SetRounds {...props} accepted_difference={accepted_difference} current_round = {4} text={"Załóż IV rundę"} tournament = {props.tournament} isEmpty = {props.ladders_list.ladders[3].length === 0}/>
                            :null
                        }

                    </ButtonGroup>
                </Col>
             :null}
        </>
    )
}
export default SetTournamentRounds;