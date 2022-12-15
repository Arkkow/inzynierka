// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import ZapisyCard from "./zapisy_card/zapisy_card";
import {getUser} from '../../../api/user_interaction/user_api.js';
import { useState }  from 'react';


export const Zapisy = (props) => {
			  const [user, setUser] = useState({"fetched":false,data:[]});
	  if(user.fetched === false){
		  getUser().then((dane)=>{setUser({"fetched":true,data:dane});})
	  }
    return (
        <Container fluid="true" style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
            {/*<div>DIV: {props.pairs_list.data}</div>*/}
            <Row className="justify-content-md-center" >
                <Col sm={12} style={{paddingLeft: 0, paddingRight:0}}>
                    <Container>
                        <Row fluid="true" style={{backgroundColor: "transparent", marginTop: "1%", marginBottom: "0.5%"}}>
                            <Col sm={4} style={{paddingRight: 0}}>
                                <Button variant="outline-light" style={{ float: "right"}}> Zaakceptowanych par: {props.ladders_list.ladders.length}</Button>
                            </Col>
                            <Col sm={3} style={{paddingRight:0}}>
                                <Button variant="secondary" style={{float: "right"}}>Wygeneruj drabinkę</Button>
                            </Col>
                        </Row>
                        <Row style={{background: "white"}}>
                            {/*DIV: &nbsp;*/}
                            {/*{props.pairs_list.pairs.length}*/}
                            {/*&nbsp;*/}

                            {props.pairs_list.pairs.length === 0 ?
                                <h5>no results available</h5> :
                                props.pairs_list.pairs.map((card)=>(
                                    <ZapisyCard {...card} user = {props.user} view = {props.view}/>
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