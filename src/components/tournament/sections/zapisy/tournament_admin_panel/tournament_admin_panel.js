// General React imports
import * as React from "react";

// Project specific files
import {putLadder} from "../../../../../api/tournament/ladders_api";

// CSS files
import Button from "react-bootstrap/Button";
import {ButtonGroup, Col, Row} from "react-bootstrap";
import {useEffect} from "react";
import {closeRegistrations} from "../../../../../api/tournament/tournament_registration_api";
import {startTournament} from "../../../../../api/tournament/tournament_CRUD_api";

export const TournamentAdminPanel = (props) => {

    useEffect(() => {
        props.handleDownloadPlayers(props.tournament.id)

    },[])

    let accepted_count = props.pairs_list.pairs["ALL"].filter( (e) =>
        e.approval === "1");


    return (
        <>

            {props.user.role === "3"?
            <>
                <Row>
                    <Col lg={9}>
                        <ButtonGroup style={{backgroundColor: "transparent", marginTop: "2%", marginBottom: "2%", margin: "auto"}}>
                            {/** Zaproszonych par: **/}
                                <Button variant="outline-light" style={{ float: "right"}}>
                                    Zaproszonych par: {props.pairs_list.pairs["ALL"].length}
                                </Button>
                            {/** Zaakceptowanych par: **/}
                                <Button variant="outline-light" style={{ float: "right"}}>
                                    Zaakceptowanych par: {accepted_count.length} / {props.places}
                                </Button>

                            {/** Opłaconych zapisów: **/}
                                <Button variant="outline-light" style={{ float: "right"}}>
                                    Opłaconych zapisów: {props.pairs_list.pairs["DONE"].length} / {props.places}
                                </Button>
                        </ButtonGroup>
                    </Col>

                    {/** Zakocz zapisy **/}

                    <Col lg={3}>
                        <Button
                            variant="secondary"
                            disabled={props.tournament.state ===2}
                            onClick={() =>{
                                if( props.pairs_list.pairs["DONE"].length === props.places &&
                                    // Jeżeli turniej nie jest w odpowiednim stanie
                                    props.tournament.state === 0 &&
                                    // Jeżeli jesteś adminem lub organizatorem tego turnieju
                                    ((props.user.role === "2" && props.user.id === props.tournament.creator) || props.user.role === "3"))
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
                                }else {
                                    alert("Turniej nie jest jeszcze gotowy do rozpoczęcia")
                                }

                            }}
                        >Zakończ zapisy</Button>
                    </Col>
                </Row>
            </> :null}
        </>
    )
}
export default TournamentAdminPanel;