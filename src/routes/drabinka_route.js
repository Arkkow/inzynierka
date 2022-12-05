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
import {getladders} from "../components/api/api.js"
export default function Drabinka () {
		  const [drabinka, setDrabinka] = useState({"fetched":false,data:[]});
	  if(drabinka.fetched === false){
		  getladders(document.location.href.split("?")[1].split("=")[1]).then((dane)=>{setDrabinka({"fetched":true,data:dane});})
	  }
		
    return (
        <Container fluid style={{background: "#c2d1b8", minHeight: "94vh", paddingTop: "2%"}}>
            <Row className="justify-content-md-center">
<Row className="justify-content-md-center">
            <Col sm={6} >
                {drabinka.fetched === false ?
                  <h5>no results available</h5> :
                  drabinka.data.map((card)=>(
                            <Card border={"dark"} style={{ minWidth: '40%', margin: "2%", padding: "2%"}} >
            <Container fluid="md">
                <Row>
				{`${drabinka.id}`}

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