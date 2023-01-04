// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import '../styles/index.css';
import '../styles/App.css';
import {useEffect} from "react";
import {postToken} from "../components/api/user_interaction/user_api";
import Button from "react-bootstrap/Button";

export default function TokenRoute () {
    let token = String(window.location.href.split('?')[1].split('=')[1])

    useEffect(() =>
    {
        postToken(token).then(r => console.log(r));
    }, [])

    return (
        <Container fluid="true" style={{background: "#689F82", minHeight: "94vh", paddingTop: "2%"}}>
            <Row className="justify-content-md-center">
                <Row className="justify-content-md-center">
                    <Col sm={4} style={{display:"flex", justifyContent:"center"}}>
                        <my_h4 style={{backgroundColor:"white", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"10px", height:"50px", minWidth:"560px"}}>
                            Twój mail został zweryfikowany, możesz się już zalogować
                        </my_h4>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
};