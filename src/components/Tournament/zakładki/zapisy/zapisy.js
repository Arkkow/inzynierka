// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';

// CSS files
import {Container, Row, Col} from "react-bootstrap";
import ZapisyCard from "./features/zapisy_card";


export const Zapisy = (props) => {
    return (
        <Container fluid style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
            {/*<div>DIV: {props.pairs_list.data}</div>*/}
            <Row className="justify-content-md-center" >
                <Col sm={12} style={{paddingLeft: 0, paddingRight:0}}>
                    <Container>
                        <Row fluid style={{backgroundColor: "transparent", marginTop: "1%", marginBottom: "0.5%"}}>
                            <Col sm={4} style={{paddingRight: 0}}>
                                <Button variant="outline-light" style={{ float: "right"}}> Zaakceptowanych par: 8</Button>
                            </Col>
                            <Col sm={3} style={{paddingRight:0}}>
                                <Button variant="secondary" style={{float: "right"}}>Wygeneruj drabinkę</Button>
                            </Col>
                        </Row>
                        <Row style={{background: "white"}}>
                            DIV: &nbsp;
                            {props.pairs_list.pairs.length}
                            &nbsp;

                            {props.pairs_list.pairs.length === 0 ?
                                <h5>no results available</h5> :
                                props.pairs_list.pairs.map((card)=>(
                                    <ZapisyCard {...card}/>
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