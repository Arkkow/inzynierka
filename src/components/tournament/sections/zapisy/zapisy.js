// General React imports
import * as React from 'react';
import {useEffect, useState} from 'react';

// Project specific files
import ZapisyCard from "./zapisy_card/zapisy_card";
import {getUser} from "../../../../api/user_interaction/user_api";

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import TournamentAdminPanel from "./tournament_admin_panel/tournament_admin_panel";

export const Zapisy = (props) => {

    useEffect(() => {
        props.handleDownloadPlayers(props.calendar_list.id);
        props.handleDownloadLadders(props.calendar_list.id);
        }
        ,[])

    const [user, setUser] = useState({"fetched":false,data:[]});
	  if(user.fetched === false){
		  getUser().then((dane)=>{setUser({"fetched":true,data:dane});})
	  }

    return (
        <Col lg={6} >
            <Container fluid="true" style={{minHeight: "64vh", paddingTop: "0%"}}>
                <Row className="justify-content-md-center" >
                    <Col sm={12} style={{}}>

                        {props.calendar_list.state !== 3?
                            <Row>
                                <TournamentAdminPanel
                                    {...props}
                                    tournament = {props.calendar_list}
                                    places = {props.calendar_list.places}
                                    pairs_list = {props.pairs_list}
                                    ladders_length = {props.ladders_list.ladders["ALL"].length}
                                    refreshProps = {() => props.refreshProps({...props}, props.id)}
                                />

                            </Row>:null}

                        <Row style={{background: "white", marginTop:"10px", borderRadius:"10px", width:"100%", marginLeft:"0px"}}>

                            {props.role === "default" || localStorage.getItem("token") === null ?

                                    <my_h4 style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", color: "var(--black)"}}>
                                        Zaloguj się, aby zobaczyć zapisanych uczestników
                                    </my_h4>
                                :

                                props.pairs_list.pairs["ALL"].length === 0 ?

                                    <my_h4 style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", color: "var(--black)"}}>
                                        Na ten turniej nie ma jeszcze zapisanych użytkowników
                                    </my_h4>
                                    :
                                    <>
                                        <>
                                            <Card style={{ width: '95%', margin: "auto", marginTop: "1%", marginBottom: "1%", padding: "2%", textAlign: "center", background: "#0B4D39"}} >
                                                <my_h3 style={{color:"white", lineHeight:"22px"}}>MOJE ZAPISY</my_h3>
                                            </Card>
                                            <>
                                                {props.pairs_list.pairs["ALL"]
                                                    .filter((e) => e.partner === props.user.id || e.userid === props.user.id)
                                                    .sort((a, b) => b.rankingsum - a.rankingsum)
                                                    .map((card)=>(
                                                        <ZapisyCard key={card.id} {...card} user = {props.user} view = {props.view} state ={props.calendar_list.state} refreshProps = {() => props.refreshProps({...props}, props.id)}
                                                                    isFull = {props.pairs_list.pairs["ALL"].filter( (e) => e.approval === "1").length < props.places } />
                                                    ))}
                                            </>
                                        </>
                                        <>
                                            <Card style={{ width: '95%', margin: "auto", marginTop: "1%", marginBottom: "1%", padding: "2%", textAlign: "center", background: "#0B4D39"}} >
                                                <my_h3 style={{color:"white", lineHeight:"22px"}}>WSZYSTKIE ZAPISY</my_h3> {console.log(props.calendar_list.state)}
                                            </Card>
                                            <>
                                                {props.pairs_list.pairs["ALL"]
                                                    .sort((a, b) => b.rankingsum - a.rankingsum)
                                                    .map((card)=>(
                                                        <ZapisyCard key={card.id} {...card} user = {props.user} view = {props.view} state ={props.calendar_list.state} refreshProps = {() => props.refreshProps({...props}, props.id)}
                                                                    isFull = {props.pairs_list.pairs["ALL"].filter( (e) => e.approval === "1").length < props.places} />
                                                    ))}
                                            </>
                                        </>
                                    </>
                            }
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Col>
    );
}

export default Zapisy;