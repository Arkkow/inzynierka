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

            {props.user.role === "3" && props.tournament.state !== 3?
            <>
                <Row>
                    <Col lg={12} style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"white",
                        paddingTop:"10px", paddingBottom:"10px", marginLeft:"12px", borderRadius:"30px", marginBottom:"10px", border:"solid", borderColor:"var(--medium_grey)", borderWidth:"2px"}}>
                        <ButtonGroup style={{backgroundColor: "white", marginTop: "2%", marginBottom: "2%", margin: "auto"}}>
                            {/** Zaproszonych par: **/}
                                <Button variant="outline-dark" disabled="true" style={{ float: "right"}}>
                                   <paragraph>Zaproszonych par: {props.pairs_list.pairs["ALL"].length}</paragraph>
                                </Button>
                            {/** Zaakceptowanych par: **/}
                                <Button variant="outline-dark" disabled="true" style={{ float: "right"}}>
                                   <paragraph>Zaakceptowanych par: {accepted_count.length} / {props.places}</paragraph>
                                </Button>

                            {/** Opłaconych zapisów: **/}
                                <Button variant="outline-dark" disabled="true" style={{ float: "right"}}>
                                    <paragraph >Opłaconych zapisów: {props.pairs_list.pairs["DONE"].length} / {props.places}</paragraph>
                                </Button>
                        </ButtonGroup>

                    {/** Zakocz zapisy **/}

                        <Button
                            variant="success"
                            disabled={( props.pairs_list.pairs["DONE"].length !== props.places ||
                                // Jeżeli turniej nie jest w odpowiednim stanie
                                props.tournament.state !== 0 ||
                                // Jeżeli jesteś adminem lub organizatorem tego turnieju
                                ((props.user.role !== "2" || props.user.id !== props.tournament.creator) && props.user.role !== "3"))}
                            style={{marginTop:"10px",
                                maxWidth:"200px",
                                fontFamily: 'Montserrat',
                                fontWeight: "600",
                                fontSize: "18px",
                                lineHeight: "25px",
                                color: "white",
                                borderRadius: "15px",
                                paddingRight: "13px",
                                paddingLeft: "13px",
                                paddingBottom: "6px",
                                paddingTop: "6px",}}


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
                        >
                          ZAKOŃCZ ZAPISY
                        </Button>
                    </Col>
                </Row>
            </> :null}
        </>
    )
}
export default TournamentAdminPanel;