// General React imports
import * as React from "react";

// Project specific files
import {putLadder} from "../../../../../api/tournament/ladders_api";

// CSS files
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";
import SetRounds from "./set_rounds/set_rounds";
import {useEffect} from "react";
import {closeRegistrations} from "../../../../../api/tournament/tournament_registration_api";
import {startTournament} from "../../../../../api/tournament/tournament_CRUD_api";

export const SetTournament = (props) => {

    useEffect(() => {
        props.handleDownloadPlayers(props.tournament.id)

    },[])

    let accepted_count = props.pairs_list.pairs["ALL"].filter( (e) =>
        e.approval === "1");

    let accepted_difference = props.places - props.pairs_list.pairs["DONE"].length;

    function prepareTournamentFirstRound(places, pairs_list_done, round, inputType) {
        // console.log(pairs_list_done)
        for (let i = 0; i < places; i += 2){
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
        }
        return true
    }

    return (
        <>

            {props.user.role === "3"?
            <>
                <Row fluid="true" style={{backgroundColor: "transparent", marginTop: "2%", marginBottom: "2%", margin: "auto"}}>

                    {/** Zaproszonych par: **/}
                    <Col sm={3} style={{padding: 0}}>
                        <Button variant="outline-light" style={{ float: "right"}}>
                            Zaproszonych par: {props.pairs_list.pairs["ALL"].length}
                        </Button>
                    </Col>

                    {/** Zaakceptowanych par: **/}
                    <Col sm={5} style={{padding: 0}}>
                        <Button variant="outline-light" style={{ float: "right"}}>
                            Zaakceptowanych par: {accepted_count.length} / {props.places}
                        </Button>

                        {/** Warunek przejścia do kolejnej fazy turnieju **/}
                        {
                            // Jeżeli turniej jest pełen
                            accepted_count.length >= props.places &&
                            // Jeżeli turniej nie jest w odpowiednim stanie
                            props.tournament.state === 0 &&
                            // Jeżeli jesteś adminem lub organizatorem tego turnieju
                            ((props.user.role === "2" && props.user.id === props.tournament.creator) || props.user.role === "3")?
                                <>
                                    {
                                        closeRegistrations(props.tournament.id)
                                            .catch(err => console.log(err))
                                            .then(() => console.log("STATE 1"))
                                            .then(() => props.handleDownloadCalendarCard(props.tournament.id))
                                            .catch(err => console.log(err))
                                            .then(() => setTimeout(()=> props.handleDownloadCalendarCard(props.tournament.id), 2000))

                                            .then(() => startTournament(props.tournament.id))
                                            .catch(err => console.log(err))
                                            .then(() => console.log("STATE 2"))
                                            .then(() => props.handleDownloadCalendarCard(props.tournament.id))
                                            .catch(err => console.log(err))
                                            .then(() => setTimeout(()=> props.handleDownloadCalendarCard(props.tournament.id), 2000))

                                    }
                                </>
                                :null
                        }
                        {/*{*/}
                        {/*    // Jeżeli turniej jest pełen*/}
                        {/*    accepted_count.length >= props.places &&*/}
                        {/*    // Jeżeli turniej nie jest w odpowiednim stanie*/}
                        {/*    props.tournament.state === 1 &&*/}
                        {/*    // Jeżeli jesteś adminem lub organizatorem tego turnieju*/}
                        {/*    ((props.user.role === "2" && props.user.id === props.tournament.creator) || props.user.role === "3")?*/}
                        {/*        <>*/}
                        {/*            {*/}
                        {/*                startTournament(props.tournament.id)*/}
                        {/*                    .catch(err => console.log(err))*/}
                        {/*                    .then(() => console.log("STATE 2"))*/}
                        {/*                    .then(() => props.handleDownloadCalendarCard(props.tournament.id))*/}
                        {/*                    .catch(err => console.log(err))*/}
                        {/*            }*/}
                        {/*        </>*/}
                        {/*        :null*/}
                        {/*}*/}

                    </Col>

                    {/** Gotowych par: **/}
                    <Col sm={4}>
                        <Button variant="outline-light" style={{ float: "right"}}>
                            Gotowych par: {props.pairs_list.pairs["DONE"].length}
                        </Button>
                    </Col>
                </Row>
                <Row>



                    {/** Załóż turniej: **/}
                    <Col sm={3}>
                        <Button variant="secondary"
                                style={{float: "right"}}
                                disabled={accepted_difference !== 0 || props.ladders_length !== 0}
                                onClick={

                            () => {
                                    props.pairs_list.pairs["DONE"].sort(() => Math.random() - 0.5);
                                    for (let i = 0; i < props.places; i += 2) {
                                        putLadder(
                                            {
                                                "tournamentid": String(props.tournament.id),
                                                "inAtype": "R",
                                                "inA": String(props.pairs_list.pairs["DONE"][i].id),
                                                "inBtype": "R",
                                                "inB": String(props.pairs_list.pairs["DONE"][i + 1].id),
                                                "round": "1"
                                            }
                                        )
                                            .then(r => console.log(r))
                                    }

                                }
                                }>
                            Załóż turniej
                        </Button>
                    </Col>

                    {/** Załóż II rundę: **/}
                    <Col sm={3}>
                        <SetRounds {...props} accepted_difference={accepted_difference} current_round = {2} text={"Załóż II rundę"} tournament = {props.tournament} isEmpty = {props.ladders_list.ladders[1].length === 0}/>
                    </Col>
                    {/** Załóż III rundę: **/}
                    <Col sm={3}>
                        <SetRounds {...props} accepted_difference={accepted_difference} current_round = {3} text={"Załóż III rundę"} tournament = {props.tournament} isEmpty = {props.ladders_list.ladders[2].length === 0}/>
                    </Col>
                    {props.places === 16?
                        <Col sm={3}>
                            <SetRounds {...props} accepted_difference={accepted_difference} current_round = {4} text={"Załóż IV rundę"} tournament = {props.tournament} isEmpty = {props.ladders_list.ladders[3].length === 0}/>
                        </Col>:null
                    }
                </Row>

            </> :null}
        </>
    )
}
export default SetTournament;