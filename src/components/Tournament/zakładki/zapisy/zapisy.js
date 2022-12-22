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
        <Col sm={6}>
            <Container fluid="true" style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
                <Row className="justify-content-md-center" >
                    <Col sm={12} style={{paddingLeft: 0, paddingRight:0}}>
                        <Container>

                            <SetTournament
                                {...props}
                                tournamentID = {props.calendar_list.id}
                                places = {props.calendar_list.places}
                                pairs_list = {props.pairs_list}
                                ladders_length = {props.ladders_list.ladders.length}
                            />

                            <Row style={{background: "white"}}>

                                {props.pairs_list.pairs.length === 0 ?
                                    <h5>no results available</h5> :
                                    props.pairs_list.pairs.map((card)=>(
                                        <ZapisyCard key={card.id} {...card} user = {props.user} view = {props.view}/>
                                    ))
                                }
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Col>
    );
}

export default Zapisy;