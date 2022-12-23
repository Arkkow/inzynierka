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

export default function TokenRoute () {
    let token = String(window.location.href.split('?')[1].split('=')[1])

    useEffect(() =>
    {
        postToken(token).then(r => console.log(r));
    }, [])

    return (
        <Container fluid="true" style={{background: "#c2d1b8", minHeight: "94vh", paddingTop: "2%"}}>
            <Row className="justify-content-md-center">
                <Row className="justify-content-md-center">
                    <Col sm={6} style={{background: "white"}}>
                        <h5>
                            Twój mail został zweryfikowany, teraz możesz się zalogować
                        </h5>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
};