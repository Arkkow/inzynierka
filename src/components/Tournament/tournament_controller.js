// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GeoAlt, CalendarCheck } from "react-bootstrap-icons";

// CSS files
import cup_logo from "../../assets/cup.svg";
import {Container, Row, Col, Form, ButtonGroup} from "react-bootstrap";
import TournamentNavbar from "./navbar/tournament_navbar";
import {connect} from "react-redux";
import {Calendar_controller} from "../calendar/calendar_controller";
import {useEffect} from "react";


export const Tournament_controller = (props) => {
    const id = window.location.href.split('?')[1].split('=')[1]

    // useEffect((props.calendar_list === null?) => {props.handleDownloadCalendarCard(id,[])})
    // eslint-disable-next-line no-unused-expressions
    props.calendar_list.data.id === '1' ? props.handleDownloadCalendarCard(id): null

    return (
        <Container fluid style={{background: "#188FA7", minHeight: "64vh", paddingTop: "0%"}}>
            <Row className="justify-content-md-center" >
                <div>
                tournament
                </div>
                {/*{console.log("Hi")}*/}
                {/*{console.log(props.id)}*/}
                <Col sm={6} style={{paddingLeft: 0, paddingRight:0}}>
                    <Container>
                        <Row fluid style={{backgroundColor: "transparent"}}>
                            <Col sm={10} >
                                <TournamentNavbar/>
                            </Col>
                        </Row>
                        <Container style={{background: "white"}}>
                            <Row>
                                {/*<Button onClick={() => {props.handleDownloadCalendarCard(id);}}>id: {id}</Button>*/}
                            </Row>
                            <Row style={{borderBottom: "1px solid black", paddingLeft: "5%", paddingRight: "5%", marginTop: "0.25%", paddingTop: "0.5%"}}>

                                <h3>{props.calendar_list.name}</h3>

                            </Row>
                            <Row style={{borderBottom: "1px solid black", paddingLeft: "5%", paddingRight: "5%"}}>
                                <h4>Propadel, Warszawa</h4>
                            </Row>
                            <Row style={{paddingLeft: "5%", paddingRight: "5%"}}>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Od</h5>
                                    <div>
                                        28/05/2022
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Do</h5>
                                    <div>
                                        29/05/2022
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Wpisowe</h5>
                                    <div>
                                        80 zł/os
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Ranga</h5>
                                    <div>
                                        CHALLENGER
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>System turniejowy</h5>
                                    <div>
                                        Drabinka klasyczna
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Kategorie</h5>
                                    <div>
                                        <Button variant="success" disabled="true" style={{paddingTop: "0", paddingBottom: "0", marginTop: "1%"}}>OPEN</Button>
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>System turniejowy</h5>
                                    <div>
                                        Drabinka klasyczna
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Zapisy do</h5>
                                    <div>
                                        29/04/2022
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Czy rankingowy</h5>
                                    <div>
                                        TAK
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Dyrektor turnieju</h5>
                                    <div>
                                        <div>Adam Kowalski</div>
                                        <div>+00 123456789</div>
                                    </div>
                                </div>
                                <div style={{marginBottom: "1%"}}>
                                    <h5 style={{marginBottom:"0"}}>Dodatkowe informacje</h5>
                                    <div>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Cum sociis natoque penatibus et magnis dis. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Leo urna molestie at elementum eu facilisis sed. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl. Vitae congue mauris rhoncus aenean vel elit scelerisque. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Quisque sagittis purus sit amet volutpat. Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Morbi quis commodo odio aenean sed adipiscing diam donec.
                                    </div>
                                </div>
                            </Row>
                        </Container>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

// Przypisanie do Calendar_controller.props stanów
const mapStateToProps = (state) => {
    return {
        calendar_list: state.calendar_content.data,
        user: state.user_content.data,
        view: state.view_content.data
    }
}

//Wywołanie zmiany stanu (obsługa w store)
// Przekazanie data z API do stanu Calendar_controller
const mapDispatchToProps = (dispatch) => {
    const id = window.location.href.split('?')[1].split('=')[1]
    return {
        handleHref: () => {
            return dispatch({type: "SAVE_HREF_ID", payload: {data: id}})
        },

        handleDownloadCalendarCard: (id) => {
            //    API z kalendarza
            fetch('https://dragonmaster.pl/inz/' + "tournament" + "?id=" + id, {
                headers: {
                    Authorization: ("Bearer " + "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7"),
                },
                method: "GET",
            })
                .then((res) => res.json())
                .then( res => {
                        return dispatch({type: "DOWNLOAD_CALENDAR", payload: {data: res}});
                    }
                )
                .catch((err) => {console.log(err)});
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tournament_controller)