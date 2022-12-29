// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import ZapisyCard from "./zapisy_card/zapisy_card";
import {getUser} from '../../../api/user_interaction/user_api.js';
import { useState }  from 'react';
import SetTournament from "./set_tournament/set_tournament";


export const Zapisy = (props) => {

    const [user, setUser] = useState({"fetched":false,data:[]});
	  if(user.fetched === false){
		  getUser().then((dane)=>{setUser({"fetched":true,data:dane});})
	  }

    return (
        <Col sm={6} >
            <Container fluid="true" style={{minHeight: "64vh", paddingTop: "0%"}}>
                <Row className="justify-content-md-center" >
                    <Col sm={12} style={{alignItems:"center", justifyContent:"center"}}>
                        <Row>
                            <SetTournament
                                {...props}
                                tournament = {props.calendar_list}
                                places = {props.calendar_list.places}
                                pairs_list = {props.pairs_list}
                                ladders_length = {props.ladders_list.ladders["ALL"].length}
                            />

                        </Row>
                        <Row style={{background: "white", marginTop:"10px", borderRadius:"10px", width:"100%"}}>

                            {props.role === "default" || localStorage.getItem("token") === null ?
                                <my_h4 style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", color: "var(--black)"}}>
                                    Zaloguj się, aby zobaczyć zapisanych uczestników
                                </my_h4>:

                                props.pairs_list.pairs["ALL"].length === 0 ?
                                    <my_h4 style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"20px", color: "var(--black)"}}>
                                        Na ten turniej nie ma jeszcze zapisanych użytkowników
                                    </my_h4> :

                                    <>
                                        {props.pairs_list.pairs["ALL"].filter((e) => e.partner === props.user.id || e.userid === props.user.id).map((card)=>(
                                            <ZapisyCard key={card.id} {...card} user = {props.user} view = {props.view}/>
                                        ))}
                                        {props.pairs_list.pairs["ALL"].filter((e) => e.partner !== props.user.id || e.userid !== props.user.id).map((card)=>(
                                            <ZapisyCard key={card.id} {...card} user = {props.user} view = {props.view}/>
                                        ))}
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