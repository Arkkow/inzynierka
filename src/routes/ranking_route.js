// General React imports
import * as React from 'react';

// Project specific files
import { useState }  from 'react';
import {getleaderboard} from "../components/api/api.js"


// CSS files
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import '../styles/index.css';
import '../styles/App.css';
import CalendarPhoto from "../components/calendar/calendar_card/assets/calendarPhoto";
import RangTick from "../components/common/buttons/rang_tick";
import InfoPanel from "../components/calendar/calendar_card/assets/info_panel";
import TournamentRanked from "../components/calendar/calendar_card/features/conditionals/calendar_tournament_ranked";

export default function RankingRoute () {
    const [cart, setCart] = useState({"fetched":false,data:[]});
    if(cart.fetched === false){
        getleaderboard().then((dane)=>{setCart({"fetched":true,data:dane});})
    }

    let x = 5;
    x = x + 1;
    return (
        <Container fluid="true" style={{background: "#689F82", minHeight: "94vh", paddingTop: "2%"}}>
            {/*<Row className="justify-content-md-center" style={{display:"flex", justifyContent:"center"}}>*/}
            {/*<Col sm={3} >*/}
            {/*    <Card style={{ minWidth: '40%', margin: "1.5%", padding: "2%", borderRadius:"10px", borderColor:"var(--medium_grey)"}} >*/}
            <my_h1 style={{display:"flex", justifyContent:"center", alignItems:"center", marginBottom:"20px"}}>RANKING</my_h1>
            {/*    </Card>*/}
            {/*</Col>*/}
            {/*</Row>*/}

            {/*<Row className="justify-content-md-center" style={{display:"flex", justifyContent:"center"}}>*/}
            {/*<Col sm={6} >*/}
            {/*<Card style={{ minWidth: '40%', margin: "1.5%", padding: "2%", borderRadius:"20px", borderColor:"var(--medium_grey)"}} >*/}
            {/*    <Container fluid="md">*/}
            {/*        <Row>*/}
            {/*            <Col sm={1} style={{display:"flex", justifyContent:"center"}}>*/}
            {/*                <my_h3>#</my_h3>*/}
            {/*            </Col>*/}
            {/*            <Col sm={8} style={{display:"flex", justifyContent:"left"}}>*/}
            {/*                <my_h3>IMIĘ I NAZWISKO</my_h3>*/}
            {/*            </Col>*/}
            {/*            <Col sm={3} style={{display:"flex", justifyContent:"center"}}>*/}
            {/*                <my_h3>PUNKTY</my_h3>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Container>*/}
            {/*</Card>*/}
            {/*</Col>*/}
            {/*</Row>*/}
            <Row className="justify-content-md-center">
                <Row className="justify-content-md-center" style={{display:"flex", justifyContent:"center"}}>
                    <Col sm={6} >
                        {cart.fetched === false ?
                            <my_h4>Ładowanie...</my_h4> :
                            cart.data.map((card, index)=>(
                                <Card style={{ minWidth: '40%', margin: "1.5%", padding: "2%", borderRadius:"20px", borderColor:"var(--medium_grey)"}} >
                                    <Container fluid="md">
                                        <Row>
                                            <Col sm={1} style={{display:"flex", justifyContent:"center"}}>
                                                <my_h4 style={{fontWeight:"400"}}>{`${index + 1}.`}</my_h4>
                                            </Col>
                                            <Col sm={8} style={{display:"flex", justifyContent:"left"}}>
                                                <my_h4 style={{fontWeight:"400"}}>{`${card.surname} ${card.name}`} </my_h4>
                                            </Col>
                                            <Col sm={3} style={{display:"flex", justifyContent:"center"}}>
                                                <my_h4 style={{fontWeight:"400"}}>{`${card.ranking}`}</my_h4>
                                            </Col>
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