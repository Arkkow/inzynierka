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

    let numberOfRounds = Math.log2(props.places)

    return (
        <>
            {props.user.role === "3" || (props.user.role === "2" && props.calendar_list.creator === props.user.id)?
                /** Załóż turniej: **/
                <>
                    {console.log(props)}
                    <Col sm={12/numberOfRounds} style={{display: "flex"}}>
                        {/** Warunek przejścia do kolejnej fazy turnieju **/}
                            <Button variant="success"
                                    style={{margin: "auto", marginBottom:"10px", fontFamily: 'Montserrat',
                                        fontWeight: "600",
                                        fontSize: "18px",
                                        lineHeight: "25px", paddingRight:"15px", paddingLeft:"15px"}}
                                    disabled={accepted_difference !== 0 || props.ladders_length !== 0}
                                    onClick={ () =>
                                        prepareTournamentRound({...props},
                                            props.places, props.pairs_list.pairs["DONE"], 1, "R")
                                    }>
                                WYGENERUJ I RUNDĘ
                            </Button>
                    </Col>
                    <Col sm={12/numberOfRounds} style={{display: "flex", marginBottom:"10px"}}>

                            <SetRounds {...props} accepted_difference={accepted_difference} current_round = {2}
                                       text={"WYGENERUJ II RUNDĘ"} tournament = {props.tournament}
                                       isEmpty = {props.ladders_list.ladders[1].length === 0}/>
                    </Col>
                    <Col sm={12/numberOfRounds} style={{display: "flex", marginBottom:"10px"}}>
                            <SetRounds {...props} accepted_difference={accepted_difference} current_round = {3}
                                       text={"WYGENERUJ III RUNDĘ"} tournament = {props.tournament}
                                       isEmpty = {props.ladders_list.ladders[2].length === 0}/>
                    </Col>
                    <Col sm={12/numberOfRounds} style={{display: "flex", marginBottom:"10px"}}>
                            {props.places === 16?
                                    <SetRounds {...props} accepted_difference={accepted_difference} current_round = {4} text={"WYGENERUJ IV RUNDĘ"} tournament = {props.tournament} isEmpty = {props.ladders_list.ladders[3].length === 0}/>
                                :null
                            }

                    </Col>
                </>
             :null}
        </>
    )
}
export default SetTournamentRounds;