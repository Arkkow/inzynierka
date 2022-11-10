import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cup_logo from "../../assets/cup.svg";

export const CalendarCard = (props) => {
    return (
        <Card border={"dark"} style={{ minWidth: '40%', maxHeight: '10%' }} >
            <div style={{display: "flex"}}>
                <Card.Img src={cup_logo} style={{ margin: "2%", height: "auto", width: "auto"}}/>
                <div>
                    <Card.Body>
                        <Card.Title>{props.name} </Card.Title>
                        <Card.Text>
                            <div>{props.places}</div>
                            <div>
                                od {props.from}&nbsp;
                                do {props.to}
                            </div>
                        </Card.Text>
                        <Button variant="success" disabled={true}>OPEN</Button>
                    </Card.Body>
                </div>
            </div>
        </Card>
    );
}

export default CalendarCard;