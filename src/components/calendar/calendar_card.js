import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import leo from '../../assets/leo.gif';

export const CalendarCard = (props) => {
    return (
        <Card border={"dark"} style={{ width: '60%', height: '10%'}} >

            <Card.Img src={leo} style={{position: "relative", margin: "auto"}}/>

            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.places} <br/>
                    {props.from} do {props.to}
                </Card.Text>
                <Button variant="success" disabled={true}>OPEN</Button>
            </Card.Body>
        </Card>
    );
}

export default CalendarCard;