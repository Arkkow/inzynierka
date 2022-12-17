// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import ZapisyCard from "./zapisy_card/zapisy_card";
import {getUser} from '../../../api/user_interaction/user_api.js';
import { useState }  from 'react';
import {putLadder} from "../../../api/tournament/ladders_api";


export const Zapisy = (props) => {
    const [user, setUser] = useState({"fetched":false,data:[]});
	  if(user.fetched === false){
		  getUser().then((dane)=>{setUser({"fetched":true,data:dane});})
	  }

    let ready_list = props.pairs_list.pairs.filter( (e) =>
        e.paymentstatus === "DONE" && e.paymentstatus2 === "DONE" );

    return (
        <Container fluid="true" style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
            {/*<div>DIV: {props.pairs_list.data}</div>*/}
            <Row className="justify-content-md-center" >
                <Col sm={12} style={{paddingLeft: 0, paddingRight:0}}>
                    <Container>
                        <Row fluid="true" style={{backgroundColor: "transparent", marginTop: "1%", marginBottom: "0.5%"}}>
                            <Col sm={5} style={{paddingRight: 0}}>
                                <Button variant="outline-light" style={{ float: "right"}}>
                                    Zaakceptowanych par: {ready_list.length}
                                </Button>
                            </Col>
                            <Col sm={4} style={{paddingRight:0}}>
                                <Button variant="secondary" style={{float: "right"}}
                                        onClick={() => {
                                            ready_list.sort(() => Math.random() - 0.5)
                                            for (let i = 0; i < props.calendar_list.places; i += 2) {
                                                putLadder(
                                                    {
                                                        "tournamentid": String(props.calendar_list.id),
                                                        "inAtype": "R",
                                                        "inA": String(ready_list[i].id),
                                                        "inBtype": "R",
                                                        "inB": String(ready_list[i + 1].id),
                                                        "round": "0"
                                                    }
                                                ).then(r => console.log(r))
                                            }
                                        }
                                }>
                                    Send to Jesus
                                </Button>
                            </Col>
                        </Row>
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
    );
}

export default Zapisy;