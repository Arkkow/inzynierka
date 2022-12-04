// General React imports
import * as React from 'react';

// Project specific files
import { useState }  from 'react';
import Container from "react-bootstrap/Container";
import {Col, Row,Form,Button } from "react-bootstrap";
import Card from 'react-bootstrap/Card';

// CSS files
import '../styles/index.css';
import '../styles/App.css';
import {getleaderboard} from "../components/api/api.js"
export default function RankingRoute () {
		  const [cart, setCart] = useState({"fetched":false,data:[]});
	  if(cart.fetched === false){
		  getleaderboard().then((dane)=>{setCart({"fetched":true,data:dane});})
	  }
		
    return (
        <Container fluid style={{background: "#c2d1b8", minHeight: "94vh", paddingTop: "2%"}}>
            <Row className="justify-content-md-center">
<Row className="justify-content-md-center">
            <Col sm={6} >
                {cart.fetched === false ?
                  <h5>no results available</h5> :
                  cart.data.map((card)=>(
                            <Card border={"dark"} style={{ minWidth: '40%', margin: "2%", padding: "2%"}} >
            <Container fluid="md">
                <Row>
				{`${card.name} ${card.name} points: ${card.ranking}`}

                </Row>
            </Container>
        </Card>
                    ))
                }
            </Col>
        </Row>
            </Row>
        </Container>

    )

};