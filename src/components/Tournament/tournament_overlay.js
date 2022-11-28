import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Col, Container, Row} from "react-bootstrap";
import RangTick from "../common/Buttons/rang_tick";
import InfoPanel from "../common/info_panel";

export const TournamentInfo = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                ZAPISZ SIĘ
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.name} <RangTick {...props}/> </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InfoPanel {...props}/>
                    <Container>
                        <Row>
                            System: {props.typeOfLadder}
                        </Row>
                        <Row>
                            Wpisowe: 80 zł
                        </Row>
                        <Row>
                            Liczba miejsc: {props.places}
                        </Row>
                        <br/>
                        <Row>
                            {props.additionalInformations}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success">Zapisz się do {props.entriesTo}</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TournamentInfo;