// General React imports
import * as React from 'react';

// Project specific files
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { GeoAlt, CalendarCheck } from "react-bootstrap-icons";

// CSS files
import cup_logo from "../../assets/cup.svg";


export const CalendarCard = (props) => {
    return (
        <Card border={"dark"} style={{ minWidth: '40%', maxHeight: '10%', margin: "2%"}} >
            <div style={{display: "flex"}}>
                <Card.Img src={cup_logo} style={{ margin: "2%", height: "auto", width: "auto"}}/>
                <div>
                    <Card.Body>
                        <Card.Title>{props.name} </Card.Title>
                        <Card.Text>
                            <div><GeoAlt /> &nbsp;{props.places}</div>
                            <div>
                                <CalendarCheck/>&nbsp;
                                od {props.from}&nbsp;
                                do {props.to}
                            </div>
                        </Card.Text>
                        <Button variant="success" disabled={true}>OPEN</Button>
                    </Card.Body>
                </div>
                <div style={{padding: "2%"}}>
                    <div style={{ textAlign: "center"}}>
                        Użytkownik zaprosił cię do gry w tym turnieju
                    </div>
                    <div style={{textAlign: "center"}}>
                        <Button variant="success" style={{margin: "5%"}}>TAK</Button>
                        <Button variant="danger" style={{margin: "5%"}}>NIE</Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CalendarCard;